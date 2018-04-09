import { Directive, forwardRef } from "@angular/core";
import { AbstractControl, FormControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RegexpValidatorDirective),
      useValue: RegexpValidatorDirective,
    },
  ],
  selector: "[appRegexpValidator][ngModel],[appRegexpValidator][formControl]",
})
export class RegexpValidatorDirective implements Validator {

  public validate(control: AbstractControl|FormControl): {[key: string]: any} {
    try {
      const typedRegexp = new RegExp(control.value);
    } catch (e) {
      return {
        regexpValidator: {
          valid: false,
          value: control.value,
        },
      };
    }
    return null;
  }
}
