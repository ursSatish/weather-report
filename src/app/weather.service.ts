import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AppConst from '../app/app.consts';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getWeatherByZip(zipCode: string) {
    return this.httpClient.get(
      AppConst.apiUrl +
        'weather?zip=' +
        zipCode +
        ',' +
        AppConst.countryCode +
        '&appid=' +
        AppConst.appid
    );
  }

  getForeCastWeather(zipCode: string) {
    return this.httpClient.get(
      AppConst.apiUrl +
        'forecast/daily?zip=' +
        zipCode +
        ',' +
        AppConst.countryCode +
        '&appid=' +
        AppConst.appid
    );
  }
}
