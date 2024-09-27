# RentProcessor

## Overview

This exercise is divided into 3 parts.

.
└── code-challenge/
├── part-1-rent-payment-dates.js
├── part-2-rent-changes.js
└── part-3-payment-method.js

## Run Tests

All 3 scenarios are covered in `/code-challenge/__tests__`

Clone the project

```bash
  git clone https://github.com/eanesparrago/rent-processor.git
```

Go to the project directory

```bash
  cd rent-processor
```

Install dependencies

```bash
  npm install
```

Run tests

```bash
  npm test
```

![tests](https://github.com/user-attachments/assets/9b022125-230c-44fe-befd-59cbbf173995)

## Exercise Notes

This Excel file was used to analyze how rent is scheduled in real-world scenarios: https://www.spreadsheet123.com/ExcelTemplates/rent-payment-schedule.html

This helped in creating accurate unit tests e.g. generating the correct payment dates and getting the last adjusted payment amount.

Some assumptions encountered:

- Assumed that the dates provided are in ISO format, so no additional date handling is performed. In an actual project, using a date library is preferred (e.g. date-fns).
- No assumed specific currency for the amount. In an actual project, using a library for currency is preferred (e.g. Dinero.js)
- The last payment date must be adjusted to the correct amount. This logic is implemented.

## Author

- [@eanesparrago](https://www.github.com/eanesparrago)
