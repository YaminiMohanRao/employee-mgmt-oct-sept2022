import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartDataService } from 'src/app/shared/services/cart-data.service';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styles: []
})
export class CartViewComponent implements OnInit {
  cartItems: IProduct[] = [];
  cartProducts$!: Observable<IProduct[]>; // for async pipe
  // cartItemsSubscription!: Subscription; // needed for subscription if not using async pipe

  constructor(private cartDataService: CartDataService) {}

  ngOnInit(): void {
    // using async pipe
    this.cartProducts$ = this.cartDataService.latestCartItems;

    // without using async pipe
    // this.cartItemsSubscription = this.cartDataService.latestCartItems.subscribe((cartItems: IProduct[]) => {
    //   console.log(cartItems);
    //   this.cartItems = cartItems;
    // });
  }

  // ngOnDestroy(): void {
  //   if (this.cartItemsSubscription){
  //     this.cartItemsSubscription.unsubscribe();
  //   }
  // }
}
