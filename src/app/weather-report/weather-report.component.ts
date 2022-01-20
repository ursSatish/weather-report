import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css'],
})
export class WeatherReportComponent implements OnInit {
  currentWeatherData: any = new Array();
  zipCode: any;
  constructor(
    private weatherService: WeatherService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCurrentWeatherData();
  }

  // get the list of all weather report details
  getCurrentWeatherData() {
    const data = JSON.parse(localStorage.getItem('currentWeatherReport')!);
    if (data) this.currentWeatherData = data;
  }

  // submit new zipcode
  getCurrentWeatherZipCode(zipCode: string) {
    if (zipCode && zipCode !== '') {
      let ifExists = false;
      this.currentWeatherData.forEach((resp: any) => {
        if (resp.zipcode === zipCode) ifExists = true;
      });
      if (!ifExists) {
        this.weatherService.getWeatherByZip(zipCode).subscribe(
          (data: any) => {
            if (data) {
              data = { ...data, zipcode: zipCode };
              this.currentWeatherData.push(data);
              localStorage.setItem(
                'currentWeatherReport',
                JSON.stringify(this.currentWeatherData)
              );
            }
            this.zipCode = '';
            this.toastr.success('zipcode added successfully');
          },
          () => {
            this.toastr.warning(
              'invalid zipcode: ' +
                zipCode +
                ', or data not availble for this zipcode.'
            );
            this.zipCode = '';
          }
        );
      } else {
        this.zipCode = '';
        this.toastr.warning('zipcode already exists.');
      }
    } else {
      this.toastr.warning('Please enter zipcode.');
    }
  }

  //remove selected weather details
  remove(zipcode: string) {
    if (this.currentWeatherData && this.currentWeatherData.length > 0) {
      this.currentWeatherData = this.currentWeatherData.filter(
        (data: any) => data.zipcode !== zipcode
      );
      localStorage.setItem(
        'currentWeatherReport',
        JSON.stringify(this.currentWeatherData)
      );
    }
  }
}
