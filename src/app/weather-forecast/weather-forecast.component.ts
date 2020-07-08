import { Component, OnInit } from '@angular/core';
import { IForecastBasic } from '../typings/weather-info';
import { WeatherInfoService } from '../services/weather-info.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.sass'],
})
export class WeatherForecastComponent implements OnInit {
  forecastList: IForecastBasic;
  erroMsg: string = '';
  isLoading: boolean = true;
  //record which hourly forcast user wanna check details
  checkDetailsIndex: number = null;

  constructor(private _weatherInfoService: WeatherInfoService) {}

  ngOnInit(): void {
    this._weatherInfoService.getWeatherForecast().subscribe(
      (data) => ((this.forecastList = data), (this.isLoading = false)),
      (error) => (this.erroMsg = error)
    );
  }
}
