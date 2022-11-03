import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ChildrenOutletContexts, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { slideInAnimation } from './shared/animation/animations';

@Component({
  selector: 'app-root', // exposed in element selector -- mandatory
  templateUrl: './app.component.html', // html -- should be only one -- mandatory
  styleUrls: ['./app.component.css'], // css - can be multiple and optional
  animations: [
    // animation triggers go here
    slideInAnimation
  ],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  title = 'Employee Manager!'; 

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private contexts: ChildrenOutletContexts
  ) {}

  ngOnInit() {
    // navigation event gets triggered when navigation ends successfully 
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        var rt = this.getChild(this.activatedRoute);
        rt.data.subscribe((data: any) => { // subscribing the data from getChild method
          console.log(data);
          this.titleService.setTitle(data.title); // setting the title using inbuilld titleService
        });
      });
  }

  // setTitle related
  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  // for animations related
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
