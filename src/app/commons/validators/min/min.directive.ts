import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: MinDirective,
    },
  ],
  selector: "[min][formControlName],[min][formControl],[min][ngModel]",
})
export class MinDirective implements Validator {
  @Input()
  public min: number;

  public validate(c: FormControl): {[key: string]: any} {
    const value = parseFloat(c.value);
    if (!isNaN(value) && (this.min || this.min === 0) && (value < this.min)) {
      return {
        max: {
          value,
        },
      };
    }
  }
}
