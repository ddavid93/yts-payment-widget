export default {
  label: {
    back: "Zpět",
    next: "Další",
  },
  stepper: {
    personal_data: "Osobní údaje",
    summary: "Souhrn",
    confirmation: "Potvrzení",
  },
  form: {
    personal_data: {
      title: "Zadejte prosím své osobní údaje",
    },
    salutation: {
      label: "Oslovení",
    },
    first_name: {
      label: "Jméno*",
      placeholder: "Jméno",
    },
    last_name: {
      label: "Příjmení*",
      placeholder: "Příjmení",
    },
    email: {
      label: "E‑mailová adresa*",
      placeholder: "email@address.com",
    },
    phone: {
      label: "Telefonní číslo",
      placeholder: "IT",
    },
    street: {
      label: "Ulice",
      placeholder: "Ulice",
    },
    zip: {
      label: "PSČ",
      placeholder: "Poštovní směrovací číslo",
    },
    city: {
      label: "Město",
      placeholder: "Město",
    },
    country: {
      label: "Země",
      placeholder: "Vyberte zemi",
    },
    payment_method: {
      label: "Platební metoda",
      placeholder: "Zvolte platební metodu",
    },
    due_date: {
      label: "Datum splatnosti",
    },
    terms: {
      acceptance:
        "*Tímto přijímám zásady ochrany osobních údajů a všeobecné obchodní podmínky.",
    },
  },
  payment_method: {
    bank_transfer: "Bankovní převod",
    credit_card: "Platební karta",
  },
  bank_info: {
    message:
      "Převeďte prosím částku 284,00 € na následující bankovní účet:",
    bank_name: "South Tyrol Savings Bank",
    iban: "IBAN",
    swift: "SWIFT",
  },
  summary: {
    salutation_and_name: "Oslovení a jméno",
    email: "E‑mail",
    phone: "Telefon",
    address: "Adresa",
    payment_method: "Platební metoda",
    due_date: "Datum splatnosti",
  },
  confirmation: {
    title: "Platba byla úspěšně dokončena.",
    subtitle: "Děkujeme za Vaši rezervaci!",
    message:
      "Brzy obdržíte potvrzovací e‑mail s podrobnostmi Vaší rezervace.",
    back_home: "Zpět na úvodní stránku",
  },
} as const;
