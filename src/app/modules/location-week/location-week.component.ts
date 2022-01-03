import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { WeatherWeekDailyResponse, WeatherWeekResponse } from "../../models/weather-week-response.model";
import { WeatherService } from "../../services/weather.service";

@Component({
  selector: 'location-week',
  templateUrl: './location-week.component.html',
  styleUrls: ['./location-week.component.scss']
})
export class LocationWeekComponent implements OnInit {
  locationZipCode: string | null = '';
  locationName: string | null = '';
  locationWeekDays: WeatherWeekDailyResponse[] = [];
  loading: boolean = false;

  constructor(private weatherService: WeatherService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.locationZipCode = this.route.snapshot.paramMap.get(environment.queryParams.zipcode);
    this.loading = true;
    this.route.queryParamMap.pipe(
      switchMap((paramsMap: ParamMap) => {
        this.locationName = paramsMap.get(environment.queryParams.name);
        return this.weatherService.getLocationWeekForecastData(
          Number(paramsMap.get(environment.queryParams.latitude)),
          Number(paramsMap.get(environment.queryParams.longoitude))
        );
      })
    )
    .subscribe(
      (locationWeekForecast: WeatherWeekResponse) => {
        this.locationWeekDays = locationWeekForecast?.daily;
        this.loading = false;
      },
      (error) => this.loading = false,
      () => this.loading = false
    );
  }

  back() {
    this.router.navigate(['']);
  }
}
