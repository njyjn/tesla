// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Tesla API documentation: https://tesla-api.timdorr.com/

import Redis from 'ioredis';
import mock from '../../src/api/mock.json';
import { wakeVehicle, getVehicleData } from '../../src/api/vehicle';

let redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  if (process.env.NODE_ENV === 'development') {
    res.status(200).json(mock);
  } else {
    try {
      let cache = await redis.get('cache');
      cache = JSON.parse(cache);
      if (cache) {
        // cache hit!
        res.status(200).json(cache);
      } else {
        // cache miss
        await wakeVehicle();
        const data = await getVehicleData();
        redis.set('cache', JSON.stringify(data), 'EX', 300);
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
