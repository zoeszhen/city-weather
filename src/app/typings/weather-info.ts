import { NullTemplateVisitor } from '@angular/compiler';

//interface for fetch weather api
export interface IWeatherInfo {
  name: string;
  id: number;
  timezone: number;
  sys: ICountryInfo;
  weather: Array<IWeather>;
  coord: IGeocoords;
  base: string;
  wind: IWind;
  clouds: IClouds;
  dt: number;
  code: number;
  main: IMain;
}

export interface IForecastInfo {
  cod: string;
  message: number;
  cnt: number;
  list: Array<IForecastItem>;
  city: ICity;
}

//interface for basic weahter info rendering
export interface IBasicWeatherInfo {
  id: number;
  name: string;
  country: string;
  icon: string;
  currentTime: string;
  weather: string;
  description: string;
  temp: number;
  humidity: number;
  wind: string;
  sunrise: string;
  sunset: string;
}

//interface for basic weahter info rendering
export interface IForecastBasic {
  id: number;
  list: Array<IForecastItemBasic>;
}

export interface IForecastItemBasic {
  date: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  icon: string;
  description: string;
  rain: number;
}
interface IForecastItem {
  dt: number;
  main: IMain & {
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<IWeather>;
  clouds: IClouds;
  wind: IWind;
  sys: {
    pod: string;
  };
  rain?: {
    '3h': number;
  };
  dt_txt: string;
}

interface ICity {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}
interface ICountryInfo {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface IGeocoords {
  lon: number;
  lat: number;
}

interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IWind {
  speed: number;
  deg: number;
  guest: number;
}

interface IClouds {
  all: number;
}

interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: NullTemplateVisitor;
  humidity: number;
}
