import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IWeatherInfo } from '../typings/weather-info';

@Injectable({
  providedIn: 'root',
})
export class WeatherInfoService {
  constructor(private http: HttpClient) {}
  TARGET_CITY: string = 'Heidenheim,Germany';
  getWeatherInfoByCity() {
    return this.http
      .get<IWeatherInfo>(`${environment.api}?q=${this.TARGET_CITY}&appid=${environment.key}`)
      .pipe(catchError(this.erroHandler));
  }

  erroHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error');
  }
}
