import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
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
export class LocationsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() zipCodes: string[] = [];
  @Output() locationRemoved = new EventEmitter<string>();
  @Output() locationAdded = new EventEmitter<string>();
  locations: Location[] = [];
  locationAdditionSubscription: Subscription = new Subscription();
  loading: boolean = false;

  constructor(private service: WeatherService,
              private router: Router,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
      if (this.zipCodes) {
        this.loading = true;
        this.locationAdditionSubscription = this.service.locationToAdd$.subscribe((newZipCode) => {
          this.changeDetector.markForCheck();
          this.locationAdded.emit(newZipCode);
        });
      }
  }

  ngOnChanges(changes: SimpleChanges) {
    let zipCodesChanges = changes.zipCodes;
    this.zipCodes = zipCodesChanges.currentValue;
    this.buildAllLocations();
    if (zipCodesChanges) {
      if (!zipCodesChanges.previousValue && zipCodesChanges.currentValue && zipCodesChanges.currentValue.length) {
        this.locationAdded.emit(zipCodesChanges.currentValue[0]);
      }
    }
  }

  buildAllLocations() {
    forkJoin(
      this.zipCodes.map((code) => this.service.getLocationForecastData(code))
    ).subscribe(
      (weatherLocationsResponses: (WeatherResponse)[]) => {
        this.locations = weatherLocationsResponses.filter((weatherResponse) => weatherResponse.cod === 200)
                                                  .map((weatherResponse) => this.service.buildLocation(weatherResponse));
        this.changeDetector.markForCheck();
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

  onRemoveLocationAsked(locationZipCode: string) {
    if (locationZipCode) {
      const foundIndex = this.locations.findIndex((location: Location) => location.zipCode === locationZipCode);
      if (foundIndex > -1) {
        this.locations.splice(foundIndex, 1);
        this.locationRemoved.emit(locationZipCode);
      }
    }
  }

  ngOnDestroy() {
    if (this.locationAdditionSubscription) {
      this.locationAdditionSubscription.unsubscribe();
    }
  }
}
