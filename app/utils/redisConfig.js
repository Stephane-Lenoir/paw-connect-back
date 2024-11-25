import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://redis-18556.c328.europe-west3-1.gce.redns.redis-cloud.com:18556'
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

await redisClient.connect();

export default redisClient;