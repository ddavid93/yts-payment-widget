import { boolean, coerce, object, string } from "zod";

/**
 * Registration form validation schema
 * Defines validation rules for all form fields
 */
export const registrationSchema = object({
  salutation: string().optional(),
  firstName: string().min(2, "First name is required"),
  lastName: string().min(2, "Last name is required"),
  email: string().email("Please enter a valid email"),
  phone: string().optional(),
  street: string().optional(),
  zip: string().optional(),
  city: string().optional(),
  country: string().optional(),
  paymentMethod: string().optional(),
  dueDate: coerce.date().optional(),
  terms: boolean({
    required_error: "You must accept the terms and conditions.",
  }).refine((val) => val, {
    message: "You must accept the terms and conditions.",
  }),
});

// export type RegistrationSchemaType = infer<typeof registrationSchema>;
