export default {
  label: {
    back: "Indietro",
    next: "Avanti",
  },
  stepper: {
    personal_data: "Dati personali",
    summary: "Riepilogo",
    confirmation: "Conferma",
  },
  form: {
    personal_data: {
      title: "Inserisci i tuoi dati personali",
    },
    salutation: {
      label: "Titolo",
    },
    first_name: {
      label: "Nome*",
      placeholder: "Nome",
    },
    last_name: {
      label: "Cognome*",
      placeholder: "Cognome",
    },
    email: {
      label: "Indirizzo email*",
      placeholder: "email@indirizzo.com",
    },
    phone: {
      label: "Numero di telefono",
      placeholder: "IT",
    },
    street: {
      label: "Via",
      placeholder: "Via",
    },
    zip: {
      label: "CAP",
      placeholder: "Codice postale",
    },
    city: {
      label: "Città",
      placeholder: "Città",
    },
    country: {
      label: "Paese",
      placeholder: "Seleziona paese",
    },
    payment_method: {
      label: "Metodo di pagamento",
      placeholder: "Scegli metodo di pagamento",
    },
    due_date: {
      label: "Data di scadenza",
    },
    terms: {
      acceptance:
        "*Con la presente accetto l'informativa sulla privacy e i termini e condizioni generali.",
    },
  },
  payment_method: {
    bank_transfer: "Bonifico bancario",
    credit_card: "Carta di credito",
  },
  bank_info: {
    message:
      "Si prega di versare l'importo di 284,00 € sul seguente conto bancario:",
    bank_name: "Cassa di Risparmio dell'Alto Adige",
    iban: "IBAN",
    swift: "SWIFT",
  },
  summary: {
    salutation_and_name: "Titolo e nome",
    email: "Email",
    phone: "Telefono",
    address: "Indirizzo",
    payment_method: "Metodo di pagamento",
    due_date: "Data di scadenza",
  },
  confirmation: {
    title: "Pagamento completato con successo.",
    subtitle: "Grazie per la tua prenotazione!",
    message:
      "Riceverai a breve un'email di conferma con i dettagli della prenotazione.",
    back_home: "Torna alla home",
  },
} as const;
