import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './annon/login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AlertService } from './service/alert.service';
import { ApiResponseValidatorService } from './service/api-response-validator.service';
import { StorageService } from './service/storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './auth/products/products/products.component';
import { DataTablesModule } from 'angular-datatables';
import * as $ from "jquery";
import { ProductSaveComponent } from './auth/products/product-save/product-save.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    ProductsComponent,
    ProductSaveComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [ApiResponseValidatorService, AlertService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
