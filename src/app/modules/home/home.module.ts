import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LocationsModule } from "../locations/locations.module";
import { HomeComponent } from "./home.component";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LocationsModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {}
