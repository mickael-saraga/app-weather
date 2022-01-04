import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { Location } from "../../models/location.model";

@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  @Input() location: Location | undefined;
  @Output() removeLocationAsked = new EventEmitter<number>();

  constructor(private router: Router) { }

  removeLocation(locationZipCode: number) {
    event?.stopPropagation();
    this.removeLocationAsked.emit(locationZipCode);
  }
  
  openLocationWeek(location: Location) {
    event?.stopPropagation();
    if (location && location.zipCode) {
      const coordinates = {
        name: location.name,
        lat: location.latitude,
        lon: location.longitude
      };
      this.router.navigate([environment.paths.forecast, location.zipCode], { queryParams: coordinates });
    }
  }

}
