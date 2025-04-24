export const PRODUCT_SIZES = [
  "XSmall",
  "Small",
  "Medium",
  "Large",
  "XLarge",
] as const;

export const numberOfPersons = 11;

type PasswordRule = { name: string; rule: RegExp };
export const passwordRules: PasswordRule[] = [
  {
    name: "Password must be at least 8 characters long.",
    rule: /^.{8,}$/,
  },
  {
    name: "Password must contain at least one uppercase letter.",
    rule: /^(?=.*[A-Z]).+$/,
  },
  {
    name: "Password must contain at least one lowercase letter.",
    rule: /^(?=.*[a-z]).+$/,
  },
  {
    name: "Password must contain at least one digit.",
    rule: /^(?=.*\d).+$/,
  },
  {
    name: "Password must contain at least one special character.",
    rule: /^(?=.*[!@#$%^&*]).+$/,
  },
];

export const AVALIABLE_EMAILS = [
  "ahmed@gmail.com",
  "ahmed2@gmail.com",
  "ahmed3@gmail.com",
];
