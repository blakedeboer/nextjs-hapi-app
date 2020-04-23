import styles from './forecast-card.module.css'
import Link from 'next/link'

export default function ForecastCard(props)  {
        const { id, day, weather, max, min, image } = props
        return (
            <Link href="/forecasts/[id]" as={`/forecasts/${id}`}>
                <a className={styles.grid}>
                    <div className={styles.image}>
                        <img
                            src={`/public/static/images/ic_${image}.png`}
                        />
                    </div>
                    <section className={styles.day}>
                        <p>{day}</p>
                        <p>{weather}</p>
                    </section>
                    <section className={styles.temperature}>
                        <p>{max}</p>
                        <p>{min}</p>
                    </section>
                </a>
            </Link>
        )
}