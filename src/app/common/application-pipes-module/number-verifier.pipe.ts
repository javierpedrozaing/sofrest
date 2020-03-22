import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberVerifier'
})
export class NumberVerifierPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return (isNaN(value)) ? 0 : value;
  }

}
