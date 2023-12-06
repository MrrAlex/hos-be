import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Container } from '../containers';

export type ThingDocument = HydratedDocument<Thing>;

@Schema()
export class Thing {
  @Prop()
  name: string;

  @Prop()
  icon: string;

  @Prop()
  description: string;

  @Prop()
  volume: number;

  @Prop({ type: Types.ObjectId, ref: 'Container' })
  container: Container | Types.ObjectId;
}

export const ThingSchema = SchemaFactory.createForClass(Thing);
