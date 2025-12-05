import { createSharedComposable } from "@vueuse/core";
import { toTypedSchema } from "@vee-validate/zod";
import { formSchema } from "@/schemas/form.schema.ts";
import { useForm } from "vee-validate";

function usePaymentFormStoreSingleton() {
  // Initialize form with vee-validate
  const form = useForm({
    // Keep values when fields are conditionally unmounted between steps
    keepValuesOnUnmount: true,
    validationSchema: toTypedSchema(formSchema),
    initialValues: {
      city: "Bolzano",
      country: "italy",
      dueDate: undefined,
      email: "david.diaz@yanovis.com",
      firstName: "Daniel David",
      lastName: "Diaz Gonzalez",
      paymentMethod: "",
      phone: "3889817952",
      salutation: "Frau",
      street: "Via Ipazia 2",
      terms: true,
      zip: "39100",
    },
  });

  return {
    form,
  };
}

export const usePaymentFormStore = createSharedComposable(
  usePaymentFormStoreSingleton,
);
