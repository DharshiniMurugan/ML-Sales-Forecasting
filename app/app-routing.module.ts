import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PlotComponent } from './plot/plot.component';
const routes: Routes =[{
  path:'',component:LoginComponent
},{
path:'signup',component:DashboardComponent
},
{
  path:'plot',component:PlotComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

