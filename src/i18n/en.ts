export default {
  label: {
    back: "Back",
    next: "Next",
  },
  stepper: {
    personal_data: "Personal data",
    summary: "Summary",
    confirmation: "Confirmation",
  },
  form: {
    personal_data: {
      title: "Please enter your personal data",
    },
    salutation: {
      label: "Salutation",
    },
    first_name: {
      label: "First name*",
      placeholder: "First name",
    },
    last_name: {
      label: "Last name*",
      placeholder: "Last name",
    },
    email: {
      label: "Email address*",
      placeholder: "email@address.com",
    },
    phone: {
      label: "Phone number",
      placeholder: "IT",
    },
    street: {
      label: "Street",
      placeholder: "Street",
    },
    zip: {
      label: "ZIP",
      placeholder: "Postal code",
    },
    city: {
      label: "City",
      placeholder: "City",
    },
    country: {
      label: "Country",
      placeholder: "Select country",
    },
    payment_method: {
      label: "Payment method",
      placeholder: "Choose payment method",
    },
    due_date: {
      label: "Due date",
    },
    terms: {
      acceptance:
        "*I hereby accept the privacy policy and the general terms and conditions.",
    },
  },
  payment_method: {
    bank_transfer: "Bank transfer",
    credit_card: "Credit card",
  },
  bank_info: {
    message:
      "Please transfer the amount of €284.00 to the following bank account:",
    bank_name: "South Tyrol Savings Bank",
    iban: "IBAN",
    swift: "SWIFT",
  },
  summary: {
    salutation_and_name: "Salutation and name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    payment_method: "Payment method",
    due_date: "Due date",
  },
  confirmation: {
    title: "Payment completed successfully.",
    subtitle: "Thank you for your booking!",
    message:
      "You will shortly receive a confirmation email with the details of your booking.",
    back_home: "Back to home",
  },
} as const;
