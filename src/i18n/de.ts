export default {
  label: {
    back: "Zurück",
    next: "Weiter",
  },
  stepper: {
    personal_data: "Persönliche Daten",
    summary: "Zusammenfassung",
    confirmation: "Bestätigung",
  },
  form: {
    personal_data: {
      title: "Bitte geben Sie Ihre persönlichen Daten ein",
    },
    salutation: {
      label: "Anrede",
    },
    first_name: {
      label: "Vorname*",
      placeholder: "Vorname",
    },
    last_name: {
      label: "Nachname*",
      placeholder: "Nachname",
    },
    email: {
      label: "E‑Mail Adresse*",
      placeholder: "email@adresse.com",
    },
    phone: {
      label: "Telefonnummer",
      placeholder: "IT",
    },
    street: {
      label: "Straße",
      placeholder: "Straße",
    },
    zip: {
      label: "PLZ",
      placeholder: "Postleitzahl",
    },
    city: {
      label: "Ort",
      placeholder: "Ort",
    },
    country: {
      label: "Land",
      placeholder: "Land auswählen",
    },
    payment_method: {
      label: "Zahlungsmethode",
      placeholder: "Zahlungsmethode wählen",
    },
    due_date: {
      label: "Fälligkeitsdatum",
    },
    terms: {
      acceptance:
        "*Hiermit akzeptiere ich die Datenschutzbestimmungen und die allgemeinen Geschäftsbedingungen.",
    },
  },
  payment_method: {
    bank_transfer: "Banküberweisung",
    credit_card: "Kreditkarte",
  },
  bank_info: {
    message:
      "Bitte überweisen Sie den Betrag von 284,00 € auf folgendes Bankkonto:",
    bank_name: "Südtiroler Sparkasse",
    iban: "IBAN",
    swift: "SWIFT",
  },
  summary: {
    salutation_and_name: "Anrede und Name",
    email: "E‑Mail",
    phone: "Telefon",
    address: "Adresse",
    payment_method: "Zahlungsmethode",
    due_date: "Fälligkeitsdatum",
  },
  confirmation: {
    title: "Zahlung erfolgreich abgeschlossen.",
    subtitle: "Vielen Dank für Ihre Buchung!",
    message:
      "Sie erhalten in Kürze eine Bestätigungs‑E‑Mail mit den Details zu Ihrer Buchung.",
    back_home: "Zur Startseite",
  },
} as const;
