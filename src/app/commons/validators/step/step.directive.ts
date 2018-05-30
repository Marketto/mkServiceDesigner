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
  private $step: number;
  private formControl: FormControl;

  @Input()
  public set step(value: number) {
    this.$step = value;
    this.updateModelValidation();
  }
  public get step(): number {
    return this.$step;
  }

  public validate(c: FormControl): { [key: string]: any } {
    if (c) {
      this.formControl = c;
      const value = (c.value !== null) ? parseFloat(c.value) : null;
      if (
        value !== null &&
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
  }

  private updateModelValidation() {
    if (this.formControl) {
      setTimeout(() => {
        this.formControl.setValue(this.formControl.value);
      });
    }
  }

}
