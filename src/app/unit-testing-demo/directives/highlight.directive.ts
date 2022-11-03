import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {

  defaultColor =  'rgb(211, 211, 211)'; // lightgray

  @Input('appHighlight') bgColor = '';

  constructor(private elRef: ElementRef) {
    elRef.nativeElement.style.customProperty = true;
  }

  ngOnChanges() {
    this.elRef.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }
}
