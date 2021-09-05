import useVehicle from '../src/useVehicle';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

const stateIconMap = {
	'asleep': '🟡',
	'online': '🟢',
	'default': '🔴'
}

export default function Vehicle () {
	const { vehicle, isLoading, isError } = useVehicle();
	if (isLoading) return <p>Loading</p>;
	if (isError) return (
		<div>
			<p>Vehicle is offline. This will be fixed soon!</p>
			<Image src='/awkward.gif' alt='awkward' width='100%' height={100} layout='responsive' />
		</div>
	)
	if (!vehicle) return <p>Nothing to see here</p>
	return (
		<div>
			<p className={styles.description}>
				{ stateIconMap[vehicle.state] } <b>{ vehicle.display_name }</b> - { vehicle.state }
	     		</p>
			<div className={styles.grid}>
				<div className={styles.card}>
					<h2>🔋 Battery</h2>
					<p>{vehicle.charge_state.battery_level}% ({vehicle.charge_state.battery_range} mi)</p>
				</div>
				<div className={styles.card}>
					<h2>🔌 Charge Status</h2>
					<p>{vehicle.charge_state.charging_state}</p>
				</div>
				<div className={styles.card}>
					<h2>🏃 Odometer</h2>
					<p>{vehicle.vehicle_state.odometer} mi</p>
				</div>
				<div className={styles.card}>
					<h2>👮‍♀️ Sentry Mode</h2>
					<div className={styles.code}>
						{vehicle.vehicle_state.sentry_mode ?
							'Running keep_summer_safe.exe...' :
							'Who is Summer? / return()'
						}
					</div>
				</div>
				<div className={styles.card}>
					<h2>🌡 Temperature</h2>
					<p>{vehicle.climate_state.inside_temp} C | {vehicle.climate_state.outside_temp} C (out)</p>
				</div>
				<div className={styles.card}>
					<h2>⚙️ Software</h2>
					<p>{vehicle.vehicle_state.car_version}</p>
				</div>
				<div className={styles.card}>
					<h2>⏰ Last Updated</h2>
					<p>{new Date(vehicle.vehicle_state.timestamp).toLocaleString()}</p>
				</div>
			</div>
		</div>
	)

}