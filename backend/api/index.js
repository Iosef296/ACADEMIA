'use strict';
require('reflect-metadata');

const express = require('express');

let server;
let isReady = false;

async function testDbConnection() {
  const { Client } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  });
  try {
    await client.connect();
    console.log('[DB TEST] Connection successful');
    await client.end();
  } catch (err) {
    console.error('[DB TEST] Connection failed:', err.message);
  }
}

async function bootstrap() {
  if (isReady) return;
  await testDbConnection();

  const { NestFactory } = require('@nestjs/core');
  const { ExpressAdapter } = require('@nestjs/platform-express');
  const { ValidationPipe } = require('@nestjs/common');
  const { AppModule } = require('../dist/app.module');

  server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*', credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.init();
  isReady = true;
}

module.exports = async (req, res) => {
  try {
    await bootstrap();
    server(req, res);
  } catch (err) {
    console.error('[BOOTSTRAP ERROR]', err.message, err.stack);
    res.status(500).json({ error: err.message });
  }
};
