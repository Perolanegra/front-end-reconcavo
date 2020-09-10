import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material.module';
import { AppController } from './core/appController';
import { EditDrugstoreDialogComponent } from './dialogs/edit-drugstore/edit-drugstore-dialog.component';
import { DrugstoreDetailDialogComponent } from './dialogs/detail-drugstore/detail-drugstore-dialog.component';
import { FormsModule } from '@angular/forms';
import { DrugstoreService } from './core/drugstore.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { DrugstoreState } from './state/drugstore/drugstore.state';
import { AppState } from './state/app/app.state';
import { AddStreetDialogComponent } from './dialogs/add-street/add-street-dialog.component';
import { StreetService } from './core/street.service';
import { StreetState } from './state/street/street.state';
import { DBState } from './state/database/db.state';
import { AddStoreDialogComponent } from './dialogs/add-drugstore/add-store-dialog.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    EditDrugstoreDialogComponent,
    DrugstoreDetailDialogComponent,
    AddStreetDialogComponent,
    AddStoreDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([DrugstoreState, AppState, StreetState, DBState], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot({
      // key: ['state.prop'],
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  exports: [
    MaterialModule,
  ],
  entryComponents: [
    EditDrugstoreDialogComponent,
    DrugstoreDetailDialogComponent,
    AddStreetDialogComponent,
    AddStoreDialogComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    AppController, 
    DrugstoreService, 
    StreetService,
    // { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
