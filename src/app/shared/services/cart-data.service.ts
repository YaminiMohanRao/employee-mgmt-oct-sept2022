import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { IProduct } from 'src/app/products/models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  // A Subject is a sort of bridge or proxy that is available
  // In some implementations of ReactiveX that acts both as an observer and as an Observable

  // Step 1: Have the default cart items

  private defaultCartItems: IProduct[] = [
    {
      id: 2,
      name: 'Cheese',
      category: 'Dairy',
      price: '$6.38'
    }
  ];

  // Step 2: Create an Observable. This should also act as Observer.
  /* It's Subject. Because the Subject should have default cart items, we will choose BehaviourSubject
   Let's create an object for BehaviourSubject class with default cart items. */
  private cartItems = new BehaviorSubject(this.defaultCartItems);

  // Step 3: We will make the cartItems as Observable. So that any comp can subscribe to it.
  latestCartItems: Observable<IProduct[]> = this.cartItems.asObservable();

  constructor() {}

  addToCartItems(product: IProduct) {
    // we should connect with rest api b/e and add the above product -- implement relevent logic here
    // let's work adding this product to existing cart items
    this.latestCartItems
      .pipe(take(1))
      .subscribe((existingCartItems: IProduct[]) => {
        console.log(existingCartItems);

        // updating the cart items with existing and new product added
        const updatedCartItems = [...existingCartItems, product];
        this.cartItems.next(updatedCartItems); // updates the other components which subscribed cartItems
      });
  }
}
