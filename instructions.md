Coding Test: JavaScript Developer

Objective: Build a JavaScript class that processes rent payment schedules, handles rent
changes over time, and incorporates different payment methods with varying processing times.

Part 1: Rent Payment Dates Calculation

Create a JavaScript class called RentProcessor that accepts an input object called rent
containing the following properties:

● rentAmount (Use the currency of your choice)
● rentFrequency (weekly, fortnightly, or monthly)
● rentStartDate
● rentEndDate (Date format: "YYYY-MM-DD")

The application should return an array of rent payment dates based on the rent frequency.

---

Part 2: Handling Rent Changes

Extend the application to handle rent changes. The class should now accept a new input object
called rentChange with the following properties:

● rentAmount
● effectiveDate (The date when the new rent amount starts to apply)

When a rent change is received, the class should:

1. Recalculate the rent payment dates.
2. Apply the new rent amount from the effective date.
3. Handle multiple rent changes and ensure the recalculated rent payment dates reflect the
   correct rent amount at each point in time.
   Return an array of rent payment dates and their respective rent amounts.

---

Part 3: Payment Method Consideration

Add a new field called paymentMethod to the rent object. The payment method can be one of
the following:

● creditCard (Takes 2 days to process)
● bankTransfer (Takes 3 days to process)
● instant (Immediate)

The application should return the payment date for each rent based on the processing time of
the selected payment method.

Expected Outcome

An array of rent payment dates, correctly adjusted for rent changes and payment methods.

---

Example Scenarios:

Scenario 1: Basic Rent Calculation

const rent = {
rentAmount: 1000,
rentFrequency: "monthly",
rentStartDate: "2024-01-01",
rentEndDate: "2024-04-01"
};

const rentProcessor = new RentProcessor(rent);
const paymentDates = rentProcessor.calculatePaymentDates();
console.log(paymentDates);
// Expected output: ["2024-01-01", "2024-02-01", "2024-03-01"]

Scenario 2: Rent Change

const rent = {
rentAmount: 1000,
rentFrequency: "monthly",
rentStartDate: "2024-01-01",
rentEndDate: "2024-04-01"
};
const rentChange = {
rentAmount: 1200,
effectiveDate: "2024-02-15"
};
const rentProcessor = new RentProcessor(rent);
rentProcessor.applyRentChange(rentChange);
console.log(rentProcessor.calculatePaymentDates());
// Expected output:
// [
// { date: "2024-01-01", amount: 1000 },
// { date: "2024-02-01", amount: 1000 },
// { date: "2024-03-01", amount: 1200 }
// ]

Scenario 3: Payment Method Processing

const rent = {
rentAmount: 1000,
rentFrequency: "monthly",
rentStartDate: "2024-01-01",
rentEndDate: "2024-04-01",
paymentMethod: "creditCard"
};
const rentProcessor = new RentProcessor(rent);
const paymentDates = rentProcessor.calculatePaymentDates();
console.log(paymentDates);
// Expected output:
// [
// { paymentDate: "2024-01-03", amount: 1000, method: "creditCard"
}, // 2-day processing
// { paymentDate: "2024-02-03", amount: 1000, method: "creditCard"
},
// { paymentDate: "2024-03-03", amount: 1000, method: "creditCard" }
// ]

---

Additional Notes:

4. You do not have to code for all edge cases but it would be good to think of a few.
5. Feel free to ask questions if anything is unclear and explain any assumptions you make
in your solution.
6. Write appropriate tests for the scenarios above.
7. Please upload your code to a online Git repo and share the link
