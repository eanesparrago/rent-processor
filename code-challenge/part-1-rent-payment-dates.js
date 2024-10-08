/*
Part 1: Rent Payment Dates Calculation
*/

class RentProcessor {
  constructor (rent) {
    this.rent = {
      rentAmount: rent.rentAmount,
      rentFrequency: rent.rentFrequency,
      rentStartDate: new Date(rent.rentStartDate),
      rentEndDate: new Date(rent.rentEndDate)
    }
  }

  calculatePaymentDates () {
    const { rentFrequency, rentStartDate, rentEndDate } = this.rent

    const paymentDates = []
    let currentDate = new Date(rentStartDate)

    while (currentDate < rentEndDate) {
      paymentDates.push(this.formatPaymentDate(currentDate))

      currentDate = this.getNextPaymentDate(currentDate, rentFrequency)
    }

    return paymentDates
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
}

module.exports = { RentProcessor }
