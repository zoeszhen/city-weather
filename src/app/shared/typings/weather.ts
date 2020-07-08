export interface IForecastItem {
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

export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWind {
  speed: number;
  deg: number;
  guest: number;
}

export interface IClouds {
  all: number;
}

export interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}
