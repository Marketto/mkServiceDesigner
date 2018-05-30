import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: MaxDirective,
    },
  ],
  selector: "[max][formControlName], [max][formControl], [max][ngModel]",
})
export class MaxDirective implements Validator {
  private $max: number;
  private $exclusiveMax: boolean = false;
  private formControl: FormControl;

  @Input()
  public set max(value: number) {
    this.$max = value;
    this.updateModelValidation();
  }
  public get max(): number {
    return this.$max;
  }
  @Input()
  public set exclusiveMax(value: boolean) {
    this.$exclusiveMax = value;
    this.updateModelValidation();
  }
  public get exclusiveMax(): boolean {
    return this.$exclusiveMax;
  }

  public validate(c: FormControl): {[key: string]: any} {
    if (c) {
      this.formControl = c;
      const value = (c.value !== null) ? parseFloat(c.value) : null;
      if (
        value !== null &&
        !isNaN(value) &&
        this.max !== null &&
        !isNaN(this.max) &&
        (
          value > this.max ||
          (
            this.exclusiveMax && value === this.max
          )
        )
      ) {
        return {
          max: {
            value,
          },
        };
      }
    }
  }

  private updateModelValidation() {
    if (this.formControl) {
      setTimeout(() => {
        this.formControl.setValue(this.formControl.value);
      });
    }
  }
}
