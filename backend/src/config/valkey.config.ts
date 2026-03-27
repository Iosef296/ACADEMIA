import { registerAs } from '@nestjs/config';

export default registerAs('valkey', () => ({
  host: process.env.VALKEY_HOST,
  port: parseInt(process.env.VALKEY_PORT ?? '6379', 10),
}));
