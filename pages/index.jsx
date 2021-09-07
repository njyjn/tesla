import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Vehicle from '../src/components/vehicle';
import Navbar from '../src/components/navbar';
import { Col, Container, Row } from 'react-bootstrap';

export default function Home() {
  return (
    <Container fluid>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Hello Panda</title>
        <meta name="description" content="Of course I built a dashboard for my Tesla" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://car.justin.sg/" />
        <meta property="og:title" content="Hello Panda" />
        <meta property="og:description" content="Of course I built a dashboard for my Tesla" />
        <meta property="og:image" content="meta.jpeg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://car.justin.sg/" />
        <meta property="twitter:title" content="Hello Panda" />
        <meta property="twitter:description" content="Of course I built a dashboard for my Tesla" />
        <meta property="twitter:image" content="meta.jpeg" />

        <Navbar />
      </Head>
      <Row>
        <Col className='lg-12 pt-5' align='center'>
          <h1 className='display-1'>👋🐼</h1>
          <p>
            <i>Of course I built a dashboard for my Tesla</i>
          </p>
        </Col>
      </Row>
      <Row>
        <Col className='lg-12' align='center'>
          <Vehicle />
        </Col>
      </Row>
      <footer className={styles.footer}>
        <a
          href='https://www.tesla.com/referral/justin98607/'
          target="_blank"
          rel="noopener noreferrer"
        >Influence</a>
        <a
          href='https://tesla-api.timdorr.com/'
          target="_blank"
          rel="noopener noreferrer"
        >Inspire</a>
        <a
          href='https://www.github.com/njyjn/tesla/'
          target="_blank"
          rel="noopener noreferrer"
        >Innovate</a>
        <a
          href="https://aletheon.co"
          target="_blank"
          rel="noopener noreferrer"
        >
        {new Date().getFullYear()} &copy; Aletheon Corp
        </a>
      </footer>
    </Container>
  )
}
