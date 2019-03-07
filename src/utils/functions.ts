import dotenv from 'dotenv'
import format from 'date-fns/format'
import { BASE_URL } from './constants'
import { Data, Weather } from './interface'

dotenv.config()

export const makeUrl = (name: string, postalCode: number) => {
  const { API_KEY } = process.env;
  const zip = `${postalCode},${name}`
  const modifiedUrl = `${BASE_URL}?APPID=${API_KEY}&zip=${zip}`
  return modifiedUrl
}

const formatDate = (timestamp: number) => {
  const formattedTime = format(new Date(timestamp * 1000), 'MM/DD/YYYY hh:mm:ss')
  return formattedTime
}

const formatWeather = (weather: Array<Weather>) => {
  let formattedWeather = ""
  weather.forEach(data => {
    formattedWeather += `${data.main} [${data.description}]`
  })
  return formattedWeather
}

 
export const formatResult = (result: Data) => {
  let formattedResult: string = ""
  formattedResult += formatWeather(result.weather) + "\n"
  formattedResult += formatDate(result.dt) + "\n"
  return formattedResult
}