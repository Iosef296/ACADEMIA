import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { AppModule } from '../src/app.module';

const server = express();
let ready = false;

async function bootstrap() {
  if (ready) return server;
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), { logger: false });
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*', credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.init();
  ready = true;
  return server;
}

export default async (req: any, res: any) => {
  await bootstrap();
  server(req, res);
};
