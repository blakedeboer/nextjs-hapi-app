import Head from 'next/head'
import Link from 'next/link'
import DetailedForecast from '../../../components/detailed-forecast'
import { getDetailForecastProps } from '../../../lib/data.js'

const Detail = (props) => {
    console.log("whats props", props)
    return (
        <div className="container">
            <Head>
                <title>Sunshine</title>
            </Head>
            <header>
                <button>
                    <Link href="/" as="/">
                        <a>BACK</a>            
                    </Link>
                </button>
            </header>
            <main>
                <DetailedForecast props={props}></DetailedForecast>
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

export const getServerSideProps = async ({ query }) => {  
    const id = parseInt(query.id, 10)
    return {
        props: await getDetailForecastProps(id)
    }
}

export default Detail