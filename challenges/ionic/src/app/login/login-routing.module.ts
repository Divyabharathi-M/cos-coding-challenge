import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LoginPageComponent } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
