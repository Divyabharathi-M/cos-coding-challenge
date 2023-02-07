import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard.page';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule {}
