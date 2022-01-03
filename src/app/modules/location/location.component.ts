import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Location } from "../../models/location.model";

@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  @Input() location: Location | undefined;
  @Output() removeLocationAsked = new EventEmitter<number>();

  removeLocation(locationZipCode: number) {
    event?.stopPropagation();
    this.removeLocationAsked.emit(locationZipCode);
  }

}
