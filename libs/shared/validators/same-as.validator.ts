import { AbstractControl } from '@angular/forms';

export function sameAs(otherControlName: string) {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.parent) {
      return null; // Control is not yet associated with a parent.
    }
    const thisValue = control.value;
    const otherValue = control.parent.get(otherControlName)?.value;
    if (thisValue === otherValue) {
      return null;
    }

    return {
      sameAs: true,
    };
  };
}
