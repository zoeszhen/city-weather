import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IBasicWeatherInfo } from '../typings/weather-info';
import { WeatherInfoService } from '../services/weather-info.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.sass'],
})
export class WeatherInfoComponent implements OnInit {
  weatherInfo: IBasicWeatherInfo;
  erroMsg: string = '';
  isLoading: boolean = true;

  constructor(private _weatherInfoService: WeatherInfoService) {}

  ngOnInit(): void {
    this._weatherInfoService.getWeatherInfoByCity().subscribe(
      (data) => ((this.weatherInfo = data), (this.isLoading = false)),
      (error) => (this.erroMsg = error)
    );
  }
}
