import { Component, Input, OnInit } from "@angular/core";
import { WeatherService } from "../../services/weather.service";

@Component({
  selector: 'weather-icon',
  templateUrl: './weather-icon.component.html'
})
export class WeatherIconComponent implements OnInit {
  @Input() iconId: string = '';
  @Input() weatherMain: string = '';
  @Input() iconHeight: number = 50;
  iconName: string = '';

  constructor(private service: WeatherService) { }

  ngOnInit(): void {
      this.iconName = this.service.getWeatherConditionIconName(this.weatherMain, this.iconId);
  }
}
