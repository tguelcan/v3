import Redis from "ioredis";
import { env } from '$env/dynamic/private';

export const publisher = new Redis(env.REDIS_URL);
export  const subscriber = new Redis(env.REDIS_URL);