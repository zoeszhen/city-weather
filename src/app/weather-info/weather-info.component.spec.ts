import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherInfoComponent } from './weather-info.component';
import { WeatherInfoService } from '../services/weather-info.service';

const dummyWeatherInfo = {
  id: 1,
  name: 'test',
  country: 'test country',
  icon: 'test icon',
  currentTime: '12.30 pm',
  weather: 'sunny',
  description: 'really sunny',
  temp: 20,
  humidity: 20,
  wind: '20m/s WW',
  sunrise: '5AM',
  sunset: '3PM',
};
class WeatherInfoServiceMock {
  getWeatherInfoByCity() {
    return of(dummyWeatherInfo);
  }
}

describe('WeatherInfoComponent', () => {
  let component: WeatherInfoComponent;
  let fixture: ComponentFixture<WeatherInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherInfoComponent],
      providers: [{ provide: WeatherInfoService, useClass: WeatherInfoServiceMock }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(WeatherInfoComponent);
        component = fixture.componentInstance; // UserComponent test instance
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should loading initial weather data correctly', () => {
    component.ngOnInit();
    expect(component.weatherInfo).toBe(dummyWeatherInfo);
    expect(component.erroMsg).toBe('');
    expect(component.isLoading).toBe(false);
  });
});
