// income/income.test.js
const {
  addIncome,
  getTotalIncome,
  getIncomeBySource,
  projectAnnualIncome
} = require('./index');

const sampleIncomes = [
  { source: 'Salary',    amount: 50000, description: 'Monthly salary'  },
  { source: 'Freelance', amount: 8000,  description: 'Web project'     },
  { source: 'Salary',    amount: 5000,  description: 'Bonus'           },
  { source: 'Rental',    amount: 12000, description: 'Property rental' },
];

describe('Income Module Tests', () => {

  // ── addIncome ────────────────────────────────────────────────────────
  describe('addIncome()', () => {
    test('adds a valid income record', () => {
      const result = addIncome([], { source: 'Salary', amount: 50000, description: 'Monthly' });
      expect(result).toHaveLength(1);
      expect(result[0].source).toBe('Salary');
      expect(result[0].amount).toBe(50000);
    });

    test('does not mutate the original array', () => {
      const original = [...sampleIncomes];
      addIncome(original, { source: 'Bonus', amount: 5000, description: 'Year-end' });
      expect(original).toHaveLength(sampleIncomes.length);
    });

    test('throws error when source is missing', () => {
      expect(() => addIncome([], { amount: 5000 })).toThrow();
    });

    test('throws error when amount is zero or negative', () => {
      expect(() => addIncome([], { source: 'Salary', amount: 0 })).toThrow();
    });

    test('new income record has id and createdAt fields', () => {
      const result = addIncome([], { source: 'Salary', amount: 1000, description: 'Test' });
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('createdAt');
    });
  });

  // ── getTotalIncome ───────────────────────────────────────────────────
  describe('getTotalIncome()', () => {
    test('calculates correct total income', () => {
      expect(getTotalIncome(sampleIncomes)).toBe(75000);
    });

    test('returns 0 for empty array', () => {
      expect(getTotalIncome([])).toBe(0);
    });

    test('throws error for non-array input', () => {
      expect(() => getTotalIncome(undefined)).toThrow('Incomes must be an array');
    });
  });

  // ── getIncomeBySource ────────────────────────────────────────────────
  describe('getIncomeBySource()', () => {
    test('groups income by source correctly', () => {
      const result = getIncomeBySource(sampleIncomes);
      expect(result['Salary']).toBe(55000);
      expect(result['Freelance']).toBe(8000);
      expect(result['Rental']).toBe(12000);
    });

    test('returns empty object for empty array', () => {
      expect(getIncomeBySource([])).toEqual({});
    });
  });

  // ── projectAnnualIncome ──────────────────────────────────────────────
  describe('projectAnnualIncome()', () => {
    test('projects annual income correctly', () => {
      expect(projectAnnualIncome(5000)).toBe(60000);
    });

    test('handles zero monthly income', () => {
      expect(projectAnnualIncome(0)).toBe(0);
    });

    test('handles decimal monthly income', () => {
      expect(projectAnnualIncome(1250.50)).toBe(15006);
    });

    test('throws error for non-numeric input', () => {
      expect(() => projectAnnualIncome('5000')).toThrow('Monthly income must be a non-negative number');
    });

    test('throws error for negative monthly income', () => {
      expect(() => projectAnnualIncome(-1000)).toThrow('Monthly income must be a non-negative number');
    });
  });
});
