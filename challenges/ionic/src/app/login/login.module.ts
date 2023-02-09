import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';   

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPageComponent } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    LoginPageRoutingModule,
  ],
  declarations: [LoginPageComponent]
})
export class LoginPageModule {}
