// dashboard/dashboard.test.js
const { calculateBalance, generateSummary, getSavingsRate } = require('./index');

describe('Dashboard Module Tests', () => {

  // ── calculateBalance ─────────────────────────────────────────────────
  describe('calculateBalance()', () => {
    test('returns correct surplus balance', () => {
      expect(calculateBalance(5000, 3000)).toBe(2000);
    });

    test('returns negative balance when expenses exceed income', () => {
      expect(calculateBalance(3000, 5000)).toBe(-2000);
    });

    test('returns zero when income equals expenses', () => {
      expect(calculateBalance(4000, 4000)).toBe(0);
    });

    test('throws error for non-numeric income', () => {
      expect(() => calculateBalance('5000', 3000)).toThrow('Income and expenses must be numbers');
    });

    test('throws error for non-numeric expenses', () => {
      expect(() => calculateBalance(5000, null)).toThrow('Income and expenses must be numbers');
    });
  });

  // ── generateSummary ──────────────────────────────────────────────────
  describe('generateSummary()', () => {
    test('returns Surplus status when income > expenses', () => {
      const summary = generateSummary(6000, 4000);
      expect(summary.status).toBe('Surplus');
      expect(summary.balance).toBe(2000);
    });

    test('returns Deficit status when expenses > income', () => {
      const summary = generateSummary(3000, 5000);
      expect(summary.status).toBe('Deficit');
      expect(summary.balance).toBe(-2000);
    });

    test('summary contains all required fields', () => {
      const summary = generateSummary(5000, 3000);
      expect(summary).toHaveProperty('income');
      expect(summary).toHaveProperty('expenses');
      expect(summary).toHaveProperty('balance');
      expect(summary).toHaveProperty('status');
      expect(summary).toHaveProperty('generatedAt');
    });
  });

  // ── getSavingsRate ───────────────────────────────────────────────────
  describe('getSavingsRate()', () => {
    test('calculates correct savings rate', () => {
      expect(getSavingsRate(10000, 7000)).toBe(30.00);
    });

    test('returns 0 when income equals expenses', () => {
      expect(getSavingsRate(5000, 5000)).toBe(0);
    });

    test('returns negative rate when in deficit', () => {
      expect(getSavingsRate(5000, 6000)).toBeLessThan(0);
    });

    test('throws error when income is zero', () => {
      expect(() => getSavingsRate(0, 3000)).toThrow('Income must be greater than zero');
    });
  });
});
