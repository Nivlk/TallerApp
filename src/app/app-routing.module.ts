import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login/login.component';
import { ClientsComponent } from './components/clients/clients/clients.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';

const routes: Routes = 

[  
  
  //{path:'',redirectTo:'home',pathMatch:'full'},

{path:'home', component:DashboardComponent},
{path: 'login', component: LoginComponent },
{path: 'clients', component: ClientsComponent },
{path: 'test', component: CarrouselComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
