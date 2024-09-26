const { RentProcessor } = require('../part-1-rent-payment-dates')

describe('RentProcessor', () => {
  describe('calculatePaymentDates', () => {
    test.each([
      {
        testCase: 'monthly rent - 3 months',
        rentAmount: 1000,
        rentFrequency: 'monthly',
        rentStartDate: '2024-01-01',
        rentEndDate: '2024-04-01',
        expectedDates: ['2024-01-01', '2024-02-01', '2024-03-01']
      },
      {
        testCase: 'monthly rent - 12 months',
        rentAmount: 1000,
        rentFrequency: 'monthly',
        rentStartDate: '2024-06-01',
        rentEndDate: '2025-06-01',
        expectedDates: [
          '2024-06-01',
          '2024-07-01',
          '2024-08-01',
          '2024-09-01',
          '2024-10-01',
          '2024-11-01',
          '2024-12-01',
          '2025-01-01',
          '2025-02-01',
          '2025-03-01',
          '2025-04-01',
          '2025-05-01'
        ]
      },
      {
        testCase: 'monthly rent - 24 months',
        rentAmount: 1000,
        rentFrequency: 'monthly',
        rentStartDate: '2024-06-15',
        rentEndDate: '2026-06-15',
        expectedDates: [
          '2024-06-15',
          '2024-07-15',
          '2024-08-15',
          '2024-09-15',
          '2024-10-15',
          '2024-11-15',
          '2024-12-15',
          '2025-01-15',
          '2025-02-15',
          '2025-03-15',
          '2025-04-15',
          '2025-05-15',
          '2025-06-15',
          '2025-07-15',
          '2025-08-15',
          '2025-09-15',
          '2025-10-15',
          '2025-11-15',
          '2025-12-15',
          '2026-01-15',
          '2026-02-15',
          '2026-03-15',
          '2026-04-15',
          '2026-05-15'
        ]
      },
      {
        testCase: 'fortnightly rent',
        rentAmount: 1200,
        rentFrequency: 'fortnightly',
        rentStartDate: '2024-01-01',
        rentEndDate: '2024-04-01',
        expectedDates: [
          '2024-01-01',
          '2024-01-15',
          '2024-01-29',
          '2024-02-12',
          '2024-02-26',
          '2024-03-11',
          '2024-03-25'
        ]
      },
      {
        testCase: 'weekly rent',
        rentAmount: 1200,
        rentFrequency: 'weekly',
        rentStartDate: '2024-01-01',
        rentEndDate: '2024-04-01',
        expectedDates: [
          '2024-01-01',
          '2024-01-08',
          '2024-01-15',
          '2024-01-22',
          '2024-01-29',
          '2024-02-05',
          '2024-02-12',
          '2024-02-19',
          '2024-02-26',
          '2024-03-04',
          '2024-03-11',
          '2024-03-18',
          '2024-03-25'
        ]
      }
    ])(
      'should calculate payment dates correctly for $testCase',
      ({
        rentAmount,
        rentFrequency,
        rentStartDate,
        rentEndDate,
        expectedDates
      }) => {
        const rent = { rentAmount, rentFrequency, rentStartDate, rentEndDate }
        const rentProcessor = new RentProcessor(rent)
        const paymentDates = rentProcessor.calculatePaymentDates()

        expect(paymentDates).toEqual(expectedDates)
      }
    )
  })
})
