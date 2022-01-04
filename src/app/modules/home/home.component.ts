import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocationWeatherBuilder } from '../../services/location-weather-builder.service';
import { Location } from '../../models/location.model';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  zipCodesKey: string = environment.storage_zipcodes_key;
  allZipCodes: string[] = [];
  zipCodeValue: string = '';
  submitted = false;
  locations: any[] = [];
  locations$: Observable<string>[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    const storedZipCodesString = sessionStorage.getItem(this.zipCodesKey);
    if (storedZipCodesString) {
      const storedZipCodes = storedZipCodesString.split(',');
      if (storedZipCodes.filter(code => code.length).length) {
        this.allZipCodes = storedZipCodes;
      } else {
        sessionStorage.removeItem(this.zipCodesKey);
      }
    }
  }

  addLocationZipCode() {
    this.onSubmit();
  }

  onLocationAdded(zipCode: string) {
    this.allZipCodes.unshift(zipCode);
    sessionStorage.setItem(this.zipCodesKey, this.allZipCodes.join());
  }

  clearLocationInput() {
    this.zipCodeValue = '';
    this.submitted = false;
  }


  onSubmit() {
    this.submitted = true;
    if (this.zipCodeValue && this.zipCodeValue.length && this.allZipCodes.indexOf(this.zipCodeValue) === -1) {
      this.weatherService.submitLocationZipCode(this.zipCodeValue);
    }
    this.clearLocationInput();
  }

  removeLocation(locationToRemove: Location) {
    this.locations = this.locations.filter((location: Location) => location.zipCode !== locationToRemove.zipCode);
    this.allZipCodes = this.allZipCodes.filter((code: string) => +code !== locationToRemove.zipCode);
    sessionStorage.setItem(this.zipCodesKey, this.allZipCodes.join());
  }

  removeAllLocations() {
    sessionStorage.removeItem(this.zipCodesKey);
    this.allZipCodes = [];
    this.locations = [];
  }

  onLocationRemoved(zipCodeToRemove: number) {
    // this.allZipCodes = this.allZipCodes.filter((code: string) => +code !== zipCodeToRemove);
    const foundIndex = this.allZipCodes.findIndex((zipCode: string) => zipCodeToRemove === +zipCode);
    if (foundIndex > -1) {
      this.allZipCodes.splice(foundIndex, 1);
      sessionStorage.setItem(this.zipCodesKey, this.allZipCodes.join());
    }
  }

  allowOnlyNumbers(event: KeyboardEvent): boolean {
    const numericPattern = /^([0-9])$/;
    if (event.key === 'Enter' && this.zipCodeValue) {
      return true;
    } else {
      return numericPattern.test(event.key);
    }
  }

}
