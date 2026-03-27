'use strict';
require('reflect-metadata');

const express = require('express');

let server;
let isReady = false;

async function bootstrap() {
  if (isReady) return;

  const { NestFactory } = require('@nestjs/core');
  const { ExpressAdapter } = require('@nestjs/platform-express');
  const { ValidationPipe } = require('@nestjs/common');
  const { AppModule } = require('../dist/app.module');

  server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), { logger: false });
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*', credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.init();
  isReady = true;
}

module.exports = async (req, res) => {
  await bootstrap();
  server(req, res);
};
