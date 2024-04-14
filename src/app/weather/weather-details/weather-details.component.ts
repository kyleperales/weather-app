import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WeatherDetailsService } from './weather-details.service';

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  providers: [WeatherDetailsService],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.scss'
})
export class WeatherDetailsComponent implements OnInit {
  
  constructor(
    private weatherDetailsService: WeatherDetailsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const city = this.route.snapshot.paramMap.get('city') ?? '';
    this.getCityWeather(city);
  }

  getCityWeather(city: string) {
    if (city) {
      this.weatherDetailsService.getCityWeather(city)
        .subscribe((data) => {
          console.log(data);
        } );
    }
  }
}
