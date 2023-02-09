import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { TranslateService } from "@ngx-translate/core";
import { IonSelect } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showLogOut = false;
  
  @ViewChild('mySelect', { static: false }) selectRef!: IonSelect;

  constructor(private authService: AuthenticationService,
    private router: Router,
    private translate: TranslateService) {
      translate.setDefaultLang('en');
      translate.use('en');
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

  openLanguageMenu() {
    this.selectRef.open()
  }

  handleChange(e: any ) {
    if(e?.detail?.value == 'DE') this.translate.use('de');
    else this.translate.use('en');
  }

  logOut() {
    this.authService.logout();
    window.location.reload();
  }
}
