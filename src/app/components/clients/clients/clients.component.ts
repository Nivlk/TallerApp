import { Component, Inject, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { UserService } from 'src/app/services/user.service';
import { ActionsCellsComponent } from '../../actions-cells/actions-cells.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import { AddClientComponentComponent } from '../../add-client-component/add-client-component.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  public pageSize: any;
  themeSelected: any;
  gridOptions: GridOptions = {};
  columnDefs!: ColDef[];
  gridApi!: GridApi;
  paretto: any;
  rowData: any;

  constructor(private userService: UserService, 
    private dialog: MatDialog,
   
    ) {
  //  this.getDefs();
  }


  ngOnInit(): void {
    this.getParetto();

    
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  getParetto(): void {
    this.userService.getAllUsers().subscribe(
      (res: any) => {
        this.paretto = res.data;
        this.rowData = this.paretto;
        this.getDefs();
      },
      (error) => {
        // Handle error
      }
    );
  }
  getDefs(){
    this.columnDefs = [
      { headerName: 'ID', field: 'id' },
      { headerName: 'First Name', field: 'firstname' },
      { headerName: 'Last Name', field: 'lastname' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Status', field: 'status' ,
      valueFormatter: (params: any) => params.value ? 'Activo' : 'Inactivo'
    },
      { headerName: 'Number', field: 'number' },
      { headerName: 'Location', field: 'location' },
      { headerName: 'CI', field: 'ci' },
      { headerName: 'Role', field: 'role' },
      {
        headerName: '',
        cellRenderer: ActionsCellsComponent,
        cellRendererParams: {
          actions: [
            {
              tooltip: 'Menú',
              icon: 'more_vert',
              value: 1,
            //  checkShowOption: showDisable,
            }       ],
            actionsHaveConditions: true,
            clicked: (params: any) => this.onClickedMenuAction(params)
        },
        sortable: false,
        filter: false,
        resizable: false,
      },
    ];

    this.gridOptions.defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
    };
  }
  onClickedMenuAction(params: any): void {
    const { event, rowData, action } = params;
    event.preventDefault();
    event.stopPropagation();
    //console.log(rowData)
      // Puedes acceder a params.value para obtener el valor de la acción
  if (action.value === 1) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '200px',
    
      position: { top: `${event.clientY}px`, left: `${event.clientX}px` },
      data: {
       params:rowData
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getParetto();
        console.log('Opción seleccionada:', result);
      }
    });
  }

  
  }
  openClientModal() {
    const dialogRef = this.dialog.open(AddClientComponentComponent, {
      data: {},
      panelClass: 'full-screen-dialog', // Aplica la clase de estilo personalizado
    });
  
    dialogRef.afterClosed().subscribe((result: string) => {
      this.getParetto();
      if (result) {
        console.log('Reg:', result);
      }
    });
  }
  
  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
  onEditClick(data: any): void {
    console.log('Edit row:', data);
    // Implementa la lógica para editar la fila según tus necesidades
    // Aquí puedes abrir un diálogo de edición o realizar otras acciones
  }
}
