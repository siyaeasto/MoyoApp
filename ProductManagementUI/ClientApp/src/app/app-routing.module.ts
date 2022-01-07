import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './annon/login/login.component';
import { ProductSaveComponent } from './auth/products/product-save/product-save.component';
import { ProductsComponent } from './auth/products/products/products.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'products/product-save', component: ProductSaveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
