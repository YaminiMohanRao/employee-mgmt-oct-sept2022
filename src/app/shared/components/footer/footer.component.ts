import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="text-center">
      <hr />
      <app-menu>
        <li class="nav-item" #backToTop>
          <a class="nav-link" href="#">Back to Top</a>
        </li>
      </app-menu>
      <p class="redText">Copyright 2022 | yamini</p>
    </footer>
  `,
  styles: []
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
