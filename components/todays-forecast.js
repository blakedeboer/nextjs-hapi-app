import styles from './todays-forecast.module.css'

export default function TodaysForecast({date, day, weather, max, min, image }) {
    return (
        <article className={styles.grid}>
            <section>
                <p>{day}, {date}</p>
                <p>{max}</p>
                <p>{min}</p>
            </section>
            <section>
                <img
                    src={`/public/static/images/art_${image}.png`}
                />
                <p>{weather}</p>
            </section>
        </article>
    )
}