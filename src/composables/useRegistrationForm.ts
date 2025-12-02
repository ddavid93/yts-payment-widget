import type { IFormData } from '@/types/form'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registrationSchema } from '@/schemas/registration.schema'
import { STEP_NAMES } from '@/constants/form-options'

/**
 * Composable for managing registration form state and logic
 * Handles form validation, step navigation, and form submission
 */
export const useRegistrationForm = () => {
    // Current step state
    const currentStep = ref<number>(0)

    // Form schema
    const formSchema = toTypedSchema(registrationSchema)

    // Initialize form with vee-validate
    const form = useForm<IFormData>({
        validationSchema: formSchema,
        initialValues: {
            salutation: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            street: '',
            zip: '',
            city: '',
            country: '',
            paymentMethod: '',
            dueDate: undefined,
            terms: false,
        },
    })

    /**
     * Navigate to the next step
     * Validates form on step 0 before proceeding
     */
    const nextStep = async (): Promise<void> => {
        if (currentStep.value === 0) {
            const result = await form.validate()
            if (!result.valid) {
                return
            }
        }

        if (currentStep.value < STEP_NAMES.length - 1) {
            currentStep.value++
        }
    }

    /**
     * Navigate to the previous step
     */
    const prevStep = (): void => {
        if (currentStep.value > 0) {
            currentStep.value--
        }
    }

    /**
     * Reset form to initial state
     */
    const resetForm = (): void => {
        currentStep.value = 0
        form.resetForm()
    }

    /**
     * Handle form submission
     */
    const onSubmit = form.handleSubmit((values: IFormData) => {
        console.log('Form submitted:', values)
        nextStep()
    })

    return {
        // State
        currentStep,
        form,

        // Methods
        nextStep,
        prevStep,
        resetForm,
        onSubmit,
    }
}
