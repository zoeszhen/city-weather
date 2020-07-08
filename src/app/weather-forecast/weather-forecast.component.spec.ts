import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherForecastComponent } from './weather-forecast.component';
import { WeatherInfoService } from '../services/weather-info.service';

const dummyforecastInfo = {
  id: 0,
  list: [
    {
      date: '01.2020',
      temp: 20,
      feelsLike: 20,
      humidity: 0.43,
      icon: 'http://openweathermap.org/img/wn/03d@2x.png',
      description: 'testDescription',
      rain: 0.5,
    },
  ],
};
class WeatherInfoServiceMock {
  getWeatherForecast() {
    return of(dummyforecastInfo);
  }
}

describe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent;
  let fixture: ComponentFixture<WeatherForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherForecastComponent],
      providers: [{ provide: WeatherInfoService, useClass: WeatherInfoServiceMock }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(WeatherForecastComponent);
        component = fixture.componentInstance; // UserComponent test instance
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should loading initial weather data correctly', () => {
    component.ngOnInit();
    expect(component.forecastList).toBe(dummyforecastInfo);
    expect(component.erroMsg).toBe('');
    expect(component.isLoading).toBe(false);
    expect(component.checkDetailsIndex).toBe(0);
  });
});
