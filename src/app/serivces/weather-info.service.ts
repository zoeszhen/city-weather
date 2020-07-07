import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IWeatherInfo } from '../typings/weather-info';

@Injectable({
  providedIn: 'root',
})
export class WeatherInfoService {
  constructor(private http: HttpClient) {}
  TARGET_CITY: string = 'Heidenheim,Germany';
  getWeatherInfoByCity() {
    return this.http.get<IWeatherInfo>(
      `${environment.api}?q=${this.TARGET_CITY}&appid=${environment.key}`
    );
  }
}
