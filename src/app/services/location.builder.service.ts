import { Injectable } from "@angular/core";
import { Location } from "../models/location.model";
import { WeatherResponse } from "../models/weather-response.model";

@Injectable({
  providedIn: 'root'
})
export class LocationBuilder {
  private readonly location: Location;

  constructor() {
    // this.location = {
    //   name: '',
    //   zipCode: 0,
    //   temp: 0,
    //   tempMin: 0,
    //   tempMax: 0,
    //   latitude: 0,
    //   longitude: 0,
    //   weatherMain: '',
    //   weatherIcon: '0',
    //   weatherId: 0,
    // };
    this.location = new Location(0);
  }
  
  public zipCode(zipCode: number): LocationBuilder {
    this.location.zipCode = zipCode;
    return this;
  }
  public name(name: string): LocationBuilder {
    this.location.setName(name);
    return this;
  }
  public temp(temp: number): LocationBuilder {
    this.location.setTemp(temp);
    return this;
  }
  public tempMin(tempMin: number): LocationBuilder {
    this.location.setTempMin(tempMin);
    return this;
  }
  public tempMax(tempMax: number): LocationBuilder {
    this.location.setTempMax(tempMax);
    return this;
  }
  public latitude(latitude: number): LocationBuilder {
    this.location.setLatitude(latitude);
    return this;
  }
  public longitude(longitude: number): LocationBuilder {
    this.location.setLongitude(longitude);
    return this;
  }
  public weatherMain(weatherMain: string): LocationBuilder {
    this.location.setWeatherMain(weatherMain);
    return this;
  }
  public weatherIcon(weatherIcon: string): LocationBuilder {
    this.location.setWeatherIcon(weatherIcon);
    return this;
  }
  public weatherId(weatherId: number): LocationBuilder {
    this.location.setWeatherId(weatherId);
    return this;
  }
  public weatherDescription(weatherDescription: string): LocationBuilder {
    this.location.setWeatherDescription(weatherDescription);
    return this;
  }
  public feelsLike(feelsLike: number): LocationBuilder {
    this.location.setFeelsLike(feelsLike);
    return this;
  }

  public setAll(weatherResponse: WeatherResponse) {
    this.location.setName(weatherResponse.name);
    this.location.setTemp(weatherResponse.main.temp);
    this.location.setTempMin(weatherResponse.main.temp_min);
    this.location.setTempMax(weatherResponse.main.temp_max);
    this.location.setLatitude(weatherResponse.coord.lat);
    this.location.setLongitude(weatherResponse.coord.lon);
    this.location.setWeatherMain(weatherResponse.weather[0].main);
    this.location.setWeatherIcon(weatherResponse.weather[0].icon);
    this.location.setWeatherId(weatherResponse.weather[0].id);
    this.location.setWeatherDescription(weatherResponse.weather[0].description);
    this.location.setFeelsLike(weatherResponse.main.feels_like);
    return this;
  }

  build(): Location {
    return this.location;
  }
}
