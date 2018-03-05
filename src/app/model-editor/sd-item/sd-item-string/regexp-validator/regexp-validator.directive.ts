import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, FormControl } from '@angular/forms';

@Directive({
  selector: '[appRegexpValidator][ngModel],[appRegexpValidator][formControl]',
  providers: [{
      provide: NG_VALIDATORS,
      useValue: RegexpValidatorDirective,
      useExisting: forwardRef(() => RegexpValidatorDirective),
      multi: true
    }]
})
export class RegexpValidatorDirective implements Validator {

  validate(control: AbstractControl|FormControl): {[key: string]: any} {
    try {
      const typedRegexp = new RegExp(control.value);
    } catch (e) {
      return { 'regexpValidator' : { value: control.value, valid: false } };
    }
    return null;
  }

  constructor() {}

}
