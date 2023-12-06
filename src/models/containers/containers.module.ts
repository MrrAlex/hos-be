import { Module } from '@nestjs/common';
import { ContainersModelService } from './containers-model.service';
import { Container, ContainerSchema } from './containers.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Container.name, schema: ContainerSchema },
    ]),
  ],
  providers: [ContainersModelService],
  exports: [ContainersModelService],
})
export class ContainersModule {}
