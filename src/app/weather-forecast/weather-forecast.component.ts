import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
})
export class WeatherForecastComponent implements OnInit {
  zipCode!: string;
  forCastDataForZip: any;
  filteredForeCastList = [];
  constructor(
    private activatedroute: ActivatedRoute,
    private weatherService: WeatherService
  ) {
    this.activatedroute.params.subscribe((data) => {
      this.zipCode = data['zipcode'];
    });
  }

  ngOnInit() {
    this.weatherService
      .getForeCastWeather(this.zipCode)
      .subscribe((data: any) => {
        if (data) {
          this.forCastDataForZip = data;
          this.forCastDataForZip.list.forEach((data: any, i: number) => {
            this.forCastDataForZip.list[i] = {
              ...this.forCastDataForZip.list[i],
              dt_txt: new Date(data.dt * 1000),
            };
          });
        }
      });
  }
}
