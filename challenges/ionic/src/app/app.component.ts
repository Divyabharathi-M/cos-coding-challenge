import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showLogOut = false;
  constructor(private authService: AuthenticationService,
    private router: Router,
    ) { 
          this.initialiseApp();
  }

  initialiseApp() {
    this.authService.authenticationState.subscribe((state)=> {
      if(state) {
        this.showLogOut = true;
        this.router.navigate(['customer','home']);
      } else {
        this.showLogOut = false;
        this.router.navigate(['login']);
      }
    })
  }

  logOut() {
    this.authService.logout();
    window.location.reload();
  }
}
