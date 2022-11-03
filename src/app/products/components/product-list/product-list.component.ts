import { Component, OnInit } from '@angular/core';
import { CartDataService } from 'src/app/shared/services/cart-data.service';
import { IProduct } from '../../models/iproduct';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: []
})
export class ProductListComponent implements OnInit {
  productList: IProduct[] = [];

  constructor(
    private productsService: ProductsService,
    private cartDataService: CartDataService
  ) {}

  ngOnInit(): void {
    // getting the res from service
    this.productList = this.productsService.getProductList();
  }

  handleAddToCart(product: IProduct) {
    // send the above data to cart-data service
    this.cartDataService.addToCartItems(product);
  }
}
