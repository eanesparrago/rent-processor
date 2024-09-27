/*
Part 2: Handling Rent Changes
*/

class RentProcessor {
  constructor (rent) {
    this.rent = {
      rentAmount: rent.rentAmount,
      rentFrequency: rent.rentFrequency,
      rentStartDate: new Date(rent.rentStartDate),
      rentEndDate: new Date(rent.rentEndDate)
    }
    this.rentChanges = []
  }

  calculatePaymentDates () {
    const { rentFrequency, rentStartDate, rentEndDate } = this.rent

    const paymentDates = []
    let currentDate = new Date(rentStartDate)

    while (currentDate < rentEndDate) {
      const amount = this.getCurrentRentAmount(currentDate)

      paymentDates.push({
        date: this.formatPaymentDate(currentDate),
        amount
      })

      currentDate = this.getNextPaymentDate(currentDate, rentFrequency)
    }

    return paymentDates
  }

  applyRentChange (rentChange) {
    const newRentChange = {
      rentAmount: rentChange.rentAmount,
      effectiveDate: new Date(rentChange.effectiveDate)
    }

    const existingChangeIndex = this.rentChanges.findIndex(
      change =>
        change.effectiveDate.getTime() === newRentChange.effectiveDate.getTime()
    )

    if (existingChangeIndex !== -1) {
      this.rentChanges[existingChangeIndex] = newRentChange
    } else {
      this.rentChanges.push(newRentChange)
      // Only sort if a new change was added
      this.rentChanges.sort(
        (a, b) => b.effectiveDate.getTime() - a.effectiveDate.getTime()
      )
    }
  }

  formatPaymentDate (currentDate) {
    return currentDate.toISOString().split('T')[0]
  }

  getNextPaymentDate (currentDate, frequency) {
    const nextDate = new Date(currentDate)
    switch (frequency) {
      case 'weekly':
        nextDate.setDate(nextDate.getDate() + 7)
        break
      case 'fortnightly':
        nextDate.setDate(nextDate.getDate() + 14)
        break
      case 'monthly':
        nextDate.setMonth(nextDate.getMonth() + 1)
        break
      default:
        throw new Error('Invalid rent frequency')
    }
    return nextDate
  }

  getCurrentRentAmount (date) {
    const applicableRentChange = this.rentChanges.find(
      change => change.effectiveDate <= date
    )

    return applicableRentChange
      ? applicableRentChange.rentAmount
      : this.rent.rentAmount
  }
}

module.exports = { RentProcessor }
