import useVehicle from '../useVehicle';
import styles from '../../styles/Home.module.css';
import Charging from './charging';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';

const stateIconMap = {
	'asleep': '🟡',
	'online': '🟢',
  'driving': '🚘',
	'default': '🔴'
}

export default function Vehicle () {
	const { vehicle, isLoading, isError } = useVehicle();
	if (isLoading) return (
    <span>
      <Spinner animation="grow" variant='danger'/>
      <p>Initializing...</p>
    </span>
  );
	if (isError) return (
		<span>
      <Spinner animation="grow" variant='danger'/>
			<p>Waking vehicle... This may take a while</p>
		</span>
	)
	if (!vehicle) return (
    <span>
      <p>Nothing to see here</p>
      {/* <Image src='/awkward.gif' alt='awkward' width='100%' height='30vh' layout='responsive' /> */}
    </span>
  )
  const vehicleState = vehicle.drive_state.power !== 0 ? 'driving' : vehicle.state;
	return (
		<Container fluid>
			<p className={styles.description}>
				{ stateIconMap[vehicleState] } <b>{ vehicle.display_name }</b> - { vehicleState }
	    </p>
			{vehicle.charge_state.charging_state == 'Charging' ?
        <Charging chargeState={vehicle.charge_state} /> :
        <Row>
          <Col className='lg-6 g-4'>
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title>🔋 Battery</Card.Title>
                <Card.Text>{vehicle.charge_state.battery_level}% ({vehicle.charge_state.battery_range} mi)</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className='lg-6 g-4'>
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title>🔌 Charge Status</Card.Title>
                <Card.Text>{vehicle.charge_state.charging_state}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
	      </Row>
      }
			<Row>
        <Col className='lg-6 g-4'>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>🏃 Odometer</Card.Title>
              <Card.Text>{vehicle.vehicle_state.odometer} mi</Card.Text>
            </Card.Body>
					</Card>
				</Col>
        <Col className='lg-6 g-4'>
          <Card style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title>👮‍♀️ Sentry Mode</Card.Title>
                <code>
                {vehicle.vehicle_state.sentry_mode ?
                'Running keep_summer_safe.exe...' :
                'Who is Summer? / return()'
                }
                </code>
              </Card.Body>
					</Card>
				</Col>
			</Row>
			<Row>
        <Col className='lg-6 g-4'>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>🌡 Temperature</Card.Title>
              <Card.Text>{vehicle.climate_state.inside_temp} C | {vehicle.climate_state.outside_temp} C (out)</Card.Text>
            </Card.Body>
          </Card>
				</Col>
        <Col className='lg-6 g-4'>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>⚙️ Software</Card.Title>
              <Card.Text>{vehicle.vehicle_state.car_version}</Card.Text>
            </Card.Body>
          </Card>
				</Col>
			</Row>
      <Row className='pt-5'>
        <Col className='lg-12'>
          <p className='text-center'>⏰ Last Updated: {new Date(vehicle.vehicle_state.timestamp).toLocaleString()}</p>
        </Col>
      </Row>
    </Container>
	)
}