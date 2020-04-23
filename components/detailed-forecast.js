import styles from './detailed-forecast.module.css'

export default function DetailedForecast({ props }) {
    const {
        date,
        day,
        max,
        min,
        weather,
        image,
        humidity,
        pressure,
        wind
    } = props
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
            <section>
                <p>Humidity: {humidity} %</p>
                <p>Pressure: {pressure} hPa</p>
                <p>Wind: {wind} km/h</p> {/* add prop for direction*/}
            </section>
        </article>
    )
}