import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';





export function countryValidator(array): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value === '') {
      return null;
    }
    const getElement = array.find(element => element === control.value);
    if (!getElement) {
      return {
        valid: false,

      }
    }

  };
}

