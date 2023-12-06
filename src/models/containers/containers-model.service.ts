import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
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

  findById(id: string) {
    return this.container.findById(id);
  }

  create(dto: ContainerDto) {
    return this.container.create(dto);
  }

  async update(id: string, dto: ContainerDto) {
    const created = await this.container.findById(dto.id).exec();
    created.name = dto.name;
    created.volume = dto.volume;
    await created.save();
    return created;
  }
}
