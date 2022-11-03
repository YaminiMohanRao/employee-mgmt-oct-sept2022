import { TemplateRef, ViewContainerRef } from '@angular/core';
import { UnlessDirective } from './unless.directive';

// group of related test specs - TEST SUITE
describe('UnlessDirective', () => {
  // eslint-disable-next-line no-unused-vars
  let viewContainer: ViewContainerRef;
  // eslint-disable-next-line no-unused-vars
  let templateRef: TemplateRef<any>;

  it('should create an instance', () => {
    const directive = new UnlessDirective(viewContainer, templateRef);
    expect(directive).toBeTruthy();
  });
});
