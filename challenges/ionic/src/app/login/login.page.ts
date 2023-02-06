import { AuthenticationResult } from './../models/login.model';
import { LoginApiService } from './../services/login-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationRequest } from '../models/login.model';
import { AuthenticationService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';
// import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: UntypedFormGroup;
  showPassword = false;
  passwordToggleIcon = "eye"
  notAuthenticatedErr = 'Oops!!! Invalid login credentials.';
  somethingWentWrongErr = 'Something went wrong. Please try again later.';
  @ViewChild('emailControl') emailControl!: HTMLIonInputElement;
  @ViewChild('passwordControl') passwordControl!: HTMLIonInputElement;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: UntypedFormBuilder,
    private loginService: LoginApiService,
    private toastController: ToastController,
    // private keyboard: Keyboard
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
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
        msg = error.status == 401 ? this.notAuthenticatedErr : this.somethingWentWrongErr;
      }
      this.errorToast(msg);
    })
  }

  onEnter(submit?: boolean) {
    this.passwordControl.setFocus();
    if(this.loginForm.valid && submit)this.onSubmitLogin();
  }

  async errorToast(err?: string) {
    const toast = await this.toastController.create({
      message: err || this.somethingWentWrongErr,
      duration: 5000,
      icon: 'sad',
      cssClass: 'error-toast',
      position: 'top',
    });
    await toast.present();
  }

}
