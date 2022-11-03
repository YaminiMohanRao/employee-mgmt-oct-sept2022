import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';

const productssRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: { title: 'ProductList', animation: 'productsPage' }
  },
  {
    path: 'cart',
    component: CartViewComponent,
    data: { title: 'Cart', animation: 'cartPage' }
  },
  {
    path: ':id',
    component: ProductDetailsComponent,
    data: { title: 'ProductDetails', animation: 'productDetailsPage' }
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(productssRoutes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
