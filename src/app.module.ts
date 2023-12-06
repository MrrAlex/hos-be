import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModelsModule } from './models/models.module';
import { ThingsController } from './controllers/things.controller';
import { ContainersController } from './controllers/containers.controller';
import { ContainersService } from './services/containers.service';
import { ThingsService } from './services/things.service';

@Module({
  imports: [ModelsModule],
  controllers: [AppController, ThingsController, ContainersController],
  providers: [AppService, ContainersService, ThingsService],
})
export class AppModule {}
