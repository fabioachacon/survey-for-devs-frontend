import { RequiredFieldError } from "./errors/required-field-error";
import { FieldValidation } from "./protocols/field-validation";

export class RequiredFieldValidation implements FieldValidation {
  readonly field: string;

  constructor(field: string) {
    this.field = field;
  }

  validate(value: string) {
    return !!value ? null : new RequiredFieldError();
  }
}
