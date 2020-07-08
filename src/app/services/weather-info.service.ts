import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  getIconLink,
  getCurrentTime,
  getUnixTime,
  windDegToDirection,
} from '../shared/utils/calculate';
import {
  IWeatherInfo,
  IBasicWeatherInfo,
  IForecastInfo,
  IBasicForecast,
  IBasicForecastItem,
} from '../typings/weather-info';

@Injectable({
  providedIn: 'root',
})
export class WeatherInfoService {
  constructor(private http: HttpClient) {}
  // Target city fetch weather information
  private TARGET_CITY: string = 'Heidenheim,Germany';

  // get basic weather information
  getWeatherInfoByCity() {
    return this.http
      .get<IWeatherInfo>(
        `${environment.api}/weather?q=${this.TARGET_CITY}&appid=${environment.key}`
      )
      .pipe(
        map(
          ({ id, name, timezone, weather, main, wind, sys }): IBasicWeatherInfo => {
            // customize to value we need to use later
            return {
              id: id,
              name: name,
              country: sys.country,
              icon: getIconLink(weather[0].icon),
              currentTime: getCurrentTime(timezone),
              weather: weather[0].main,
              description: weather[0].description,
              temp: main.temp - 273.15,
              humidity: main.humidity,
              wind: windDegToDirection(wind.speed, wind.deg),
              sunrise: getUnixTime(sys.sunrise),
              sunset: getUnixTime(sys.sunset),
            };
          }
        )
      )
      .pipe(catchError(this.erroHandler));
  }

  // get forecast weather information
  getWeatherForecast() {
    return this.http
      .get<IForecastInfo>(
        `${environment.api}/forecast?q=${this.TARGET_CITY}&appid=${environment.key}`
      )
      .pipe(
        map(
          ({ city, list }): IBasicForecast => {
            // Get following 24hours forcast
            const forecastList: Array<IBasicForecastItem> = list
              .filter((_, i) => i < 8)
              .map(({ dt, main, weather, rain }, i) => ({
                date: getUnixTime(dt),
                temp: main.temp - 273.15,
                feelsLike: main.feels_like - 273.15,
                humidity: main.humidity,
                icon: getIconLink(weather[0].icon),
                description: weather[0].description,
                rain: rain ? rain['3h'] : null,
              }));
            return {
              id: city.id,
              list: forecastList,
            };
          }
        )
      )
      .pipe(catchError(this.erroHandler));
  }

  private erroHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error');
  }
}
