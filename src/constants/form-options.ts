import type { ISelectOption } from '@/types/form'

/**
 * Step names for the registration form
 */
export const STEP_NAMES: string[] = ['Personal Data', 'Summary', 'Confirmation']

/**
 * Salutation options for the form
 */
export const SALUTATION_OPTIONS: ISelectOption[] = [
    { value: 'Herr', label: 'Herr' },
    { value: 'Frau', label: 'Frau' },
]

/**
 * Country options for the form
 */
export const COUNTRY_OPTIONS: ISelectOption[] = [
    { value: 'italy', label: 'Italien' },
    { value: 'germany', label: 'Deutschland' },
    { value: 'austria', label: 'Österreich' },
]

/**
 * Payment method options for the form
 */
export const PAYMENT_METHOD_OPTIONS: ISelectOption[] = [
    { value: 'bank_transfer', label: 'Banküberweisung' },
    { value: 'credit_card', label: 'Kreditkarte' },
]

/**
 * Bank information for payment
 */
export const BANK_INFO = {
    message: "Si prega di versare l'importo die 284,00 € sul seguente conto bancario:",
    bankName: "Cassa di risparmio dell'Alto Adige",
    iban: 'IT000 0000 0000 0000 0000',
    swift: '123456789',
} as const
