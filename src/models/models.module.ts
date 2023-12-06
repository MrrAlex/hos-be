import { Module } from '@nestjs/common';
import { ThingsModule } from './things/things.module';
import { ContainersModule } from './containers';
import * as process from 'process';
import { MongooseModule } from '@nestjs/mongoose';

const connectUrl = (
  protocol: string,
  user: string,
  pass: string,
  host: string,
  port: string,
  db: string,
) => {
  return `${protocol ?? 'mongodb'}://${user ?? 'admin'}:${pass ?? ''}@${
    host ?? 'localhost'
  }${port ? ':' + port : ''}/${
    db ?? 'worship-schedule'
  }?retryWrites=true&w=majority&authSource=admin`;
};

const modules = [ThingsModule, ContainersModule];

@Module({
  imports: [
    ...modules,
    MongooseModule.forRoot(
      connectUrl(
        process.env['MONGO_PROTOCOL'],
        process.env['MONGO_USER'],
        process.env['MONGO_PASS'],
        process.env['MONGO_HOST'],
        process.env['MONGO_PORT'],
        process.env['MONGO_DB'],
      ),
    ),
  ],
  exports: modules,
})
export class ModelsModule {}
