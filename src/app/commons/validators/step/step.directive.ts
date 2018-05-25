import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: StepDirective,
    },
  ],
  selector: "[step][formControlName],[step][formControl],[step][ngModel]",
})
export class StepDirective implements Validator {
  @Input()
  public step: number;

  public validate(c: FormControl): {[key: string]: any} {
    const value = parseFloat(c.value);
    if ((c.value !== null) && !isNaN(value) && (this.step !== null) && !isNaN(this.step) && (value % this.step)) {
      return {
        step: {
          value,
        },
      };
    }
  }
}
