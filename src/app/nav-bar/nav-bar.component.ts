import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  providers: [AuthService],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(private auth: AuthService) { }

  logOut() {
    this.auth.logout();
  }
}
