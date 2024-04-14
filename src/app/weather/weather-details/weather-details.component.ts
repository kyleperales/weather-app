import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WeatherDetailsService } from './weather-details.service';
import { TranslatePipe } from '../../shared/translate/translate.pipe';

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule, TranslatePipe],
  providers: [WeatherDetailsService],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.scss'
})
export class WeatherDetailsComponent implements OnInit {
  
  constructor(
    private weatherDetailsService: WeatherDetailsService,
    private route: ActivatedRoute,
  ) { }

  weathers: any[] = []
  city: string = '';
  hasError: boolean = false;

  ngOnInit() {
    this.city = this.route.snapshot.paramMap.get('city') ?? '';
    this.getCityWeather(this.city);
  }

  getCityWeather(city: string) {
    if (city) {
      this.weatherDetailsService.getCityWeather(city)      
        .subscribe((data) => {
          this.hasError = false
          this.weathers = [data];
        }, err => {
          this.weathers = []
          this.hasError = true
          console.error(err);
        });
    }
  }

  backToSearch() {  
    window.history.back();
  }
}
