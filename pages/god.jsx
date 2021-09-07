import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0';

import Head from 'next/head';
import Vehicle from '../src/components/vehicle';
import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import useGod from '../src/useGod';

export default withPageAuthRequired(function Admin() {
  const { vehicle, isLoading: gLoading, error: gError } = useGod();
  const { user, error: uError, isLoading: uLoading } = useUser();
    
  if (uLoading || gLoading) return <div>Loading...</div>;
  return (
    user ? (
      <Container fluid>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous" />
          <title>God</title>
          <meta name="description" content="Of course you built a dashboard for me" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav className="justify-content-center">
          <Nav.Item>
            <Nav.Link disabled>God</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='/'>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='/api/auth/logout'>Logout</Nav.Link>
          </Nav.Item>
        </Nav>
        <Row>
          <Col className='lg-12 pt-5' align='center'>
            <h1>👋 {user.name}</h1>
            <p>
              <i>Of course <b>you</b> built a dashboard for me</i>
            </p>
          </Col>
        </Row>
        {/* <Row>
          <Col className='lg-12 p-3' align='center'>
            <Button disabled variant='danger' href='/'>Get FULL Data</Button>{' '}
            <Button
              variant='danger'
              onClick={(e) => {e}}
            >Get filtered Data</Button>
          </Col>
        </Row> */}
        <Form className='px-5'>
          <Form.Control
            style={{fontFamily: 'monospace'}}
            readOnly
            as='textarea'
            rows={20}
            value={vehicle ? JSON.stringify(vehicle, null, 4) : 'Nothing to see here'}
          />
        </Form>
        <Row>
        </Row>
        <Row>
          <Col className='lg-12 pt-5' align='center'>
            <Vehicle />
          </Col>
        </Row>
      </Container>
    ) : (
      <Button className='align-center' variant='primary' size='lg' href='/api/auth/login'>Login</Button>
    )
  );
});