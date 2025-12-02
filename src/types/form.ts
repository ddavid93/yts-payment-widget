/**
 * Form data interface
 * Represents the complete form data structure for the registration form
 */
export interface IFormData {
    salutation?: string
    firstName: string
    lastName: string
    email: string
    phone?: string
    street?: string
    zip?: string
    city?: string
    country?: string
    paymentMethod?: string
    dueDate?: Date
    terms: boolean
}

/**
 * Stepper component props interface
 */
export interface IStepperProps {
    steps: string[]
    currentStep: number
}

/**
 * Form field name type
 * Union type of all possible form field names
 */
export type FormFieldNameType = keyof IFormData

/**
 * Step component emit interface
 */
export interface IStepEmits {
    (e: 'reset'): void
}

/**
 * Select option interface
 */
export interface ISelectOption {
    value: string
    label: string
}
