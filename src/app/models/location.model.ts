export class Location {
    private _name: string = '';
    private _temp: number = 0;
    private _tempMin: number = 0;
    private _tempMax: number = 0;
    private _weatherMain: string = '';
    private _weatherIcon: string = '';
    private _weatherId: number = 0;
    private _latitude: number = 0;
    private _longitude: number = 0;
    private _weatherDescription?: string;
    private _feelsLike?: number;

  constructor(
    public zipCode: number,
    // public name: string,
    // public temp: number,
    // public tempMin: number,
    // public tempMax: number,
    // public weatherIcon: string,
    // public weatherId: number,
    // public latitude: number,
    // public longitude: number,
    // public weatherDescription?: string,
    // public feelsLike?: number,
  ) { }

  // get zipCode() {
  //   return this.zipCode;
  // }
  public get name(): string {
    return this._name;
  }
  public get temp(): number {
    return this._temp;
  }
  public get tempMin(): number {
    return this._tempMin;
  }
  public get tempMax(): number {
    return this._tempMax;
  }
  public get latitude(): number {
    return this._latitude;
  }
  public get longitude(): number {
    return this._longitude;
  }
  public get weatherMain(): string {
    return this._weatherMain;
  }
  public get weatherIcon(): string {
    return this._weatherIcon;
  }
  public get weatherId(): number {
    return this._weatherId;
  }
  public get weatherDescription(): string | undefined {
    return this._weatherDescription;
  }
  public get feelsLike(): number | undefined {
    return this._feelsLike;
  }

  setZipCode(zipCode: number) {
    this.zipCode = zipCode;
    return this;
  }
  setName(name: string) {
    this._name = name;
    return this;
  }
  setTemp(temp: number) {
    this._temp = temp;
    return this;
  }
  setTempMin(tempMin: number) {
    this._tempMin = tempMin;
    return this;
  }
  setTempMax(tempMax: number) {
    this._tempMax = tempMax;
    return this;
  }
  setLatitude(latitude: number) {
    this._latitude = latitude;
    return this;
  }
  setLongitude(longitude: number) {
    this._longitude = longitude;
    return this;
  }
  setWeatherMain(weatherMain: string) {
    this._weatherMain = weatherMain;
    return this;
  }
  setWeatherIcon(weatherIcon: string) {
    this._weatherIcon = weatherIcon;
    return this;
  }
  setWeatherId(weatherId: number) {
    this._weatherId = weatherId;
    return this;
  }
  setWeatherDescription(weatherDescription: string) {
    this._weatherDescription = weatherDescription;
    return this;
  }
  setFeelsLike(feelsLike: number) {
    this._feelsLike = feelsLike;
    return this;
  }
}

export interface LocationCoordinates {
  name: string,
  lat: number,
  lon: number
}
