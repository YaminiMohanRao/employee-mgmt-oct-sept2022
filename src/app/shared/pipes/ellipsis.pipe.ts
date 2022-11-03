import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Pipe, PipeTransform } from '@angular/core';

// Decorator
@Pipe({
  name: 'ellipsis', // name of the pipe
  pure: true // if we set it to false, even when dummyText is not updated,the transform method is invoked
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, endAt?: number): string {
    if (endAt && value.length > 0) {
      return value.substring(0, endAt) + '...';
    }

    if (value.length > 0) {
      return value;
    }
    return 'Invalid Input.';
  }

}
