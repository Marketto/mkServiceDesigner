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
  private $min: number;
  private $exclusiveMin: boolean = false;
  private formControl: FormControl;

  @Input()
  public set min(value: number) {
    this.$min = value;
    this.updateModelValidation();
  }
  public get min(): number {
    return this.$min;
  }

  @Input()
  public set exclusiveMin(value: boolean) {
    this.$exclusiveMin = value;
    this.updateModelValidation();
  }
  public get exclusiveMin(): boolean {
    return this.$exclusiveMin;
  }

  public validate(c: FormControl): { [key: string]: any } {
    if (c) {
      this.formControl = c;
      const value = (c.value !== null) ? parseFloat(c.value) : null;
      if (
        value !== null &&
        !isNaN(value) &&
        this.min !== null &&
        !isNaN(this.min) &&
        (
          value < this.min ||
          (
            this.exclusiveMin && value === this.min
          )
        )
      ) {
        return {
          min: {
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
