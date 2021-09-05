// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Tesla API documentation: https://tesla-api.timdorr.com/

import axios from 'axios';

const baseUrl = 'https://owner-api.teslamotors.com/api/1'
const vehicleId = process.env.VEHICLE_ID;

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.AUTH_TOKEN}`;

export default async function handler(req, res) {
  try {
    await wakeVehicle();
    // await wakeVehicleUntilWoken();
    const data = await getVehicleData();
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error);
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
  const res = await axios.get(`${baseUrl}/vehicles/${vehicleId}/vehicle_data`);
  return res.data.response;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}