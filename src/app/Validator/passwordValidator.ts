import { AbstractControl } from "@angular/forms";

export function ValidatePassword(control: AbstractControl) {
  if (
    // control.value.startsWith("A") 
   
    !control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})$/)
  ) {
    return { validPassword: true };
  }
  return { validPassword: false };
}
