/*
Part 1: Rent Payment Dates Calculation
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

// Scenario 1:

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

module.exports = { RentProcessor }
