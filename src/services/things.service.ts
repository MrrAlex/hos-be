import { Injectable } from '@nestjs/common';
import { ThingsModelService } from '../models/things/things-model.service';
import { ThingDto } from '../models/things/things.dto';

@Injectable()
export class ThingsService {
  constructor(private thing: ThingsModelService) {}

  findAll() {
    return this.thing.findAll();
  }

  findById(id: string) {
    return this.thing.findById(id);
  }

  create(dto: ThingDto) {
    return this.thing.create(dto);
  }

  update(id: string, dto: ThingDto) {
    return this.thing.update(id, dto);
  }

  delete(id: string) {
    return this.thing.delete(id);
  }
}
