import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContainersService } from '../services/containers.service';
import { ContainerDto } from '../models/containers';

@Controller('containers')
export class ContainersController {
  constructor(private service: ContainersService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: ContainerDto) {
    return this.service.create(dto);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() dto: ContainerDto) {
    return this.service.update(id, dto);
  }
}
