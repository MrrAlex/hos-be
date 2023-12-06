import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Thing, ThingDocument } from './things.model';
import { ThingDto } from './things.dto';

@Injectable()
export class ThingsModelService {
  constructor(
    @InjectModel(Thing.name)
    private things: Model<ThingDocument>,
  ) {}

  findAll() {
    return this.things.find();
  }

  findById(id: string) {
    return this.things.findById(id);
  }

  create(dto: ThingDto) {
    return this.things.create(dto);
  }

  async update(id: string, dto: ThingDto) {
    const created = await this.things.findById(dto.id).exec();
    created.name = dto.name;
    created.volume = dto.volume;
    await created.save();
    return created;
  }
}
