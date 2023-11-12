import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isClicked = false;

  handleClick() {
    this.isClicked = !this.isClicked;
    // Agrega cualquier otra lógica o acción que desees realizar al hacer clic
  }
}
