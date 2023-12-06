import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ContainerDocument = HydratedDocument<Container>;

@Schema()
export class Container {
  @Prop()
  name: string;

  @Prop()
  icon: string;

  @Prop()
  volume: number;
}

export const ContainerSchema = SchemaFactory.createForClass(Container);
