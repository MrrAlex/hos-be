import { HttpException, Injectable } from '@nestjs/common';
import {
  AssignItemsDto,
  ContainerDocument,
  ContainerDto,
  ContainersModelService,
} from '../models/containers';
import { ThingsModelService } from '../models/things/things-model.service';
import { Types } from 'mongoose';

@Injectable()
export class ContainersService {
  constructor(
    private container: ContainersModelService,
    private thing: ThingsModelService,
  ) {}

  async findAll(includeChildren: boolean) {
    const all = await this.container.findAll().exec();
    if (!includeChildren) {
      return all;
    }
    for (const container of all) {
      const childContainers: Types.ObjectId[] =
        container.containers as Types.ObjectId[];
      for (let i = 0; i < childContainers.length; i++) {
        const child = await this.container.findById(childContainers[i]);
        childContainers.push(...(child.containers as Types.ObjectId[]));
      }
      container.containers = childContainers;
    }
    return all;
  }

  findById(id: string) {
    return this.container.findById(id);
  }

  create(dto: ContainerDto) {
    return this.container.create(dto);
  }

  update(id: string, dto: ContainerDto) {
    return this.container.update(id, dto);
  }

  delete(id: string) {
    return this.container.delete(id);
  }

  async assignItems(id: string, dto: AssignItemsDto[]) {
    const containerIds = dto
      .filter((i) => i.type === 'Container')
      .map((i) => new Types.ObjectId(i._id));
    const thingIds = dto
      .filter((i) => i.type === 'Thing')
      .map((i) => new Types.ObjectId(i._id));

    const container = await this.container.findById(id);

    container.things = thingIds;
    container.containers = containerIds;
    const allLinkedContainers = await this.recalculateSpaces(container);
    for (const item of allLinkedContainers) {
      await item.save();
    }
    await this.thing.addContainerRefToThings(thingIds, container._id);
    await this.container.addContainerRefToContainers(
      containerIds,
      container._id,
    );

    return container;
  }

  async recalculateSpaces(container: ContainerDocument) {
    const linkedContainers: ContainerDocument[] = [];
    let currentContainer = container;
    let prevContainer = null;

    while (currentContainer) {
      const takenSpace = await this.calculateContainerSpace(
        currentContainer,
        prevContainer,
      );
      if (currentContainer.volume < takenSpace) {
        const message =
          linkedContainers.length > 0
            ? ' in current container'
            : ' in parent container';
        throw new HttpException('Not enough space' + message, 500);
      } else {
        currentContainer.takenSpace = takenSpace;
        linkedContainers.push(currentContainer);
        prevContainer = currentContainer;
      }

      currentContainer = await this.container.findContainerForContainer(
        currentContainer._id,
      );
    }

    return linkedContainers;
  }

  private async calculateContainerSpace(
    container: ContainerDocument,
    prevContainer?: ContainerDocument,
  ) {
    const things = await this.thing.findByIds(
      container.things as Types.ObjectId[],
    );
    const containers = await this.container.findByIds(
      container.containers as Types.ObjectId[],
    );

    return (
      things.reduce((acc, next) => acc + next.volume, 0) +
      containers.reduce((acc, next) => {
        if (next._id.toString() === prevContainer?._id.toString()) {
          return acc + prevContainer.takenSpace;
        }
        return acc + next.takenSpace;
      }, 0)
    );
  }
}
