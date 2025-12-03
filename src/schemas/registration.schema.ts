import * as z from 'zod'

/**
 * Registration form validation schema
 * Defines validation rules for all form fields
 */
export const registrationSchema = z.object({
    salutation: z.string().optional(),
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Please enter a valid email'),
    phone: z.string().optional(),
    street: z.string().optional(),
    zip: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    paymentMethod: z.string().optional(),
    dueDate: z.coerce.date().optional(),
    terms: z.boolean({
        required_error: 'You must accept the terms and conditions.',
    }).refine(val => val, {
        message: 'You must accept the terms and conditions.',
    }),
})

/**
 * Type inferred from the registration schema
 */
export type RegistrationSchemaType = z.infer<typeof registrationSchema>
