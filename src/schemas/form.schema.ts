import {
  boolean,
  check,
  date,
  minLength,
  object,
  email,
  optional,
  pipe,
  string,
} from "valibot";

/**
 * Registration form validation schema
 * Defines validation rules for all form fields
 */
export const formSchema = object({
  salutation: optional(string()),
  firstName: pipe(string(), minLength(2, "First name is required")),
  lastName: pipe(string(), minLength(2, "Last name is required")),
  email: pipe(string(), email("Please enter a valid email")),
  phone: optional(string()),
  street: optional(string()),
  zip: optional(string()),
  city: optional(string()),
  country: optional(string()),
  paymentMethod: optional(string()),
  // Accept a Date instance if provided
  dueDate: optional(date()),
  terms: pipe(
    boolean(),
    check((val) => val === true, "You must accept the terms and conditions."),
  ),
});
