import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ContainersService } from '../services/containers.service';
import { AssignItemsDto, ContainerDto } from '../models/containers';

@Controller('containers')
export class ContainersController {
  constructor(private service: ContainersService) {}

  @Get()
  findAll(@Query('includeChildContainers') includeChildren: string) {
    return this.service.findAll(includeChildren === 'true');
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: ContainerDto) {
    return this.service.create(dto);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() dto: ContainerDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Post(':id/assign')
  assignItems(@Param('id') id: string, @Body() dto: AssignItemsDto[]) {
    return this.service.assignItems(id, dto);
  }
}
