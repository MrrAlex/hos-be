import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
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
    return this.things.find().populate('container', 'name').exec();
  }

  findByIds(ids: Types.ObjectId[]) {
    return this.things
      .find({
        _id: {
          $in: ids,
        },
      })
      .exec();
  }

  findById(id: string) {
    return this.things.findById(id).populate('container').exec();
  }

  create(dto: ThingDto) {
    return this.things.create(dto);
  }

  async update(id: string, dto: ThingDto) {
    const created = await this.things.findById(id).exec();
    created.name = dto.name;
    created.volume = dto.volume;
    created.description = dto.description;
    created.icon = dto.icon;
    await created.save();
    return created;
  }

  async delete(id: string) {
    return this.things.findByIdAndDelete(id);
  }

  async addContainerRefToThings(
    thingIds: Types.ObjectId[],
    containerId: Types.ObjectId,
  ) {
    await this.things
      .updateMany({ container: containerId }, { $unset: { container: '' } })
      .exec();
    await this.things
      .updateMany(
        { _id: { $in: thingIds } },
        { $set: { container: new Types.ObjectId(containerId) } },
      )
      .exec();
  }
}
