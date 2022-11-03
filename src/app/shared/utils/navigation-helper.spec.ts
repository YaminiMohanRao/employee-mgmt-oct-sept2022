import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationHelper } from './navigation-helper';

describe('NavigationHelper', () => {
  let navigationHelper: NavigationHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    navigationHelper = TestBed.inject(NavigationHelper);
  });

  it('should be created', () => {
    expect(navigationHelper).toBeTruthy();
  });

  // testing whether it is navigating to the specified url
  it('should navigate to the url given', () => {
    // spying on the comp
    spyOn(navigationHelper, 'navigateTo').and.callThrough();
    navigationHelper.navigateTo('/');
    expect(navigationHelper.navigateTo).toHaveBeenCalledWith('/');
  });
});
