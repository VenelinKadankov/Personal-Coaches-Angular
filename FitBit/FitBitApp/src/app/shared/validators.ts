import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


export function sameValueAsFactory(getTargetControl: () => AbstractControl | null, killSubscriptions: Observable<any>) {
  let subscription: Subscription | null = null;
  return function (control: AbstractControl) {

    if (subscription) { subscription.unsubscribe(); subscription = null; }
    const targetControl = getTargetControl();
    if (!targetControl) { return null; }
    subscription = targetControl.valueChanges
      .pipe(
        takeUntil(killSubscriptions)
      )
      .subscribe({
        next: () => { control.updateValueAndValidity(); },
        complete: () => { subscription = null; }
      });

    return targetControl?.value === control?.value ? null : { sameValue: true }
  };
}

export function urlValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) { return null; }
  // '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
  return /^(https|http):\/\/[A-z1-9\.]+$/.test(control.value) ? null : {
    invalidUrl: true
  };
}
