export class LocationWeatherBuilder {

    // public zipCode: number = 0;
    private name: string = '';
    private temp: number = 0;
    private tempMin: number = 0;
    private tempMax: number = 0;
    private weatherIcon: string = '';
    private weatherId: number = 0;
    private weatherDescription?: string;
    private feelsLike?: number;

  constructor(
    public zipCode: number
  ) { }
  
  get ZipCode() {
    return this.zipCode;
  }
  get Name() {
    return this.name;
  }
  get Temp() {
    return this.temp;
  }
  get TempMin() {
    return this.tempMin;
  }
  get TempMax() {
    return this.tempMax;
  }
  get WeatherIcon() {
    return this.weatherIcon;
  }
  get WeatherId() {
    return this.weatherId;
  }
  get WeatherDescription() {
    return this.weatherDescription;
  }
  get FeelsLike() {
    return this.feelsLike;
  }

  setZipCode(zipCode: number): LocationWeatherBuilder {
    this.zipCode = zipCode;
    return this;
  }
  setName(name: string): LocationWeatherBuilder {
    this.name = name;
    return this;
  }
  setTemp(temp: number): LocationWeatherBuilder {
    this.temp = temp;
    return this;
  }
  setTempMin(tempMin: number): LocationWeatherBuilder {
    this.tempMin = tempMin;
    return this;
  }
  setTempMax(tempMax: number): LocationWeatherBuilder {
    this.tempMax = tempMax;
    return this;
  }
  setWeatherIcon(weatherIcon: string): LocationWeatherBuilder {
    this.weatherIcon = weatherIcon;
    return this;
  }
  setWeatherId(weatherId: number): LocationWeatherBuilder {
    this.weatherId = weatherId;
    return this;
  }
  setWeatherDescription(weatherDescription: string): LocationWeatherBuilder {
    this.weatherDescription = weatherDescription;
    return this;
  }
  setFeelsLike(feelsLike: number): LocationWeatherBuilder {
    this.feelsLike = feelsLike;
    return this;
  }

  

  build(): Location {
    return new Location();
  }

}
