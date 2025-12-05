export default {
  label: {
    back: "Retour",
    next: "Suivant",
  },
  stepper: {
    personal_data: "Données personnelles",
    summary: "Récapitulatif",
    confirmation: "Confirmation",
  },
  form: {
    personal_data: {
      title: "Veuillez saisir vos données personnelles",
    },
    salutation: {
      label: "Civilité",
    },
    first_name: {
      label: "Prénom*",
      placeholder: "Prénom",
    },
    last_name: {
      label: "Nom*",
      placeholder: "Nom",
    },
    email: {
      label: "Adresse e‑mail*",
      placeholder: "email@address.com",
    },
    phone: {
      label: "Numéro de téléphone",
      placeholder: "IT",
    },
    street: {
      label: "Rue",
      placeholder: "Rue",
    },
    zip: {
      label: "Code postal",
      placeholder: "Code postal",
    },
    city: {
      label: "Ville",
      placeholder: "Ville",
    },
    country: {
      label: "Pays",
      placeholder: "Sélectionner un pays",
    },
    payment_method: {
      label: "Mode de paiement",
      placeholder: "Choisir le mode de paiement",
    },
    due_date: {
      label: "Date d'échéance",
    },
    terms: {
      acceptance:
        "*J’accepte par la présente la politique de confidentialité et les conditions générales.",
    },
  },
  payment_method: {
    bank_transfer: "Virement bancaire",
    credit_card: "Carte de crédit",
  },
  bank_info: {
    message:
      "Veuillez transférer le montant de 284,00 € sur le compte bancaire suivant :",
    bank_name: "South Tyrol Savings Bank",
    iban: "IBAN",
    swift: "SWIFT",
  },
  summary: {
    salutation_and_name: "Civilité et nom",
    email: "E‑mail",
    phone: "Téléphone",
    address: "Adresse",
    payment_method: "Mode de paiement",
    due_date: "Date d'échéance",
  },
  confirmation: {
    title: "Paiement effectué avec succès.",
    subtitle: "Nous vous remercions pour votre réservation !",
    message:
      "Vous allez bientôt recevoir un e‑mail de confirmation avec les détails de votre réservation.",
    back_home: "Retour à l’accueil",
  },
} as const;
