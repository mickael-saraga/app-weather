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
    const storedZipCodesString = localStorage.getItem(this.zipCodesKey);
    if (storedZipCodesString) {
      console.log('stored zipcodes', storedZipCodesString.split(','));
      const storedZipCodes = storedZipCodesString.split(',');
      if (storedZipCodes.filter(code => code.length).length) {
        this.allZipCodes = storedZipCodes;
      } else {
        localStorage.removeItem(this.zipCodesKey);
      }
    }
  }

  addZipCode() {
    if (this.zipCodeValue && this.zipCodeValue.length && this.allZipCodes.indexOf(this.zipCodeValue) === -1) {
      // this.allZipCodes.push(this.zipCodeValue);
      this.allZipCodes = this.allZipCodes.concat([this.zipCodeValue]);
      this.weatherService.submitLocationZipCode(this.zipCodeValue);
      localStorage.setItem(this.zipCodesKey, this.allZipCodes.join());
    }
    this.clearLocationInput();
  }

  onLocationAdded(zipCode: string) {
    // this.allZipCodes.push(zipCode);
    // localStorage.setItem(this.zipCodesKey, this.allZipCodes.join());
  }

  clearLocationInput() {
    this.zipCodeValue = '';
  }


  onSubmit() {
    this.submitted = true;
  }

  removeLocation(locationToRemove: Location) {
    this.locations = this.locations.filter((location: Location) => location.zipCode !== locationToRemove.zipCode);
    this.allZipCodes = this.allZipCodes.filter((code: string) => +code !== locationToRemove.zipCode);
    localStorage.setItem(this.zipCodesKey, this.allZipCodes.join());
  }

  removeAllLocations() {
    localStorage.removeItem(this.zipCodesKey);
    this.allZipCodes = [];
    this.locations = [];
  }

  onLocationRemoved(zipCode: number) {
    this.allZipCodes = this.allZipCodes.filter((code: string) => +code !== zipCode);
    localStorage.setItem(this.zipCodesKey, this.allZipCodes.join());
  }

}
