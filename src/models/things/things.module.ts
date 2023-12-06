import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Thing, ThingSchema } from './things.model';
import { ThingsModelService } from './things-model.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Thing.name, schema: ThingSchema }]),
  ],
  providers: [ThingsModelService],
  exports: [ThingsModelService],
})
export class ThingsModule {}
