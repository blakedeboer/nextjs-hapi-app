import fetch from 'node-fetch'
import moment from 'moment'

const dataStore = {}

const upcomingForecastCount = 5
const dailyForecastCount = 1
const totalForecastCount = dailyForecastCount + upcomingForecastCount
const location = 'Atlanta'
const format = 'json'
const units = 'imperial'
const appid = 'd8c84f0e565326a65feb0491a79ee482' //store in ENV variable
const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast/daily\
?q=${location}&mode=${format}&cnt=${totalForecastCount}&units=${units}\
&APPID=${appid}`

const getAllWeatherData = async () => {
  const json = await fetch(weatherUrl).then(res => res.json())
  updateDataStore(json)
}

const getDay = date => {
  const isToday = date => date.isSame(moment(), 'd')
  const isTomorrow = date => date.isSame(moment().add(1, 'd'), 'd')
  
  if (isToday(date))
    return 'Today'
  else if (isTomorrow(date))
    return 'Tomorrow'
  else
    return date.format("dddd")
} 

const updateDataStore = json => {
  for (const dailyForecast of json.list) {
    const dateInMilliseconds = dailyForecast.dt*1000
    const date = moment(dateInMilliseconds)
    const id = parseInt(date.format("YYYYMMDD"), 10)
    
    dataStore[id] = {
      date: date.format("MMMM D"),
      day: getDay(date),
      weather: dailyForecast.weather[0].main,
      max: dailyForecast.temp.max,
      min: dailyForecast.temp.min,
      image: dailyForecast.weather[0].main.toLowerCase(),
      humidity: dailyForecast.humidity,
      pressure: dailyForecast.pressure,
      wind: dailyForecast.speed
    }
  }
}

const getDataStore = async () => {
  if (Object.keys(dataStore).length === 0)
    await getAllWeatherData()
  return dataStore
}

export async function getTodaysForecast() {
  const data = await getDataStore()
  const id = parseInt(moment().format("YYYYMMDD"), 10)
  const forecast = data[id]

  return {
    key: id,
    date: forecast.date,
    day: forecast.day, 
    weather: forecast.weather,
    max: forecast.max,
    min: forecast.min,
    image: forecast.weather.toLowerCase(),
  }
}

export async function getDetailForecastProps(id) {
  const data = await getDataStore()
  return data[id]
}

const getUpcomingDateIds = (dateCount) => {
  const dateIds = []
  for (let index = 1; index <= dateCount; index++) {
    let newDate = moment().add(index, 'd')
    let id = parseInt(newDate.format("YYYYMMDD"), 10)
    dateIds.push(id)
  }
  return dateIds
}

export const getUpcomingForecasts = async () => {  
  const data = await getDataStore()
  const upcomingDateIds = getUpcomingDateIds(upcomingForecastCount)
  
  return upcomingDateIds.map(id => {
    const forecast = data[id]
    return {
      key: id,
      id: id,
      date: forecast.date,
      day: forecast.day, 
      weather: forecast.weather,
      max: forecast.max,
      min: forecast.min,
      image: forecast.weather.toLowerCase(),
    }
  })
}