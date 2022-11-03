import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div>
      <h1>404 Error</h1>
      <h1>Page Not Found</h1>
    </div>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
