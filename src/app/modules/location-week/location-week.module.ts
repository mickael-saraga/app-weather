import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WeatherIconModule } from "../weather-icon/weather-icon.module";
import { LocationWeekComponent } from "./location-week.component";

@NgModule({
  declarations: [
    LocationWeekComponent
  ],
  imports: [
    CommonModule,
    WeatherIconModule
  ],
  exports: [
    LocationWeekComponent
  ]
})
export class LocationWeekModule { }
