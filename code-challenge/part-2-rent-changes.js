/*
Part 2: Handling Rent Changes
*/

class RentProcessor {
  constructor (rent) {
    this.rent = rent
    this.rentChanges = []
  }

  calculatePaymentDates () {
    const { rentAmount, rentFrequency, rentStartDate, rentEndDate } = this.rent

    const paymentDates = []
    const startDate = new Date(rentStartDate)
    const endDate = new Date(rentEndDate)
    let currentDate = new Date(startDate)

    while (currentDate < endDate) {
      // Get the correct rentAmount
      // - If rentChanges.length,
      // - Find the first item where currentDate > rentChange.effectiveDate

      let amount = rentAmount

      // TODO: Handle logic for calculating the last rent amount (should be deducted based on the rent end date)

      if (this.rentChanges.length) {
        const foundRentChange = this.rentChanges.find(
          rentChange => currentDate >= new Date(rentChange.effectiveDate)
        )

        if (foundRentChange) {
          amount = foundRentChange.rentAmount
        }
      }

      paymentDates.push({
        date: currentDate.toISOString().split('T')[0],
        amount
      })

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

  applyRentChange (rentChange) {
    // Validation
    // Error if rentStartDate is past effectiveDate
    // Error if effectiveDate is past rentEndDate
    // add rentChange to rentChanges (array)
    // - effectiveDate, rentAmount (object)
    // - sort by effectiveDate
    // Update or add the new rent change

    const index = this.rentChanges.findIndex(
      change => change.effectiveDate === rentChange.effectiveDate
    )

    if (index !== -1) {
      this.rentChanges[index] = rentChange
    } else {
      this.rentChanges.push(rentChange)
    }

    // Sort rent changes by effective date
    this.rentChanges.sort(
      (a, b) => new Date(b.effectiveDate) - new Date(a.effectiveDate)
    )
  }
}

// Example 1:

const rentProcessor = new RentProcessor({
  rentAmount: 1000,
  rentFrequency: 'monthly',
  rentStartDate: '2024-01-01',
  rentEndDate: '2024-04-01'
})

rentProcessor.applyRentChange({
  rentAmount: 1200,
  effectiveDate: '2024-01-01'
})

// rentProcessor.applyRentChange({
//   rentAmount: 1500,
//   effectiveDate: '2024-01-15'
// })

// rentProcessor.applyRentChange({
//   rentAmount: 2000,
//   effectiveDate: '2024-03-01'
// })

// console.log(rentProcessor.calculatePaymentDates())
// Expected output:
// [
// { date: "2024-01-01", amount: 1000 },
// { date: "2024-02-01", amount: 1000 },
// { date: "2024-03-01", amount: 1200 }
// ]

module.exports = { RentProcessor }
