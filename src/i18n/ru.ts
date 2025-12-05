export default {
  label: {
    back: "Назад",
    next: "Далее",
  },
  stepper: {
    personal_data: "Персональные данные",
    summary: "Сводка",
    confirmation: "Подтверждение",
  },
  form: {
    personal_data: {
      title: "Пожалуйста, введите ваши персональные данные",
    },
    salutation: {
      label: "Обращение",
    },
    first_name: {
      label: "Имя*",
      placeholder: "Имя",
    },
    last_name: {
      label: "Фамилия*",
      placeholder: "Фамилия",
    },
    email: {
      label: "Адрес электронной почты*",
      placeholder: "email@address.com",
    },
    phone: {
      label: "Номер телефона",
      placeholder: "IT",
    },
    street: {
      label: "Улица",
      placeholder: "Улица",
    },
    zip: {
      label: "Индекс",
      placeholder: "Почтовый индекс",
    },
    city: {
      label: "Город",
      placeholder: "Город",
    },
    country: {
      label: "Страна",
      placeholder: "Выберите страну",
    },
    payment_method: {
      label: "Способ оплаты",
      placeholder: "Выберите способ оплаты",
    },
    due_date: {
      label: "Срок оплаты",
    },
    terms: {
      acceptance:
        "*Настоящим я принимаю политику конфиденциальности и общие условия.",
    },
  },
  payment_method: {
    bank_transfer: "Банковский перевод",
    credit_card: "Кредитная карта",
  },
  bank_info: {
    message:
      "Пожалуйста, переведите сумму 284,00 € на следующий банковский счет:",
    bank_name: "South Tyrol Savings Bank",
    iban: "IBAN",
    swift: "SWIFT",
  },
  summary: {
    salutation_and_name: "Обращение и имя",
    email: "Электронная почта",
    phone: "Телефон",
    address: "Адрес",
    payment_method: "Способ оплаты",
    due_date: "Срок оплаты",
  },
  confirmation: {
    title: "Платеж успешно выполнен.",
    subtitle: "Благодарим за вашу бронь!",
    message:
      "Вскоре вы получите электронное письмо с подтверждением с деталями вашей брони.",
    back_home: "Назад на главную",
  },
} as const;
