const { RentProcessor } = require('../part-3-payment-method')

describe('RentProcessor', () => {
  describe('calculatePaymentDates', () => {
    test.each([
      {
        testCase: 'monthly rent - 3 months - instant payment',
        rentAmount: 1000,
        rentFrequency: 'monthly',
        rentStartDate: '2024-01-01',
        rentEndDate: '2024-04-01',
        paymentMethod: 'instant',
        expectedDates: [
          { date: '2024-01-01', amount: 1000 },
          { date: '2024-02-01', amount: 1000 },
          { date: '2024-03-01', amount: 1000 }
        ]
      },
      {
        testCase: 'monthly rent - 3 months - credit card payment',
        rentAmount: 1000,
        rentFrequency: 'monthly',
        rentStartDate: '2024-01-01',
        rentEndDate: '2024-04-01',
        paymentMethod: 'creditCard',
        expectedDates: [
          { date: '2024-01-03', amount: 1000 },
          { date: '2024-02-03', amount: 1000 },
          { date: '2024-03-03', amount: 1000 }
        ]
      },
      {
        testCase: 'monthly rent - 3 months - bank transfer payment',
        rentAmount: 1000,
        rentFrequency: 'monthly',
        rentStartDate: '2024-01-01',
        rentEndDate: '2024-04-01',
        paymentMethod: 'bankTransfer',
        expectedDates: [
          { date: '2024-01-04', amount: 1000 },
          { date: '2024-02-04', amount: 1000 },
          { date: '2024-03-04', amount: 1000 }
        ]
      },
      {
        testCase: 'fortnightly rent - 3 months - credit card payment',
        rentAmount: 1000,
        rentFrequency: 'fortnightly',
        rentStartDate: '2024-01-01',
        rentEndDate: '2024-04-01',
        paymentMethod: 'creditCard',
        expectedDates: [
          { date: '2024-01-03', amount: 1000 },
          { date: '2024-01-17', amount: 1000 },
          { date: '2024-01-31', amount: 1000 },
          { date: '2024-02-14', amount: 1000 },
          { date: '2024-02-28', amount: 1000 },
          { date: '2024-03-13', amount: 1000 },
          { date: '2024-03-27', amount: 500 }
        ]
      },
      {
        testCase: 'weekly rent - 3 months - bank transfer payment',
        rentAmount: 1000,
        rentFrequency: 'weekly',
        rentStartDate: '2024-01-01',
        rentEndDate: '2024-04-01',
        paymentMethod: 'bankTransfer',
        expectedDates: [
          { date: '2024-01-04', amount: 1000 },
          { date: '2024-01-11', amount: 1000 },
          { date: '2024-01-18', amount: 1000 },
          { date: '2024-01-25', amount: 1000 },
          { date: '2024-02-01', amount: 1000 },
          { date: '2024-02-08', amount: 1000 },
          { date: '2024-02-15', amount: 1000 },
          { date: '2024-02-22', amount: 1000 },
          { date: '2024-02-29', amount: 1000 },
          { date: '2024-03-07', amount: 1000 },
          { date: '2024-03-14', amount: 1000 },
          { date: '2024-03-21', amount: 1000 },
          { date: '2024-03-28', amount: 1000 }
        ]
      }
    ])(
      'should calculate payment dates correctly for $testCase',
      ({
        rentAmount,
        rentFrequency,
        rentStartDate,
        rentEndDate,
        rentChanges,
        paymentMethod,
        expectedDates
      }) => {
        const rent = {
          rentAmount,
          rentFrequency,
          rentStartDate,
          rentEndDate,
          paymentMethod
        }
        const rentProcessor = new RentProcessor(rent)

        rentChanges?.forEach(change => {
          rentProcessor.applyRentChange(change)
        })

        const paymentDates = rentProcessor.calculatePaymentDates()

        expect(paymentDates).toEqual(expectedDates)
      }
    )
  })
})
