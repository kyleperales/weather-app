import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslatePipe } from '../shared/translate/translate.pipe';

@UntilDestroy()
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    TranslatePipe
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  hasError = false

  get isAuthenticated$() {
    return this.auth.isAuthenticated$;
  
  }

  ngOnInit(): void {
    this.auth.error$
      .pipe(untilDestroyed(this))
      .subscribe((err) => {
        if (err) {
          this.hasError = true;
          console.error(err)
        }
      });

    this.auth.isAuthenticated$
      .pipe(untilDestroyed(this))
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.auth.idTokenClaims$.subscribe((token) => {
            this.router.navigate(['/weather']);
          });
        }
      })
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout();
  } 
}
