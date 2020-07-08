import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IWeatherInfo, IBasicWeatherInfo } from '../typings/weather-info';

@Injectable({
  providedIn: 'root',
})
export class WeatherInfoService {
  constructor(private http: HttpClient) {}
  private TARGET_CITY: string = 'Heidenheim,Germany';
  getWeatherInfoByCity() {
    return this.http
      .get<IWeatherInfo>(`${environment.api}?q=${this.TARGET_CITY}&appid=${environment.key}`)
      .pipe(
        map(
          ({ id, name, timezone, weather, main, wind, sys }): IBasicWeatherInfo => {
            // customize to value we need to use later
            return {
              id: id,
              name: name,
              country: sys.country,
              icon: this.getIconLink(weather[0].icon),
              currentTime: this.getCurrentTime(timezone),
              weather: weather[0].main,
              description: weather[0].description,
              temp: main.temp - 273.15,
              humidity: main.humidity,
              wind: this.windDegToDirection(wind.speed, wind.deg),
              sunrise: this.getUnixTime(sys.sunrise),
              sunset: this.getUnixTime(sys.sunset),
            };
          }
        ),
        catchError((error) => catchError(this.erroHandler))
      );
  }

  private erroHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error');
  }
  // Generate icon link
  private getIconLink(iconId: string): string {
    return `http://openweathermap.org/img/wn/${iconId}@2x.png`;
  }
  //calculate current local time
  private getCurrentTime(timezoneOffset: number): string {
    return moment()
      .utcOffset(timezoneOffset / 3600)
      .format('lll');
  }
  //calculate Unix time
  private getUnixTime(sec: number): string {
    return moment.unix(sec).format('LT');
  }

  private windDegToDirection(speed: number, deg: number): string {
    const speedToString = `${speed} m/s`;
    if (deg > 11.25 && deg < 33.75) {
      return `${speedToString} NNE`;
    }
    if (deg > 33.75 && deg < 56.25) {
      return `${speedToString} ENE`;
    }
    if (deg > 56.25 && deg < 78.75) {
      return `${speedToString} E`;
    }
    if (deg > 78.75 && deg < 101.25) {
      return `${speedToString} ESE`;
    }
    if (deg > 101.25 && deg < 123.75) {
      return `${speedToString} ESE`;
    }
    if (deg > 123.75 && deg < 146.25) {
      return `${speedToString} SE`;
    }
    if (deg > 146.25 && deg < 168.75) {
      return `${speedToString} SSE`;
    }
    if (deg > 168.75 && deg < 191.25) {
      return `${speedToString} S`;
    }
    if (deg > 191.25 && deg < 213.75) {
      return `${speedToString} SSW`;
    }
    if (deg > 213.75 && deg < 236.25) {
      return `${speedToString} SW`;
    }
    if (deg > 236.25 && deg < 258.75) {
      return `${speedToString} WSW`;
    }
    if (deg > 258.75 && deg < 281.25) {
      return `${speedToString} W`;
    }
    if (deg > 281.25 && deg < 303.75) {
      return `${speedToString} WNW`;
    }
    if (deg > 303.75 && deg < 326.25) {
      return `${speedToString} NW`;
    }
    if (deg > 326.25 && deg < 348.75) {
      return `${speedToString} NNW`;
    } else {
      return `${speedToString} N`;
    }
  }
}
