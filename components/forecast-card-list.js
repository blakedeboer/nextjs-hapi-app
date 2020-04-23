import styles from './forecast-card-list.module.css'
import ForecastCard from './forecast-card'

export default function ForecastCardList({ forecasts }) {
    return (
        <article>
            {forecasts.map((forecast) => (
                <ForecastCard {...forecast}></ForecastCard>
          ))}
        </article>
    )
}