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
  private onChangeCallback: any;

  @Input()
  public set min(value: number) {
    this.$min = value;
    if (this.onChangeCallback) {
      this.onChangeCallback();
    }
  }
  public get min(): number {
    return this.$min;
  }

  @Input()
  public set exclusiveMin(value: boolean) {
    this.$exclusiveMin = value;
    if (this.onChangeCallback) {
      this.onChangeCallback();
    }
  }
  public get exclusiveMin(): boolean {
    return this.$exclusiveMin;
  }

  public validate(c: FormControl): {[key: string]: any} {
    const value = parseFloat(c.value);
    if (
      c.value !== null &&
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

  public registerOnValidatorChange(fn: any): void {
    this.onChangeCallback = fn;
  }
}
