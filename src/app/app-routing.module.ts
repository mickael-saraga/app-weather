import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { HomeComponent } from './modules/home/home.component';
import { LocationWeekComponent } from './modules/location-week/location-week.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: environment.paths.forecast + '/:' + environment.queryParams.zipcode, component: LocationWeekComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
