/**
 * rentFrequency: 'weekly' | 'fortnightly' | 'monthly'
 */

class RentProcessor {
  constructor (rent) {
    this.rent = rent
  }

  calculatePaymentDates () {
    const { rentAmount, rentFrequency, rentStartDate, rentEndDate } = this.rent

    const paymentDates = []

    const startDate = new Date(rentStartDate)
    const endDate = new Date(rentEndDate)

    let currentDate = new Date(startDate)

    while (currentDate < endDate) {
      paymentDates.push(currentDate.toISOString().split('T')[0])

      switch (rentFrequency) {
        case 'weekly':
          currentDate.setDate(currentDate.getDate() + 7)
          break

        case 'fortnightly':
          currentDate.setDate(currentDate.getDate() + 14)
          break

        case 'monthly':
          currentDate.setMonth(currentDate.getMonth() + 1)
          break

        default:
          throw new Error('Invalid rent frequency')
      }
    }

    return paymentDates
  }
}

// Example 1:

const example1 = {
  rentAmount: 1000,
  rentFrequency: 'monthly',
  rentStartDate: '2024-01-01',
  rentEndDate: '2024-04-01'
}

const rentProcessor1 = new RentProcessor(example1)
const paymentDates1 = rentProcessor1.calculatePaymentDates()

console.log(paymentDates1)
// Expected output: ["2024-01-01", "2024-02-01", "2024-03-01"]

// Example 2:

const example2 = {
  rentAmount: 1000,
  rentFrequency: 'fortnightly',
  rentStartDate: '2024-01-01',
  rentEndDate: '2024-04-01'
}

const rentProcessor2 = new RentProcessor(example2)
const paymentDates2 = rentProcessor2.calculatePaymentDates()

console.log(paymentDates2)

// Expected output:
// 2024-01-01
// 2024-01-15
// 2024-01-29
// 2024-02-12
// 2024-02-26
// 2024-03-11
// 2024-03-25

// Example 3:

const example3 = {
  rentAmount: 1000,
  rentFrequency: 'weekly',
  rentStartDate: '2024-01-01',
  rentEndDate: '2024-04-01'
}

const rentProcessor3 = new RentProcessor(example3)
const paymentDates3 = rentProcessor3.calculatePaymentDates()

console.log(paymentDates3)

// Expected output:
// 2024-01-01
// 2024-01-08
// 2024-01-15
// 2024-01-22
// 2024-01-29
// 2024-02-05
// 2024-02-12
// 2024-02-19
// 2024-02-26
// 2024-03-04
// 2024-03-11
// 2024-03-18
// 2024-03-25

// ---

// Notes

/**
 * Timezone considerations
 *
 * Assume provided rentStartDate and rentEndDate are in ISO format
 */

/**
 * Currency considerations
 *
 * One recommended approach is to use a currency library such as Dinero.js in JavaScript
 */
