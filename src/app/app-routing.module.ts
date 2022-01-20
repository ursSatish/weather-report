import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WeatherReportComponent } from './weather-report/weather-report.component';

const routes: Routes = [
  { path: '', component: WeatherReportComponent },
  { path: 'forecast/:zipcode', component: WeatherForecastComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
