export default {
  label: {
    back: "Atrás",
    next: "Siguiente",
  },
  stepper: {
    personal_data: "Datos personales",
    summary: "Resumen",
    confirmation: "Confirmación",
  },
  form: {
    personal_data: {
      title: "Por favor, introduzca sus datos personales",
    },
    salutation: {
      label: "Tratamiento",
    },
    first_name: {
      label: "Nombre*",
      placeholder: "Nombre",
    },
    last_name: {
      label: "Apellidos*",
      placeholder: "Apellidos",
    },
    email: {
      label: "Dirección de correo electrónico*",
      placeholder: "correo@direccion.com",
    },
    phone: {
      label: "Número de teléfono",
      placeholder: "IT",
    },
    street: {
      label: "Calle",
      placeholder: "Calle",
    },
    zip: {
      label: "Código postal",
      placeholder: "Código postal",
    },
    city: {
      label: "Ciudad",
      placeholder: "Ciudad",
    },
    country: {
      label: "País",
      placeholder: "Seleccionar país",
    },
    payment_method: {
      label: "Método de pago",
      placeholder: "Elegir método de pago",
    },
    due_date: {
      label: "Fecha de vencimiento",
    },
    terms: {
      acceptance:
        "*Por la presente acepto la política de privacidad y las condiciones generales.",
    },
  },
  payment_method: {
    bank_transfer: "Transferencia bancaria",
    credit_card: "Tarjeta de crédito",
  },
  bank_info: {
    message:
      "Por favor, transfiera el importe de 284,00 € a la siguiente cuenta bancaria:",
    bank_name: "South Tyrol Savings Bank",
    iban: "IBAN",
    swift: "SWIFT",
  },
  summary: {
    salutation_and_name: "Tratamiento y nombre",
    email: "Correo electrónico",
    phone: "Teléfono",
    address: "Dirección",
    payment_method: "Método de pago",
    due_date: "Fecha de vencimiento",
  },
  confirmation: {
    title: "Pago completado con éxito.",
    subtitle: "¡Gracias por su reserva!",
    message:
      "En breve recibirá un correo electrónico de confirmación con los detalles de su reserva.",
    back_home: "Volver al inicio",
  },
} as const;
