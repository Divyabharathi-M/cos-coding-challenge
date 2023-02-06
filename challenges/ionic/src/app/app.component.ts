import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';


declare let cordova: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showLogOut = false;
  constructor(private authService: AuthenticationService,
    private router: Router,
    private platform: Platform,
    ) {

      console.log('INSIDE APP')
      this.platform.ready().then(()=> {
        console.log('got executed 1')
        if (cordova && cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            console.log('got executed 2')
        }
      });
    this.initialiseApp();
  }

  initialiseApp() {
    this.authService.checkToken();
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
  }
}
