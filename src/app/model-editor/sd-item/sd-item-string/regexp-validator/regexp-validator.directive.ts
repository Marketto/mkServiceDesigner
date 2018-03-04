import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appRegexpValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RegexpValidatorDirective, multi: true }]
})
export class RegexpValidatorDirective implements Validator {

  validate(control: AbstractControl): {[key: string]: any} {
    try {
      const typedRegexp = new RegExp(control.value);
    } catch (e) {
      return { 'malformedRegexp': { value: control.value } };
    }
    return null;
  }

  constructor() { }

}
