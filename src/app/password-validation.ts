import {AbstractControl} from "@angular/forms";

export class PasswordValidation {
    static MatchPassword = (AC: AbstractControl) => {
        const password = AC.get('password').value; // to get value in input tag
        if (password !== AC.get('confirmPassword').value) {
            AC.get('confirmPassword').setErrors({MatchPassword: true});
        }
        return null;
    }
}