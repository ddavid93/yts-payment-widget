export default {
  label: {
    back: "Wstecz",
    next: "Dalej",
  },
  stepper: {
    personal_data: "Dane osobowe",
    summary: "Podsumowanie",
    confirmation: "Potwierdzenie",
  },
  form: {
    personal_data: {
      title: "Proszę wprowadzić swoje dane osobowe",
    },
    salutation: {
      label: "Zwrot grzecznościowy",
    },
    first_name: {
      label: "Imię*",
      placeholder: "Imię",
    },
    last_name: {
      label: "Nazwisko*",
      placeholder: "Nazwisko",
    },
    email: {
      label: "Adres e‑mail*",
      placeholder: "email@address.com",
    },
    phone: {
      label: "Numer telefonu",
      placeholder: "IT",
    },
    street: {
      label: "Ulica",
      placeholder: "Ulica",
    },
    zip: {
      label: "Kod pocztowy",
      placeholder: "Kod pocztowy",
    },
    city: {
      label: "Miasto",
      placeholder: "Miasto",
    },
    country: {
      label: "Kraj",
      placeholder: "Wybierz kraj",
    },
    payment_method: {
      label: "Metoda płatności",
      placeholder: "Wybierz metodę płatności",
    },
    due_date: {
      label: "Termin płatności",
    },
    terms: {
      acceptance:
        "*Niniejszym akceptuję politykę prywatności oraz ogólne warunki.",
    },
  },
  payment_method: {
    bank_transfer: "Przelew bankowy",
    credit_card: "Karta kredytowa",
  },
  bank_info: {
    message:
      "Proszę przelać kwotę 284,00 € na następujący rachunek bankowy:",
    bank_name: "South Tyrol Savings Bank",
    iban: "IBAN",
    swift: "SWIFT",
  },
  summary: {
    salutation_and_name: "Zwrot grzecznościowy i imię",
    email: "E‑mail",
    phone: "Telefon",
    address: "Adres",
    payment_method: "Metoda płatności",
    due_date: "Termin płatności",
  },
  confirmation: {
    title: "Płatność zakończona pomyślnie.",
    subtitle: "Dziękujemy za rezerwację!",
    message:
      "Wkrótce otrzymają Państwo e‑mail z potwierdzeniem zawierający szczegóły rezerwacji.",
    back_home: "Powrót do strony głównej",
  },
} as const;
