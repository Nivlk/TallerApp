import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { CarService } from 'src/app/services/car.service';
import { CarActionsComponentComponent } from '../car-actions-component/car-actions-component.component';
import { ActionsCellsComponent } from '../actions-cells/actions-cells.component';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent {
  public pageSize: any;
  themeSelected: any;
  gridOptions: GridOptions = {};
  columnDefs!: ColDef[];
  gridApi!: GridApi;
  paretto: any;
  rowData: any;

  constructor(private carService: CarService, 
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,) {}
    ngOnInit(): void {
      this.getParetto();
  
      
    }
  
    onGridReady(params: GridReadyEvent): void {
      this.gridApi = params.api;
    }
  
    getParetto(): void {
      this.carService.getAllCars(this.data).subscribe(
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
        { headerName: 'Placa', field: 'registration' },
        { headerName: 'Modelo', field: 'model' },
        { headerName: 'Año', field: 'year' },
        { headerName: 'Estado', field: 'status' },
        { headerName: 'Color', field: 'color' },
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
     
        // Puedes acceder a params.value para obtener el valor de la acción
    if (action.value === 1) {
      const dialogRef = this.dialog.open(CarActionsComponentComponent, {
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
  /*    const dialogRef = this.dialog.open(AddClientComponentComponent, {
        data: {},
        panelClass: 'full-screen-dialog', // Aplica la clase de estilo personalizado
      });
    
      dialogRef.afterClosed().subscribe((result: string) => {
        this.getParetto();
        if (result) {
          console.log('Reg:', result);
        }
      });*/
    }
    
    onFilterTextBoxChanged() {
      this.gridApi.setQuickFilter(
        (document.getElementById('filter-text-box') as HTMLInputElement).value
      );
    }

}
