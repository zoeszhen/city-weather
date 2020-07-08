import { TestBed, getTestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherInfoService } from './weather-info.service';
import { environment } from '../../environments/environment';
import { IBasicWeatherInfo, IForecastBasic } from '../typings/weather-info';

const dummyWeatherInfo: IBasicWeatherInfo = {
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
const dummyforecastInfo: IForecastBasic = {
  id: 0,
  list: [
    {
      date: '01.2020',
      temp: 20,
      feelsLike: 20,
      humidity: 0.43,
      icon: 'testicon',
      description: 'testDescription',
      rain: 0.5,
    },
  ],
};
describe('WeatherInfoService', () => {
  let service: WeatherInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherInfoService],
    });
    service = TestBed.inject(WeatherInfoService);
    httpMock = getTestBed().get(HttpTestingController);
  });

  describe('Get basic weather info', () => {
    it('should return an observable<IBasicWeatherInfo>', () => {
      service.getWeatherInfoByCity().subscribe((data) => {
        expect(data).toBe(dummyWeatherInfo);
      });
      const req = httpMock.expectOne(
        `${environment.api}/weather?q=Heidenheim,Germany&appid=${environment.key}`
      );
      expect(req.request.method).toBe('GET');
    });

    it('should throw an error', () => {
      service.getWeatherInfoByCity().subscribe(
        () => {},
        (err) => {
          expect(err).toBe(err.message);
        }
      );
    });
  });

  describe('Get basic forecast info', () => {
    it('should return an observable<IForecastBasic>', () => {
      service.getWeatherForecast().subscribe((data) => {
        expect(data).toBe(dummyforecastInfo);
      });
      const req = httpMock.expectOne(
        `${environment.api}/forecast?q=Heidenheim,Germany&appid=${environment.key}`
      );
      expect(req.request.method).toBe('GET');
    });

    it('should throw an error', () => {
      service.getWeatherForecast().subscribe(
        () => {},
        (err) => {
          expect(err).toBe(err.message);
        }
      );
    });
  });
});
