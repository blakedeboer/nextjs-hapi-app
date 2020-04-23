import Head from 'next/head'
import Navbar from '../components/navbar'
import TodaysForecast from '../components/todays-forecast'
import ForecastCardList from '../components/forecast-card-list'
import { getUpcomingForecasts, getTodaysForecast } from '../lib/data'

const Overview = ({ forecasts, todaysForecast }) => {
  return (
    <div className="container">
      <Head>
        <title>Sunshine</title>
      </Head>

      <main>
        <Navbar></Navbar>
        <TodaysForecast {...todaysForecast}></TodaysForecast>
        <ForecastCardList forecasts={forecasts}></ForecastCardList>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export const getServerSideProps = async () => ({
  props: { 
    forecasts: await getUpcomingForecasts(),
    todaysForecast: await getTodaysForecast()
  }
})

export default Overview
