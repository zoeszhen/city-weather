import { IGeocoords, ICountryInfo, ICity } from '../shared/typings/country';
import { IForecastItem, IWeather, IWind, IClouds, IMain } from '../shared/typings/weather';

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
