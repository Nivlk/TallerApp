import { Component } from '@angular/core';
// import { ClientsComponent } from './clients.component';
import { ClientsComponent } from '../../clients/clients/clients.component';
import { SearchComponent } from '../../search/search.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isClicked = false;
  ClientsComponent:boolean = true;
  SearchComponent:boolean = false;
  AddClientsComponent:boolean = false;
  isAdmin:any;
constructor( private tokenService:TokenStorageService){
  this.isAdmin= this.tokenService.extractTokenRole();
  if(this.isAdmin=="user"){
    this.SearchComponent = true;
    this.ClientsComponent == false;
  }else{
    this.SearchComponent = false;
    this.ClientsComponent == true;
  }
}


  handleClick() {
    this.isClicked = !this.isClicked;
    // Agrega cualquier otra lógica o acción que desees realizar al hacer clic
  }

  ChangedView(identificador: string) {
    console.log(identificador)
    this.ClientsComponent = false;
    this.AddClientsComponent = false;
    this.SearchComponent = false;

    if (identificador == 'Clients') {
      this.ClientsComponent = true;
    }  else {
      this.SearchComponent = true;
    }
  }
}
