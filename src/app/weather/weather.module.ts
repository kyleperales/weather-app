import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather/weather.component';

@NgModule({
  declarations: [],
  imports: [
    WeatherComponent,
    CommonModule,
    WeatherRoutingModule
  ]
})
export class WeatherModule { }
