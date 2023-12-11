import { Component, Inject } from '@angular/core';
import { ActionsCellsComponent } from '../actions-cells/actions-cells.component';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CarService } from 'src/app/services/car.service';
import { RepaMenuComponent } from '../repa-menu/repa-menu.component';

@Component({
  selector: 'app-repa-list',
  templateUrl: './repa-list.component.html',
  styleUrls: ['./repa-list.component.css']
})
export class RepaListComponent {
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
      console.log(this.data)
      this.getParetto();
  
      
    }
  
    onGridReady(params: GridReadyEvent): void {
      this.gridApi = params.api;
    }
  
    getParetto(): void {
      this.carService.getAllReps(this.data.params.id).subscribe(
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
        { headerName: 'Categoría', field: 'category' },
        { headerName: 'Subcategoría', field: 'subs' },
        { headerName: 'Fecha de Entrada', field: 'fechain' },
        { headerName: 'Fecha de Salida', field: 'fechasal' },
        { headerName: 'Estado', field: 'status' },
        { headerName: 'Prioridad', field: 'priority' },
        { headerName: 'Comentarios', field: 'comments' },
        { headerName: 'ID del Auto', field: 'id_auto' },
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
     const dialogRef = this.dialog.open(RepaMenuComponent, {
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