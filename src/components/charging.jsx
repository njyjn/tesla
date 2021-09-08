import { Card, Col, ProgressBar, Row } from 'react-bootstrap';
import Countdown from 'react-countdown';

export default function Charging ({ chargeState }) {
  const timeToFullChargeMs = chargeState.time_to_full_charge * 60 * 60 * 1000;  
	return (
		<Row>
			<Col className='lg-12'>
				<Card border='success' style={{ width: '100%' }}>
          <Card.Body>
            <Card.Title>⚡️ Charge Progress</Card.Title>
              <Row className='p-3'>
                <Col>
                  <h1 className='display-1 text-center'>{chargeState.battery_level}%</h1>
                  <p className='text-center'>charged</p>
                </Col>
                <Col>
                  <h1 className='display-1 text-center'>
                    <Countdown 
                      date={Date.now() + timeToFullChargeMs}
                      renderer={({ hours, minutes, seconds, completed }) => {
                        if (completed) return '✅ Done';
                        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                      }}
                    /></h1>
                  <p className='text-center'>remaining</p>
                </Col>
              </Row>
              <Row>
                <Col className='pb-5'>
                  <ProgressBar>
                    <ProgressBar variant='success' now={chargeState.battery_level} key={1} />
                    <ProgressBar animated variant='success' now={chargeState.charge_limit_soc - chargeState.battery_level} label={`charging to ${chargeState.charge_limit_soc}%`} key={2} />
                    <ProgressBar variant='danger' now={chargeState.charge_limit_soc_max - chargeState.charge_limit_soc} key={3} />
                  </ProgressBar>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className='text-center'>Charger Power</p>
                  <h3 className='text-center'>{chargeState.charger_power}kW</h3>
                </Col>
                <Col>
                  <p className='text-center'>Charger Voltage</p>
                  <h3 className='text-center'>{chargeState.charger_voltage}V</h3>
                </Col>
                <Col>
                  <p className='text-center'>Charger Current</p>
                  <h3 className='text-center'>{chargeState.charger_actual_current}A</h3>
                </Col>
              </Row>
            </Card.Body>
				</Card>
			</Col>
		</Row>
	)
}