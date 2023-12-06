import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContainerDto } from '../models/containers';
import { ThingsService } from '../services/things.service';

@Controller('things')
export class ThingsController {
  constructor(private service: ThingsService) {}

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
