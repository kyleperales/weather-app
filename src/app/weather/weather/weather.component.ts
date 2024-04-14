import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { environment as env } from '../../../environment/environment';
import { TranslatePipe } from '../../shared/translate/translate.pipe';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, RouterLink, TranslatePipe],
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

  get name() {
    if (this.userDetails) {
      return this.userDetails.name
        ? this.userDetails.name
        : this.userDetails.nickname    
    } else {
      return ''
    }
  }

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
