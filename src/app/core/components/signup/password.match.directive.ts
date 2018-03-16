import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[appConfirmEqualValidators]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordMatchDirective,
    multi: true
  }]
})
export class PasswordMatchDirective implements Validator {
  @Input() appConfirmEqualValidators: string;
  validate(control: AbstractControl): {[key: string]: any} | null {
    const controlToCompare = control.parent.get(this.appConfirmEqualValidators);
    if (controlToCompare && controlToCompare.value !== control.value) {
      return {'notEqual': true};
    }
    return null;
  }
}
