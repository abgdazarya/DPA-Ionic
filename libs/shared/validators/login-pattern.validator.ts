import { AbstractControl } from '@angular/forms';

export function loginPattern() {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.parent) {
      return null; // Control is not yet associated with a parent.
    }
    const thisValue = control.value;

    const regex = /[a-zA-Z]/gi;
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;

    if (regex.test(thisValue) && !regexEmail.test(thisValue)) {
      return {
        loginPattern: true,
      };
    }

    return null;
  };
}
