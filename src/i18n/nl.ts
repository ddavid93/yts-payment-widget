export default {
  label: {
    back: "Terug",
    next: "Volgende",
  },
  stepper: {
    personal_data: "Persoonlijke gegevens",
    summary: "Overzicht",
    confirmation: "Bevestiging",
  },
  form: {
    personal_data: {
      title: "Vul alstublieft uw persoonlijke gegevens in",
    },
    salutation: {
      label: "Aanhef",
    },
    first_name: {
      label: "Voornaam*",
      placeholder: "Voornaam",
    },
    last_name: {
      label: "Achternaam*",
      placeholder: "Achternaam",
    },
    email: {
      label: "E-mailadres*",
      placeholder: "email@address.com",
    },
    phone: {
      label: "Telefoonnummer",
      placeholder: "IT",
    },
    street: {
      label: "Straat",
      placeholder: "Straat",
    },
    zip: {
      label: "Postcode",
      placeholder: "Postcode",
    },
    city: {
      label: "Plaats",
      placeholder: "Plaats",
    },
    country: {
      label: "Land",
      placeholder: "Selecteer land",
    },
    payment_method: {
      label: "Betaalmethode",
      placeholder: "Kies betaalmethode",
    },
    due_date: {
      label: "Vervaldatum",
    },
    terms: {
      acceptance:
        "*Hierbij accepteer ik het privacybeleid en de algemene voorwaarden.",
    },
  },
  payment_method: {
    bank_transfer: "Bankoverschrijving",
    credit_card: "Creditcard",
  },
  bank_info: {
    message:
      "Maak alstublieft het bedrag van €284.00 over naar de volgende bankrekening:",
    bank_name: "South Tyrol Savings Bank",
    iban: "IBAN",
    swift: "SWIFT",
  },
  summary: {
    salutation_and_name: "Aanhef en naam",
    email: "E‑mail",
    phone: "Telefoon",
    address: "Adres",
    payment_method: "Betaalmethode",
    due_date: "Vervaldatum",
  },
  confirmation: {
    title: "Betaling succesvol voltooid.",
    subtitle: "Hartelijk dank voor uw boeking!",
    message:
      "U ontvangt spoedig een bevestigingsmail met de details van uw boeking.",
    back_home: "Terug naar startpagina",
  },
} as const;
