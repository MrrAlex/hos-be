import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Thing } from '../things/things.model';

export type ContainerDocument = HydratedDocument<Container>;

@Schema()
export class Container {
  @Prop()
  name: string;

  @Prop()
  icon: string;

  @Prop()
  description: string;

  @Prop()
  volume: number;

  @Prop()
  takenSpace: number;

  @Prop({ type: Types.ObjectId, ref: Container.name })
  container: Container | Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Container.name }] })
  containers: Container[] | Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Thing' }] })
  things: Thing[] | Types.ObjectId[];
}

export const ContainerSchema = SchemaFactory.createForClass(Container);
