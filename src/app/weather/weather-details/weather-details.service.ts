import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environment/environment';

@Injectable()
export class WeatherDetailsService {

  constructor(private http: HttpClient) { }

  getCityWeather(city: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${env.apiKey}`;
    return this.http.get(url);
  }
}
