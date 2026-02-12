// expenses/index.js
// Personal Finance Tracker - Expenses Module

/**
 * Adds a new expense record
 * @param {Array} expenses - Existing expenses array
 * @param {object} expense - New expense { category, amount, description }
 * @returns {Array} Updated expenses array
 */
function addExpense(expenses, expense) {
  if (!expense.category || !expense.amount || expense.amount <= 0) {
    throw new Error('Expense must have a valid category and positive amount');
  }
  return [...expenses, { ...expense, id: Date.now(), createdAt: new Date().toISOString() }];
}

/**
 * Calculates total expenses from an array
 * @param {Array} expenses - Array of expense objects
 * @returns {number} Total expenses
 */
function getTotalExpenses(expenses) {
  if (!Array.isArray(expenses)) throw new Error('Expenses must be an array');
  return expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
}

/**
 * Groups expenses by category and returns totals
 * @param {Array} expenses - Array of expense objects
 * @returns {object} Grouped expenses by category
 */
function getExpensesByCategory(expenses) {
  if (!Array.isArray(expenses)) throw new Error('Expenses must be an array');
  return expenses.reduce((groups, expense) => {
    const key = expense.category || 'Uncategorized';
    groups[key] = (groups[key] || 0) + expense.amount;
    return groups;
  }, {});
}

/**
 * Filters expenses above a given threshold
 * @param {Array} expenses - Array of expense objects
 * @param {number} threshold - Minimum amount
 * @returns {Array} Filtered expenses
 */
function filterExpensesByAmount(expenses, threshold) {
  if (!Array.isArray(expenses)) throw new Error('Expenses must be an array');
  if (typeof threshold !== 'number') throw new Error('Threshold must be a number');
  return expenses.filter(e => e.amount >= threshold);
}

module.exports = { addExpense, getTotalExpenses, getExpensesByCategory, filterExpensesByAmount };
