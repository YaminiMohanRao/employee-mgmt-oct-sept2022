import { Component, NgZone, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  animations: [
    trigger('openClose', [
      /* Use state() to define styles that are applied at the end of each transition,
       they persist after the animation completes */
      state(
        'open',
        style({
          height: '200px',
          opacity: 1,
          backgroundColor: 'yellow'
        })
      ),
      state(
        'closed',
        style({
          height: '100px',
          opacity: 0.8,
          backgroundColor: 'blue'
        })
      ),
      /* transition() to define intermediate styles,
       which create the illusion of motion during the animation */
      // approach 1 -- unidirectional
      transition('open => closed', [animate('2s')]),
      transition('closed => open', [animate('3s')]),
      // approach 2 -- bidirectional
      transition('open <=> closed', [animate('5s')])
    ])
  ],
  styles: []
})
export class AboutComponent implements OnInit {
  featureName = 'About Us';
  progress: number = 0;
  label!: string;
  isOpen = true;

  constructor(private _ngZone: NgZone) {}

  ngOnInit(): void {}

  // Loop inside the Angular zone
  // so the UI DOES refresh after each setTimeout cycle
  processWithinAngularZone() {
    this.label = 'inside';
    this.progress = 0;
    this._increaseProgress(() => console.log('Inside Done!'));
  }

  // Loop outside of the Angular zone
  // so the UI DOES NOT refresh after each setTimeout cycle
  processOutsideOfAngularZone() {
    this.label = 'outside';
    this.progress = 0;
    this._ngZone.runOutsideAngular(() => {
      debugger;
      this._increaseProgress(() => {
        // reenter the Angular zone and display done
        this._ngZone.run(() => {
          console.log('Outside Done!');
        });
      });
    });
  }

  _increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log(`Current progress: ${this.progress}%`);

    if (this.progress < 100) {
      window.setTimeout(() => this._increaseProgress(doneCallback), 10);
    } else {
      doneCallback();
    }
  }

  toggle() {
    // changes the state from one to another
    this.isOpen = !this.isOpen;
  }
}
