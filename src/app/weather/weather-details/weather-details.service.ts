import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment as env } from '../../../environment/environment';
import moment from 'moment';

interface IWeatherDetail {
  name: string;
  date: string;
  temp: string;
  feelsLike: string;
  humidity: number;
  description: string;
  main: string;
  windSpeed: number;
}

@Injectable()
export class WeatherDetailsService {

  constructor(private http: HttpClient) { }

  getCityWeather(city: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${env.apiKey}`;
    return this.http.get(url)
      .pipe(map((data: any) => this.mapDataToWeatherDetail(data)));
  }

  private mapDataToWeatherDetail(data: any): IWeatherDetail {
    return {
      name: data.name,
      date: moment().format('MMMM DD, YYYY'),
      temp: this.convertKelvinToFahrenheit(data.main.temp),
      feelsLike: this.convertKelvinToFahrenheit(data.main.feels_like),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      main: data.weather[0].main,
      windSpeed: data.wind.speed,
    };
  }

  convertKelvinToFahrenheit(kelvin: number) {
    if (kelvin === undefined || kelvin === null) {
      return '0'
    }

    return ((kelvin - 273.15) * 9 / 5 + 32).toFixed(2);
  } 
}
