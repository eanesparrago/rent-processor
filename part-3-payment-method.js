/*
Part 3: Payment Method Consideration

paymentMethod:

- creditCard (Takes 2 days to process)
- bankTransfer (Takes 3 days to process)
- instant (Immediate)
*/

class RentProcessor {
  constructor (rent) {
    this.rent = rent
    this.rentChanges = []
  }

  calculatePaymentDates () {
    const {
      rentAmount,
      rentFrequency,
      rentStartDate,
      rentEndDate,
      paymentMethod
    } = this.rent

    const paymentDates = []
    const startDate = new Date(rentStartDate)
    const endDate = new Date(rentEndDate)
    let currentDate = new Date(startDate)

    while (currentDate < endDate) {
      // Get the correct rentAmount
      // - If rentChanges.length,
      // - Find the first item where currentDate > rentChange.effectiveDate

      let paymentAmount = rentAmount

      if (this.rentChanges.length) {
        const foundRentChange = this.rentChanges.find(
          rentChange => currentDate >= new Date(rentChange.effectiveDate)
        )

        if (foundRentChange) {
          paymentAmount = foundRentChange.rentAmount
        }
      }

      const paymentDate = new Date(currentDate)

      if (paymentMethod === 'creditCard') {
        paymentDate.setDate(paymentDate.getDate() + 2)
      }

      if (paymentMethod === 'bankTransfer') {
        paymentDate.setDate(paymentDate.getDate() + 3)
      }

      paymentDates.push({
        date: paymentDate.toISOString().split('T')[0],
        amount: paymentAmount
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

    // Sort rent changes by effectiveDate so it is simpler to retrieve
    this.rentChanges.sort(
      (a, b) => new Date(b.effectiveDate) - new Date(a.effectiveDate)
    )
  }
}

// Example 1:

const rent = {
  rentAmount: 1000,
  rentFrequency: 'monthly',
  rentStartDate: '2024-01-01',
  rentEndDate: '2024-04-01',
  paymentMethod: 'creditCard'
}
const rentProcessor = new RentProcessor(rent)
const paymentDates = rentProcessor.calculatePaymentDates()
console.log(paymentDates)

// // Expected output:
// // [
// // { paymentDate: "2024-01-03", amount: 1000, method: "creditCard"
// }, // 2-day processing
// // { paymentDate: "2024-02-03", amount: 1000, method: "creditCard"
// },
// // { paymentDate: "2024-03-03", amount: 1000, method: "creditCard" }
// // ]
