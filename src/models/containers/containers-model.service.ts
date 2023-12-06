import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Container, ContainerDocument } from './containers.model';
import { ContainerDto } from './containers.dto';

@Injectable()
export class ContainersModelService {
  constructor(
    @InjectModel(Container.name)
    private container: Model<ContainerDocument>,
  ) {}

  findAll() {
    return this.container.find();
  }

  findByIds(ids: Types.ObjectId[]) {
    return this.container
      .find({
        _id: {
          $in: ids,
        },
      })
      .exec();
  }

  findById(id: string | Types.ObjectId) {
    return this.container
      .findById(id)
      .populate('things')
      .populate('containers')
      .exec();
  }

  findContainerForContainer(id: Types.ObjectId) {
    return this.container.findOne({ containers: id }).exec();
  }

  create(dto: ContainerDto) {
    return this.container.create({ ...dto, takenSpace: 0 });
  }

  async update(id: string, dto: ContainerDto) {
    const created = await this.container.findById(id).exec();
    created.name = dto.name;
    created.volume = dto.volume;
    created.description = dto.description;
    created.icon = dto.icon;
    await created.save();
    return created;
  }

  async delete(id: string) {
    return this.container.findByIdAndDelete(id);
  }

  async addContainerRefToContainers(
    containerIds: Types.ObjectId[],
    containerId: Types.ObjectId,
  ) {
    await this.container
      .updateMany({ container: containerId }, { $unset: { container: '' } })
      .exec();
    await this.container
      .updateMany(
        { _id: { $in: containerIds } },
        { $set: { container: new Types.ObjectId(containerId) } },
      )
      .exec();
  }
}
