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
  private onChangeCallback: any;
  private $step: number;

  @Input()
  public set step(value: number) {
    this.$step = value;
    if (this.onChangeCallback) {
      this.onChangeCallback();
    }
  }
  public get step(): number {
    return this.$step;
  }

  public validate(c: FormControl): {[key: string]: any} {
    const value = parseFloat(c.value);
    if (
      c.value !== null &&
      !isNaN(value) &&
      this.step !== null &&
      !isNaN(this.step) &&
      value % this.step
    ) {
      return {
        step: {
          value,
        },
      };
    }
  }

  public registerOnValidatorChange(fn: any): void {
    this.onChangeCallback = fn;
  }
}
