import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  city = '';

  getWeather() {
    if (this.city) {
      this.router.navigate(['city-weather', this.city], { relativeTo: this.route });
    }
  }
}
