import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WeatherIconModule } from "../weather-icon/weather-icon.module";
import { LocationComponent } from "./location.component";

@NgModule({
  declarations: [
    LocationComponent
  ],
  imports: [
    CommonModule,
    WeatherIconModule
  ],
  exports: [
    LocationComponent
  ]
})
export class LocationModule { }
