import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Vehicle from './vehicle';

export default function Home() {
  return (
    <div className='container-fluid'>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hello Panda</title>
        <meta name="description" content="Of course I built a dashboard for my Tesla" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        👋🐼
        </h1>
        <p>
          <i>Of course I built a dashboard for my Tesla</i>
        </p>
        <Vehicle />
      </main>


      <footer className={styles.footer}>
        <a
          href="https://aletheon.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          2021 &copy; Aletheon Corp
        </a>
      </footer>
    </div>
  )
}
