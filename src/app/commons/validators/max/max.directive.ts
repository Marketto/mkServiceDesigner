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
  private onChangeCallback: any;

  @Input()
  public set max(value: number) {
    this.$max = value;
    if (this.onChangeCallback) {
      this.onChangeCallback();
    }
  }
  public get max(): number {
    return this.$max;
  }
  @Input()
  public set exclusiveMax(value: boolean) {
    this.$exclusiveMax = value;
    if (this.onChangeCallback) {
      this.onChangeCallback();
    }
  }
  public get exclusiveMax(): boolean {
    return this.$exclusiveMax;
  }

  public validate(c: FormControl): {[key: string]: any} {
    const value = parseFloat(c.value);
    if (
      c.value !== null &&
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

  public registerOnValidatorChange(fn: any): void {
    this.onChangeCallback = fn;
  }
}
