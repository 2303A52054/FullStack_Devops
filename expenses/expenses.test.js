// expenses/expenses.test.js
const {
  addExpense,
  getTotalExpenses,
  getExpensesByCategory,
  filterExpensesByAmount
} = require('./index');

const sampleExpenses = [
  { category: 'Food',      amount: 500,  description: 'Groceries'  },
  { category: 'Transport', amount: 300,  description: 'Bus pass'   },
  { category: 'Food',      amount: 200,  description: 'Restaurant' },
  { category: 'Utilities', amount: 1500, description: 'Electricity'},
];

describe('Expenses Module Tests', () => {

  // ── addExpense ───────────────────────────────────────────────────────
  describe('addExpense()', () => {
    test('adds a valid expense to the array', () => {
      const result = addExpense([], { category: 'Food', amount: 100, description: 'Lunch' });
      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Food');
      expect(result[0].amount).toBe(100);
    });

    test('does not mutate the original array', () => {
      const original = [...sampleExpenses];
      addExpense(original, { category: 'Health', amount: 200, description: 'Medicine' });
      expect(original).toHaveLength(sampleExpenses.length);
    });

    test('throws error when category is missing', () => {
      expect(() => addExpense([], { amount: 100 })).toThrow();
    });

    test('throws error when amount is zero or negative', () => {
      expect(() => addExpense([], { category: 'Food', amount: -50 })).toThrow();
    });

    test('new expense has id and createdAt fields', () => {
      const result = addExpense([], { category: 'Food', amount: 100, description: 'Test' });
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('createdAt');
    });
  });

  // ── getTotalExpenses ─────────────────────────────────────────────────
  describe('getTotalExpenses()', () => {
    test('calculates correct total', () => {
      expect(getTotalExpenses(sampleExpenses)).toBe(2500);
    });

    test('returns 0 for empty array', () => {
      expect(getTotalExpenses([])).toBe(0);
    });

    test('throws error for non-array input', () => {
      expect(() => getTotalExpenses(null)).toThrow('Expenses must be an array');
    });
  });

  // ── getExpensesByCategory ────────────────────────────────────────────
  describe('getExpensesByCategory()', () => {
    test('groups expenses correctly', () => {
      const result = getExpensesByCategory(sampleExpenses);
      expect(result['Food']).toBe(700);
      expect(result['Transport']).toBe(300);
      expect(result['Utilities']).toBe(1500);
    });

    test('returns empty object for empty array', () => {
      expect(getExpensesByCategory([])).toEqual({});
    });
  });

  // ── filterExpensesByAmount ───────────────────────────────────────────
  describe('filterExpensesByAmount()', () => {
    test('filters expenses above threshold correctly', () => {
      const result = filterExpensesByAmount(sampleExpenses, 400);
      expect(result).toHaveLength(2);
      expect(result.every(e => e.amount >= 400)).toBe(true);
    });

    test('returns all when threshold is 0', () => {
      const result = filterExpensesByAmount(sampleExpenses, 0);
      expect(result).toHaveLength(sampleExpenses.length);
    });

    test('throws error for non-numeric threshold', () => {
      expect(() => filterExpensesByAmount(sampleExpenses, '400')).toThrow('Threshold must be a number');
    });
  });
});
