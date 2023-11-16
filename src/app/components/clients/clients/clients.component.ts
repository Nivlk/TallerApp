import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'ID' },
    { field: 'Matricula' },
    { field: 'Nombre' },
    { field: 'Apellido' },
    { field: 'Teléfono' },
    { field: 'Dirección' },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };


  public rowData$!: Observable<any[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  // ...

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.userService.getAllUsers();
  }

//   // Data that gets displayed in the grid
//   public rowData$!: Observable<any[]>;

//   // For accessing the Grid's API
//   @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

//   constructor(private http: HttpClient) { }

//   // Example load data from server
//   onGridReady(params: GridReadyEvent) {
//     this.rowData$ = this.http
//       .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
//   }

//   // Example of consuming Grid Event
//   onCellClicked(e: CellClickedEvent): void {
//     console.log('cellClicked', e);
//   }

//   // Example using Grid's API
//   clearSelection(): void {
//     this.agGrid.api.deselectAll();
//   }
}

