import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LocationModule } from "../location/location.module";
import { LocationsComponent } from "./locations.component";

@NgModule({
  declarations: [
    LocationsComponent
  ],
  imports: [
    CommonModule,
    LocationModule
  ],
  exports: [
    LocationsComponent
  ]
})
export class LocationsModule { }
