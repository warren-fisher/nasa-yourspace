import Head from 'next/head'
import App from '../components/App.js';
import styles from '../styles/Home.module.css'

import { useState, useCallback } from 'react';

import PopupDatePicker from '../components/PopupDatePicker.js';

export default function Home() {

  // Get the date in New York timezone.
  // I found that APOD updates ~couple minutes after EST time change
  const today = new Date(new Date().toLocaleDateString('en-us', {timeZone: 'America/New_York'}));

  // This is the first available APOD image
  const firstDay = new Date(2015, 1, 1);

  // Our start date stuff
  const [{month, year}, setDate] = useState({month: today.getMonth(), year: today.getFullYear()});
  const [selectedDates, setSelectedDates] = useState({
    start: today,
    end: today,
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );

  // Our end date stuff
  const [{monthEnd, yearEnd}, setDateEnd] = useState({monthEnd: today.getMonth(), yearEnd: today.getFullYear()});
  const [selectedDatesEnd, setSelectedDatesEnd] = useState({
    start: today,
    end: today,
  });

  const handleMonthChangeEnd = useCallback(
    (month, year) => setDateEnd({month, year}),
    [],
  );

  return (
    <>
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
          An earth citizens website to access pictures from NASA&#39;s Astronomy Picture of the Day provided for free on the internet.
        </p>

        {/* It will add the selected date to buttonText */}
        <section id={styles.datepickers}>
          <PopupDatePicker
            buttonText="Change start date from "
            month={month}
            year={year}
            handleDateChange={setSelectedDates}
            handleMonthChange={handleMonthChange}
            selectedDates={selectedDates}
            disableDatesBefore={firstDay}
            disableDatesAfter={today}
            />

          <PopupDatePicker
            buttonText="Change end date from "
            month={monthEnd}
            year={yearEnd}
            handleDateChange={setSelectedDatesEnd}
            handleMonthChange={handleMonthChangeEnd}
            selectedDates={selectedDatesEnd}
            disableDatesBefore={selectedDates.start}
            disableDatesAfter={today}
            />
        </section>

        <App dateStart={selectedDates.start} dateEnd={selectedDatesEnd.start}></App> 
      </main>

      <footer className={styles.footer}>
        <a
          href="https://api.nasa.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by, but not afiliated with api.nasa.gov
        </a>
      </footer>
    </>
  );
}
