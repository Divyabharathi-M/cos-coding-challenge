import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationResult } from './../models/login.model';
import { LoginApiService } from './../services/login-api.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationRequest } from '../models/login.model';
import { AuthenticationService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginForm!: UntypedFormGroup;
  showPassword = false;
  validateEmailField = false;
  loginClicked=false;
  passwordToggleIcon = "eye"
  notAuthenticatedErr = 'ERRORS.invalid_credentials';
  somethingWentWrongErr = 'ERRORS.something_went_wrong';
  msgSubscription!: Subscription;
  @ViewChild('emailControl') emailControl!: HTMLIonInputElement;
  @ViewChild('passwordControl') passwordControl!: HTMLIonInputElement;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: UntypedFormBuilder,
    private loginService: LoginApiService,
    private toastController: ToastController,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ionViewWillEnter() {
    this.emailControl.setFocus()
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmitLogin() {
    this.loginClicked = true;
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;

    const request: AuthenticationRequest  = {
      password: password,
      meta: ''
    }
    this.loginService.isValidUser(username, request).then((resp: AuthenticationResult | undefined) => {
      if(resp && resp.authenticated) {
        this.authService.login(resp.userId, resp.token);
      } else this.errorToast();
    }).catch((error) => {
      let msg = '';
      if(error) {
        msg = error.status == 401 ? this.getErrorMsg(this.notAuthenticatedErr) : this.getErrorMsg(this.somethingWentWrongErr);
      }
      this.errorToast(msg);
    })
  }

  getErrorMsg(error: string) {
    let msg = '';
    this.msgSubscription =  this.translateService.get(error).subscribe(
      value => {
        msg = value;
      }
    )
    return msg;
  }

  onEnter(submit?: boolean) {
    this.passwordControl.setFocus();
    if(this.loginForm.valid && submit)this.onSubmitLogin();
  }

  validate() {
    if(this.loginForm.controls['username'].dirty && this.loginForm.controls['username'].invalid) {
      this.validateEmailField  = true;
    }
  }

  async errorToast(err?: string) {
    this.loginClicked = false;
    const toast = await this.toastController.create({
      message: err || this.getErrorMsg(this.somethingWentWrongErr),
      duration: 5000,
      icon: 'sad',
      cssClass: 'error-toast',
      position: 'top',
    });
    await toast.present();
  }

  ngOnDestroy(): void {
    this.msgSubscription.unsubscribe();
  }
}
