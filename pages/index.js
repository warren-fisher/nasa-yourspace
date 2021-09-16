import Head from 'next/head'
import App from '../components/App.js';
import styles from '../styles/Home.module.css'

import { useState, useCallback } from 'react';

import { DatePicker } from '@shopify/polaris';

export default function Home() {

  // TODO: find proper timezone for when APOD changes
  // Get the date in New York
  const today = new Date(new Date().toLocaleDateString('en-us', {timeZone: 'America/New_York'}));

  const [{month, year}, setDate] = useState({month: today.getMonth(), year: today.getFullYear()});
  const [selectedDates, setSelectedDates] = useState({
    start: today,
    end: today,
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>YourSpace</title>
        <meta name="description" content="YourSpace - a space for everyone to see space" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#000000" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to YourSpace
        </h1>
        <p>
          An earth citizens website to access pictures from NASA's Astronomy Picture of the Day and
          Mars Rover Photos APIs provided for free on the internet.
        </p>

        <DatePicker
          month={month}
          year={year}
          onChange={setSelectedDates}
          onMonthChange={handleMonthChange}
          selected={selectedDates}
          disableDatesAfter={today}
        />

        <App date={selectedDates.start}></App> 
      </main>

      <footer className={styles.footer}>
        <a
          href="https://api.nasa.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by api.nasa.gov
        </a>
      </footer>
    </div>
  )
}
