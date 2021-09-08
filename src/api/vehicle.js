import axios from 'axios';

const baseUrl = 'https://owner-api.teslamotors.com/api/1'

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.AUTH_TOKEN}`;

const vehicleId = process.env.VEHICLE_ID;

async function getVehicle() {
	const res = await axios.get(`${baseUrl}/vehicles/${vehicleId}`);
	return res.data.response;
}

async function getVehicleState() {
	const res = await getVehicle();
	return res.state;
}

export async function wakeVehicle() {
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

export async function getVehicleData(essentialOnly=true) {
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
	    'charger_actual_current': data.charge_state.charger_actual_current,
	    'charge_limit_soc': data.charge_state.charge_limit_soc,
	    'charge_limit_soc_max': data.charge_state.charge_limit_soc_max
	  },
	  'climate_state': {
	    'inside_temp': data.climate_state.inside_temp,
	    'outside_temp': data.climate_state.outside_temp
	  },
	  'drive_state': {
	    'power': data.drive_state.power,
	    'speed': data.drive_state.speed
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