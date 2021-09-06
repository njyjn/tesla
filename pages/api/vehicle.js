// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Tesla API documentation: https://tesla-api.timdorr.com/

import axios from 'axios';
import Redis from 'ioredis';

let redis = new Redis(process.env.REDIS_URL);

const baseUrl = 'https://owner-api.teslamotors.com/api/1'
const vehicleId = process.env.VEHICLE_ID;

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.AUTH_TOKEN}`;

export default async function handler(req, res) {
  if (process.env.NODE_ENV === 'development') {
    const mock = {
      'display_name': 'dummy',
      'state': 'online',
      'charge_state': {
        'battery_level': 50,
        'battery_range': 100,
        'charging_state': 'Charging',
        // new!
        'time_to_full_charge': 2,
        'charger_power': 10,
        'charger_voltage': 240,
        'charge_rate': 2000,
        'charge_limit_soc': 90,
        'charge_limit_soc_max': 100
      },
      'climate_state': {
        'inside_temp': 20,
        'outside_temp': 5
      },
      'drive_state': {
        'power': 1
      },
      'vehicle_state': {
        'car_version': 'mock',
        'odometer': 100,
        'sentry_mode': true,
        'timestamp': 0
      }
    };
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

async function getVehicle() {
  const res = await axios.get(`${baseUrl}/vehicles/${vehicleId}`);
  return res.data.response;
}

async function getVehicleState() {
  const res = await getVehicle();
  return res.state;
}

async function wakeVehicle() {
  const wakeResponse = await axios.post(`${baseUrl}/vehicles/${vehicleId}/wake_up`);
  return wakeResponse.data.response.state;
}

// something is wrong with this function, do not use!
async function wakeVehicleUntilWoken() {
  let state = await getVehicleState();
  let response;
  while (state != 'online') {
    response = await wakeVehicle();
    await sleep(10000);
    state = await getVehicleState();
  };
  return response.data.response;
}

async function getVehicleData() {
  const essentialOnly = true;
  const res = await axios.get(`${baseUrl}/vehicles/${vehicleId}/vehicle_data`);
  let data = res.data.response;
  if (essentialOnly) {
    data = filterVehicleData(res.data.response);
  }
  return data ;
}

function filterVehicleData(data) {
  return {
    'display_name': data.display_name,
    'state': data.state,
    'charge_state': {
      'battery_level': data.charge_state.battery_level,
      'battery_range': data.charge_state.battery_range,
      'charging_state': data.charge_state.charging_state,
      'time_to_full_charge': data.charge_state.time_to_full_charge,
      'charger_power': data.charge_state.charger_power,
      'charger_voltage': data.charge_state.charger_voltage,
      'charge_rate': data.charge_state.charge_rate,
      'charge_limit_soc': data.charge_state.charge_limit_soc,
      'charge_limit_soc_max': data.charge_state.charge_limit_soc_max
    },
    'climate_state': {
      'inside_temp': data.climate_state.inside_temp,
      'outside_temp': data.climate_state.outside_temp
    },
    'drive_state': {
      'power': data.drive_state.power
    },
    'vehicle_state': {
      'car_version': data.vehicle_state.car_version,
      'odometer': data.vehicle_state.odometer,
      'sentry_mode': data.vehicle_state.sentry_mode,
      'timestamp': data.vehicle_state.timestamp
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}