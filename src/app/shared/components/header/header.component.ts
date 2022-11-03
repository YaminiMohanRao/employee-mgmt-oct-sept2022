import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IProduct } from 'src/app/products/models/iproduct';
import { CartDataService } from '../../services/cart-data.service';
import { NavigationHelper } from '../../utils/navigation-helper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount = 0;

  constructor(
    public navigationHelper: NavigationHelper,
    private cartDataService: CartDataService,
    public authService: AuthService
  ) {
    // alternate way to avoid router injection
  }

  ngOnInit(): void {
    this.cartDataService.latestCartItems.subscribe((cartItems: IProduct[]) => {
      this.cartCount = cartItems.length;
    });
  }

  handleLogout() {
    this.authService.logout(); // refer the auth service
  }
}
