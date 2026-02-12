// dashboard/index.js
// Personal Finance Tracker - Dashboard Module

/**
 * Calculates the total balance from income and expenses
 * @param {number} income - Total income amount
 * @param {number} expenses - Total expenses amount
 * @returns {number} Net balance
 */
function calculateBalance(income, expenses) {
  if (typeof income !== 'number' || typeof expenses !== 'number') {
    throw new Error('Income and expenses must be numbers');
  }
  return income - expenses;
}

/**
 * Generates a summary report for the dashboard
 * @param {number} income - Total income
 * @param {number} expenses - Total expenses
 * @returns {object} Summary object with balance and status
 */
function generateSummary(income, expenses) {
  const balance = calculateBalance(income, expenses);
  return {
    income,
    expenses,
    balance,
    status: balance >= 0 ? 'Surplus' : 'Deficit',
    generatedAt: new Date().toISOString()
  };
}

/**
 * Calculates savings rate as a percentage
 * @param {number} income - Total income
 * @param {number} expenses - Total expenses
 * @returns {number} Savings rate percentage
 */
function getSavingsRate(income, expenses) {
  if (income <= 0) throw new Error('Income must be greater than zero');
  const savings = income - expenses;
  return parseFloat(((savings / income) * 100).toFixed(2));
}

module.exports = { calculateBalance, generateSummary, getSavingsRate };
