import axios from 'axios'
import { locationData } from './data'
import { makeUrl, formatResult } from './utils/functions'
import { Result, Location, Data } from './utils/interface'


const getCurrentWeather = async (locations: Location[], makeUrlFn: Function): Promise<object> => {
  const result: Array<object> = []
  let promise: Array<object>
  let modifiedUrl: string
  let resolved: Promise<object>

  locations.forEach(({ postalCode, name }) => {
    modifiedUrl = makeUrlFn(name, postalCode)
    resolved = axios.get(modifiedUrl)
    result.push(resolved)
  })
  
  try {
    promise = await Promise.all([...result])
  } catch(err) {
    throw new Error(err)
  }

  return [...promise]
} 

const displayWeatherResults = () => {
  getCurrentWeather(locationData, makeUrl)
    .then((weatherResults: Array<Result>) => {
      weatherResults.forEach((result: Result, i: number) => {
        const data: Data = result.data
        console.log(formatResult(data))
      })
    })
    .catch(error => {
      console.log(`Error: ${error.message}`)
    })
}


// ---- Print the result to stdout ----

console.log(displayWeatherResults())