import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IWeatherInfo } from '../typings/weather-info';
import { WeatherInfoService } from '../services/weather-info.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.sass'],
})
export class WeatherInfoComponent implements OnInit {
  weatherInfo: IWeatherInfo;

  constructor(private _weatherInfoService: WeatherInfoService) {}

  ngOnInit(): void {
    this._weatherInfoService.getWeatherInfoByCity().subscribe((data) => (this.weatherInfo = data));
  }

  getIconLink(): string {
    return `http://openweathermap.org/img/wn/${this.weatherInfo.weather[0].icon}@2x.png`;
  }

  getTime(sec?: number): string {
    return !sec
      ? moment()
          .utcOffset(this.weatherInfo.timezone / 3600)
          .format('lll')
      : moment.unix(sec).format('LT');
  }

  windDegToDirection(deg): string {
    if (deg > 11.25 && deg < 33.75) {
      return 'NNE';
    } else if (deg > 33.75 && deg < 56.25) {
      return 'ENE';
    } else if (deg > 56.25 && deg < 78.75) {
      return 'E';
    } else if (deg > 78.75 && deg < 101.25) {
      return 'ESE';
    } else if (deg > 101.25 && deg < 123.75) {
      return 'ESE';
    } else if (deg > 123.75 && deg < 146.25) {
      return 'SE';
    } else if (deg > 146.25 && deg < 168.75) {
      return 'SSE';
    } else if (deg > 168.75 && deg < 191.25) {
      return 'S';
    } else if (deg > 191.25 && deg < 213.75) {
      return 'SSW';
    } else if (deg > 213.75 && deg < 236.25) {
      return 'SW';
    } else if (deg > 236.25 && deg < 258.75) {
      return 'WSW';
    } else if (deg > 258.75 && deg < 281.25) {
      return 'W';
    } else if (deg > 281.25 && deg < 303.75) {
      return 'WNW';
    } else if (deg > 303.75 && deg < 326.25) {
      return 'NW';
    } else if (deg > 326.25 && deg < 348.75) {
      return 'NNW';
    } else {
      return 'N';
    }
  }
}
