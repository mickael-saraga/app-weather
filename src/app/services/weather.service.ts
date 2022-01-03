import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LocationBuilder } from './location.builder.service';
import { Location } from '../models/location.model';
import { WeatherCondition } from '../models/weather-condition.enum';
import { WeatherResponse } from '../models/weather-response.model';
import { WeatherWeekResponse } from '../models/weather-week-response.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  API_ID = environment.API_ID;
  // private openWeatherURL = 'https://openweathermap.org/api';
  BASE_OPEN_WEATHER_URL = environment.OPEN_WEATHER_URL +  'weather?appid=' + this.API_ID;
  BASE_OPEN_WEATHER_FORECAST_URL = environment.OPEN_WEATHER_URL +  'onecall?appid=' + this.API_ID;
  BASE_OPEN_WEATHER_5_FORECAST_URL = environment.OPEN_WEATHER_URL +  'forecast?appid=' + this.API_ID;
  countryCode = environment.COUNTRY_ISO_CODE;
  language = environment.lang;
  country = environment.country;
  units = environment.units;

  private locationToAdd = new Subject<string>();
  locationToAdd$ = this.locationToAdd.asObservable();

  constructor(private http: HttpClient) { }

  getLocationForecast(locationCode: string): Observable<WeatherResponse> {
    let weatherURL = this.BASE_OPEN_WEATHER_URL
                   + '&lang=' + this.language
                   + '&units=' + this.units;
    let searchQuery = '&zip=' + locationCode + ',' + this.countryCode;
    return this.http.get(weatherURL + searchQuery) as Observable<WeatherResponse>;
  }

  getLocationForecastData(zipCode: string): Observable<WeatherResponse | null> {
    let weatherURL = this.BASE_OPEN_WEATHER_URL
                   + '&lang=' + this.language
                   + '&units=' + this.units;
    let searchQuery = '&zip=' + zipCode + ',' + this.countryCode;
    return this.http.get(weatherURL + searchQuery)
                    .pipe(
                      map((response) => ({ ...response, zip: zipCode })),
                      catchError((error) => of(null))
                    ) as Observable<WeatherResponse | null>;
  }

  getLocationWeekForecastData(latitude: number, longitude: number): Observable<WeatherWeekResponse> {
    let weatherForecastURL = this.BASE_OPEN_WEATHER_FORECAST_URL
                           + '&lang=' + this.language
                           + '&units=' + this.units;
    let searchQuery = '&exclude=hourly,minutely,alerts'
                    + '&lat=' + latitude
                    + '&lon=' + longitude;
    return this.http.get(weatherForecastURL + searchQuery) as Observable<WeatherWeekResponse>;
  }

  getLocation5DaysForecast(latitude: number, longitude: number, zipCode?: string | null) {
    let weather5ForecastURL = this.BASE_OPEN_WEATHER_5_FORECAST_URL
                           + '&lang=' + this.language
                           + '&units=' + this.units
                           + '&cnt=5';
    let searchQuery = '&zip=' + zipCode + ',' + this.countryCode;
    return this.http.get(weather5ForecastURL + searchQuery);
  }

  buildLocation(zipCode: string, weatherResponse: WeatherResponse): Location {
    if (zipCode && weatherResponse) {
      return (new LocationBuilder()).zipCode(+zipCode)
                                    .setAll(weatherResponse)
                                    .build();
    }
    return (new LocationBuilder()).zipCode(0)
                                  .build();
  }

  submitLocationZipCode(newZipCode: string) {
    this.locationToAdd.next(newZipCode);
  }

  getWeatherConditionIconName(locationWeatherMain: string | undefined, locationWeatherIconValue?: string | undefined) {
    let iconName: string = '';
    switch (locationWeatherMain) {
      case WeatherCondition.CLEAR:
        iconName = WeatherCondition.SUN.toLocaleLowerCase();
        break;
      case WeatherCondition.CLOUDS:
        iconName = WeatherCondition.CLOUDS.toLocaleLowerCase();
        break;
      case WeatherCondition.RAIN:
        iconName = WeatherCondition.RAIN.toLocaleLowerCase();
        break;
      case WeatherCondition.SNOW:
        iconName = WeatherCondition.SNOW.toLocaleLowerCase();
        break;
      default:
        break;
    }
    if (!iconName) {
      iconName = this.getWeatherIconNameFromIconId(locationWeatherIconValue);
    }
    return iconName;
  }

  getWeatherIconNameFromIconId(locationWeatherIconValue: string | undefined) {
    let iconName: string = '';
    if (locationWeatherIconValue) {
      switch (locationWeatherIconValue.slice(0, -1)) {
        case '01':
          iconName = WeatherCondition.SUN.toLocaleLowerCase();
          break;
        case '13':
          iconName = WeatherCondition.SNOW.toLocaleLowerCase();
          break;
        case '09':
        case '10':
        case '11':
          iconName = WeatherCondition.RAIN.toLocaleLowerCase();
          break;
        case '02':
        case '03':
        case '04':
        case '50':
          iconName = WeatherCondition.CLOUDS.toLocaleLowerCase();
          break;
        default:
          break;
      }
    }
    return iconName;
  }

}
