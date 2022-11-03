import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';

@Directive({
  selector: '[appDemoIf]'
})
export class DemoIfDirective {

  // eslint-disable-next-line no-unused-vars
  constructor( private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<object>) 
  {
    //console.log(viewContainerRef); // div
    //console.log(templateRef); // p
  }

  @Input() set appDemoIf(condition:boolean){
    console.log(condition);
    if(condition){
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }else{
      this.viewContainerRef.clear();
    }
  }

}
