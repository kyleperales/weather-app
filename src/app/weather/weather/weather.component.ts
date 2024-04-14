import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { environment as env } from '../../../environment/environment';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, RouterLink],
  providers: [AuthService],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  city = '';
  userDetails: User | null = null;
  gitHubLink = ''
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userDetails = user
        this.gitHubLink = env.gitHubLink + user.nickname
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  getWeather() {
    if (this.city) {
      this.router.navigate(['city-weather', this.city], { relativeTo: this.route });
    }
  }
}
