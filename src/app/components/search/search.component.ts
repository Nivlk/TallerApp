import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { CarService } from 'src/app/services/car.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActionsCellsComponent } from '../actions-cells/actions-cells.component';
import { CarActionsComponentComponent } from '../car-actions-component/car-actions-component.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
public pageSize: any;
  themeSelected: any;
  gridOptions: GridOptions = {};
  columnDefs!: ColDef[];
  gridApi!: GridApi;
  paretto: any;
  rowData: any;

  constructor(private carService: CarService, 
    private dialog: MatDialog,
    private tokenService:TokenStorageService) {}
    ngOnInit(): void {
      this.getParetto();
  
      
    }
  
    onGridReady(params: GridReadyEvent): void {
      this.gridApi = params.api;
    }
  
    getParetto(): void {
      this.carService.getAllCars(this.tokenService.extractTokenInfo()).subscribe(
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
