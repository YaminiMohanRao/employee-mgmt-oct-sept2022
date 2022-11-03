import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationHelper {
  constructor( private router: Router){

  }

  navigateTo(url: string){
    this.router.navigateByUrl(url)
  }
}
// this class can be dependency injection for routing in any component
