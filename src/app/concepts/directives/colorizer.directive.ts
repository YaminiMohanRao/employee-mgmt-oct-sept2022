import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

//Decorator
@Directive({
  selector: '[appColorizer]' //attribute selector
})
export class ColorizerDirective {

  divEl : any;

  @HostBinding('style.border') border !: string
  // @HostBinding('style.backgroundColor') bgColor!: string;
  @HostBinding('style.padding') padding !: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { 
    console.log('Inside Constructor');

    //find an element in which the directive is used
    console.log(elRef.nativeElement);
    this.divEl = elRef.nativeElement;

    //pass spl instructions to the element using JS
    // divEl.style.backgroundColor = 'red';
    // divEl.style.color = 'green';
    // divEl.style.height = '50px';
    // divEl.style.padding = '10px';

    //pass spl instructions to the element using Angular renderer
    renderer.setStyle(this.divEl, 'backgroundColor', 'red');
    renderer.setStyle(this.divEl, 'color', '#000');
    renderer.setStyle(this.divEl, 'height', '60px');
    renderer.setStyle(this.divEl, 'padding', '10px');

    const newPara = this.renderer.createElement('p'); //<p></p>
    renderer.setStyle(newPara, 'float', 'right'); //<p style='float:right'></p>
    renderer.setStyle(newPara, 'font-size', '20px'); //<p style='float:right; font-size:10px'></p>
    const poweredByText = this.renderer.createText('Powered By Colorizer Directive'); //Powered By Colorizer Directive
    renderer.appendChild(newPara, poweredByText); //<p style='float:right; font-size:10px'>Powered By Colorizer Directive</p>
    renderer.appendChild(this.divEl, newPara);

  }

  //Handle Events inside Directive -- click, mouseover, mouseout
  @HostListener('click', ['$event.target'])
  handleClick(targetEl: any) {
    console.log('Clicked');
    console.log(targetEl); // will show on element the click event occured
    this.renderer.setStyle(targetEl, 'background-color', 'yellow');
    this.renderer.setStyle(targetEl, 'color', '#000');
    this.border = '5px solid green';
    this.padding = '20px'
    // this.bgColor='purple'

    const newSpan = this.renderer.createElement('span'); //<span></span>
    this.renderer.setStyle(newSpan, 'font-size', '12px');
    const developedByText = this.renderer.createText('Developed by Yamini'); 
    this.renderer.appendChild(newSpan, developedByText); //<span>Developed by Yamini</span>
    this.renderer.appendChild(this.divEl, newSpan);
  }

  // TODO: work on mouseover -- change bg color to lightgreen 
  @HostListener('mouseover')
  handleMouseOver() {
    this.renderer.setStyle(this.divEl, 'background-color', 'lightgreen');
    this.border = '5px dashed green';
  }

  // TODO: work on mouseout -- change the bg color to red
  @HostListener('mouseout')
  handleMouseOut() {
    this.renderer.setStyle(this.divEl, 'background-color', 'red');
  }

}
