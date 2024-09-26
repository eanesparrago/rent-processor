/*
Part 3: Payment Method Consideration
*/

class RentProcessor {
  constructor (rent) {
    this.rent = rent
    this.rentChanges = []
  }

  calculatePaymentDates () {
    const { rentFrequency, rentStartDate, rentEndDate, paymentMethod } =
      this.rent

    const paymentDates = []
    const startDate = new Date(rentStartDate)
    const endDate = new Date(rentEndDate)
    let currentDate = new Date(startDate)

    while (currentDate < endDate) {
      const amount = this.getCurrentRentAmount(currentDate)

      const paymentDate = this.getAdjustedPaymentDate(
        currentDate,
        paymentMethod
      )

      paymentDates.push({
        date: this.formatPaymentDate(paymentDate),
        amount
      })

      currentDate = this.getNextPaymentDate(currentDate, rentFrequency)
    }

    return paymentDates
  }

  getAdjustedPaymentDate (currentDate, paymentMethod) {
    const paymentDate = new Date(currentDate)

    if (paymentMethod === 'creditCard') {
      paymentDate.setDate(paymentDate.getDate() + 2)
    }

    if (paymentMethod === 'bankTransfer') {
      paymentDate.setDate(paymentDate.getDate() + 3)
    }
    return paymentDate
  }

  applyRentChange (rentChange) {
    const existingChangeIndex = this.rentChanges.findIndex(
      change => change.effectiveDate === rentChange.effectiveDate
    )

    if (existingChangeIndex !== -1) {
      this.rentChanges[existingChangeIndex] = rentChange
    } else {
      this.rentChanges.push(rentChange)
    }

    this.rentChanges.sort(
      (a, b) => new Date(b.effectiveDate) - new Date(a.effectiveDate)
    )
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
    const applicableRentChange = this.rentChanges
      .filter(change => new Date(change.effectiveDate) <= date)
      .sort((a, b) => new Date(b.effectiveDate) - new Date(a.effectiveDate))[0]

    return applicableRentChange
      ? applicableRentChange.rentAmount
      : this.rent.rentAmount
  }
}

module.exports = { RentProcessor }
