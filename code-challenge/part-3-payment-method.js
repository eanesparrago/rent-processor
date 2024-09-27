/*
Part 3: Payment Method Consideration
*/

class RentProcessor {
  constructor (rent) {
    this.rent = {
      rentAmount: rent.rentAmount,
      rentFrequency: rent.rentFrequency,
      rentStartDate: new Date(rent.rentStartDate),
      rentEndDate: new Date(rent.rentEndDate),
      paymentMethod: rent.paymentMethod
    }
    this.rentChanges = []
  }

  /**
   * Calculates the payment dates based on the rent details and payment method
   * @returns {Array<{date: string, amount: number}>} An array of objects with the payment date (string) and amount (number)
   */
  calculatePaymentDates () {
    const { rentFrequency, rentStartDate, rentEndDate, paymentMethod } =
      this.rent

    const paymentDates = []
    let currentDate = new Date(rentStartDate)

    while (currentDate < rentEndDate) {
      const amount = this.getCurrentRentAmount(currentDate)

      const adjustedPaymentDate = this.getAdjustedPaymentDate(
        currentDate,
        paymentMethod
      )

      const nextDate = this.getNextPaymentDate(currentDate, rentFrequency)

      if (nextDate > rentEndDate) {
        // Calculate last payment amount based on remaining days
        const adjustedAmount = this.getLastPaymentAmount(
          currentDate,
          nextDate,
          rentEndDate,
          amount
        )

        paymentDates.push({
          date: this.formatPaymentDate(adjustedPaymentDate),
          amount: adjustedAmount
        })
      } else {
        paymentDates.push({
          date: this.formatPaymentDate(adjustedPaymentDate),
          amount
        })
      }

      currentDate = nextDate
    }

    return paymentDates
  }

  /**
   * Adjusts the payment date based on the payment method
   * @param {Date} currentDate - The current payment date
   * @param {string} paymentMethod - The payment method ('instant', 'creditCard', or 'bankTransfer')
   * @returns {Date} The adjusted payment date
   */
  getAdjustedPaymentDate (currentDate, paymentMethod) {
    const paymentDate = new Date(currentDate)
    const delayDays = {
      creditCard: 2,
      bankTransfer: 3
    }

    if (paymentMethod in delayDays) {
      paymentDate.setDate(paymentDate.getDate() + delayDays[paymentMethod])
    }

    return paymentDate
  }

  /**
   * Applies a rent change
   * @param {{effectiveDate: string, rentAmount: number}} rentChange - The rent change to apply
   */
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

  getLastPaymentAmount (currentDate, nextDate, rentEndDate, amount) {
    const totalDays = this.getDaysBetweenDates(currentDate, nextDate)
    const remainingDays = this.getDaysBetweenDates(currentDate, rentEndDate)
    const adjustedAmount = (amount * remainingDays) / totalDays

    return Number(adjustedAmount.toFixed(2))
  }

  getDaysBetweenDates (startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000
    return Math.round(Math.abs(endDate - startDate) / oneDay)
  }
}

module.exports = { RentProcessor }
