export interface Result {
  data: Data
}

export interface Location {
  name: string
  postalCode: string
}

export interface Data {
  weather: Array<Weather>
  dt: number
}

export interface Weather {
  main: string
  description: string
}