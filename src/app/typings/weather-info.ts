import { NullTemplateVisitor } from '@angular/compiler';

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
