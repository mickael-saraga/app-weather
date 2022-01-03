import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin, Subscription } from "rxjs";
import { environment } from "../../../environments/environment";
import { Location } from "../../models/location.model";
import { WeatherResponse } from "../../models/weather-response.model";
import { WeatherService } from "../../services/weather.service";

@Component({
  selector: 'locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy {

  @Input() zipCodes: string[] = [];
  @Output() locationRemoved = new EventEmitter<number>();
  @Output() locationAdded = new EventEmitter<string>();
  locations: Location[] = [];
  locationAdditionSubscription: Subscription = new Subscription();
  loading: boolean = false;

  constructor(private service: WeatherService,
              private router: Router) {
    this.locationAdditionSubscription = this.service.locationToAdd$.subscribe((newZipCode) => {
      service.getLocationForecastData(newZipCode).subscribe((locationResponse) => {
        if (locationResponse) {
          this.locations.push(service.buildLocation(newZipCode, locationResponse));
          this.locationAdded.emit(newZipCode);
        }
      });
    });
  }

  ngOnInit() {
      if (this.zipCodes) {
        this.loading = true;
        this.buildAllLocations();
      }
      // this.service.locationToAdd$.subscribe((newZipCode) => {
      //   console.log(newZipCode);
      // });
  }

  buildAllLocations() {
    forkJoin(
      this.zipCodes.map((code) => this.service.getLocationForecastData(code))
    ).subscribe(
      (weatherLocationsResponses: (WeatherResponse | null)[]) => {
        console.log(weatherLocationsResponses);
        weatherLocationsResponses.forEach((weatherResponse) => {
          if (weatherResponse) {
            this.locations.push(this.service.buildLocation(weatherResponse.zip, weatherResponse));
          }
        });
        this.loading = false;
      },
      (error) => this.loading = false,
      () => this.loading = false
    );
  }

  openLocationWeek(location: Location) {
    if (location && location.zipCode) {
      const coordinates = {
        name: location.name,
        lat: location.latitude,
        lon: location.longitude
      };
      this.router.navigate([environment.paths.forecast, location.zipCode], { queryParams: coordinates });
    }
  }

  onRemoveLocationAsked(locationZipCode: number) {
    if (locationZipCode) {
      const foundIndex = this.locations.findIndex((location: Location) => location.zipCode === locationZipCode);
      if (foundIndex > -1) {
        this.locations.splice(foundIndex, 1);
        this.locationRemoved.emit(locationZipCode);
      }
    }
  }

  ngOnDestroy() {
      this.locationAdditionSubscription.unsubscribe();
  }
}
