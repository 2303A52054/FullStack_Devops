// income/index.js
// Personal Finance Tracker - Income Module

/**
 * Adds a new income record
 * @param {Array} incomes - Existing income array
 * @param {object} income - New income { source, amount, description }
 * @returns {Array} Updated income array
 */
function addIncome(incomes, income) {
  if (!income.source || !income.amount || income.amount <= 0) {
    throw new Error('Income must have a valid source and positive amount');
  }
  return [...incomes, { ...income, id: Date.now(), createdAt: new Date().toISOString() }];
}

/**
 * Calculates total income from an array
 * @param {Array} incomes - Array of income objects
 * @returns {number} Total income
 */
function getTotalIncome(incomes) {
  if (!Array.isArray(incomes)) throw new Error('Incomes must be an array');
  return incomes.reduce((sum, i) => sum + (i.amount || 0), 0);
}

/**
 * Groups income records by source
 * @param {Array} incomes - Array of income objects
 * @returns {object} Grouped income by source
 */
function getIncomeBySource(incomes) {
  if (!Array.isArray(incomes)) throw new Error('Incomes must be an array');
  return incomes.reduce((groups, income) => {
    const key = income.source || 'Unknown';
    groups[key] = (groups[key] || 0) + income.amount;
    return groups;
  }, {});
}

/**
 * Projects annual income based on current monthly data
 * @param {number} monthlyIncome - Monthly income amount
 * @returns {number} Projected annual income
 */
function projectAnnualIncome(monthlyIncome) {
  if (typeof monthlyIncome !== 'number' || monthlyIncome < 0) {
    throw new Error('Monthly income must be a non-negative number');
  }
  return parseFloat((monthlyIncome * 12).toFixed(2));
}

module.exports = { addIncome, getTotalIncome, getIncomeBySource, projectAnnualIncome };
