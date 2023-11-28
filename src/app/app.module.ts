import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { ClientsComponent } from './components/clients/clients/clients.component';
import { SearchComponent } from './components/search/search.component';

import { ActionsCellsComponent } from './components/actions-cells/actions-cells.component';
import { ModalComponent } from './components/modal/modal.component';
import { AddClientComponentComponent } from './components/add-client-component/add-client-component.component';
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';
import { MAT_MENU_DEFAULT_OPTIONS } from '@angular/material/menu';
import { AddCarComponent } from './components/add-car/add-car.component';
import { environment } from 'src/environments/environments';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { NgxSpinnerModule } from "ngx-spinner";
import { ModalImagesCarComponent } from './components/modal-images-car/modal-images-car.component';
import { EditCarrouselComponent } from './components/edit-carrousel/edit-carrousel.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ClientsComponent,
    SearchComponent,
    ActionsCellsComponent,
    ModalComponent,
    AddClientComponentComponent,
    AddCarComponent,
    ModalImagesCarComponent,
    EditCarrouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxSpinnerModule
  ],
  providers: [{
    provide: MAT_MENU_DEFAULT_OPTIONS,
    useValue: { overlayPanelClass: 'menu-overlay-pane' }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
