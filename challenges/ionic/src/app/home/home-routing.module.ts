import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
