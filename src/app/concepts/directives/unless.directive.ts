import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line comma-dangle
  selector: '[appUnless]', // as this as structual directive
})
export class UnlessDirective {
  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {
    // console.log('Inside UnlessDirective constructor');
    // console.log(viewContainer); // div
    // console.log(templateRef); // button
  }

  // to capture the value coming via the attribute -- we need to have a setter method with @Input()
  // method should be as same as selector
  @Input()
  set appUnless(isAuth: any) {
    console.log(isAuth);
    if (isAuth) {
      // if auth is true -- adding the button inside the div
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
