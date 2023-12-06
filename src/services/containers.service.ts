import { Injectable } from '@nestjs/common';
import { ContainerDto, ContainersModelService } from '../models/containers';

@Injectable()
export class ContainersService {
  constructor(private container: ContainersModelService) {}

  findAll() {
    return this.container.findAll();
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
}
