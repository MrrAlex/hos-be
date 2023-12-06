import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ThingsService } from '../services/things.service';
import { ThingDto } from '../models/things/things.dto';

@Controller('things')
export class ThingsController {
  constructor(private service: ThingsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: ThingDto) {
    return this.service.create(dto);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() dto: ThingDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
