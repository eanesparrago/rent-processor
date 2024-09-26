const { RentProcessor } = require('../part-2-rent-changes')

describe('RentProcessor', () => {
  describe('calculatePaymentDates', () => {
    test.each([
      {
        testCase: 'monthly rent - 3 months with 1 rent change',
        rentAmount: 1000,
        rentFrequency: 'monthly',
        rentStartDate: '2024-01-01',
        rentEndDate: '2024-04-01',
        rentChanges: [{ effectiveDate: '2024-02-15', rentAmount: 1200 }],
        expectedDates: [
          { date: '2024-01-01', amount: 1000 },
          { date: '2024-02-01', amount: 1000 },
          { date: '2024-03-01', amount: 1200 }
        ]
      },
      {
        testCase: 'monthly rent - 3 months with 2 rent changes',
        rentAmount: 1000,
        rentFrequency: 'monthly',
        rentStartDate: '2024-01-01',
        rentEndDate: '2024-04-01',
        rentChanges: [
          { effectiveDate: '2024-01-15', rentAmount: 1200 },
          { effectiveDate: '2024-03-01', rentAmount: 1500 }
        ],
        expectedDates: [
          { date: '2024-01-01', amount: 1000 },
          { date: '2024-02-01', amount: 1200 },
          { date: '2024-03-01', amount: 1500 }
        ]
      },
      {
        testCase: 'fortnightly rent - 3 months with 2 rent changes',
        rentAmount: 1000,
        rentFrequency: 'fortnightly',
        rentStartDate: '2024-01-01',
        rentEndDate: '2024-04-01',
        rentChanges: [
          { effectiveDate: '2024-01-15', rentAmount: 1200 },
          { effectiveDate: '2024-03-01', rentAmount: 1500 }
        ],
        expectedDates: [
          { date: '2024-01-01', amount: 1000 },
          { date: '2024-01-15', amount: 1200 },
          { date: '2024-01-29', amount: 1200 },
          { date: '2024-02-12', amount: 1200 },
          { date: '2024-02-26', amount: 1200 },
          { date: '2024-03-11', amount: 1500 },
          { date: '2024-03-25', amount: 1500 }
        ]
      },
      {
        testCase: 'weekly rent - 3 months with 2 rent changes',
        rentAmount: 1000,
        rentFrequency: 'weekly',
        rentStartDate: '2024-01-01',
        rentEndDate: '2024-04-01',
        rentChanges: [
          { effectiveDate: '2024-01-15', rentAmount: 1200 },
          { effectiveDate: '2024-03-01', rentAmount: 1500 }
        ],
        expectedDates: [
          { date: '2024-01-01', amount: 1000 },
          { date: '2024-01-08', amount: 1000 },
          { date: '2024-01-15', amount: 1200 },
          { date: '2024-01-22', amount: 1200 },
          { date: '2024-01-29', amount: 1200 },
          { date: '2024-02-05', amount: 1200 },
          { date: '2024-02-12', amount: 1200 },
          { date: '2024-02-19', amount: 1200 },
          { date: '2024-02-26', amount: 1200 },
          { date: '2024-03-04', amount: 1500 },
          { date: '2024-03-11', amount: 1500 },
          { date: '2024-03-18', amount: 1500 },
          { date: '2024-03-25', amount: 1500 }
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
        expectedDates
      }) => {
        const rent = { rentAmount, rentFrequency, rentStartDate, rentEndDate }
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
