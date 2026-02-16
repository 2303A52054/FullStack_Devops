// ***********************************************
// Custom Cypress Commands for Finance Tracker E2E Tests
// ***********************************************

const API_URL = Cypress.env('API_URL') || 'http://localhost:5000';

/**
 * Reset the backend database to a known state before each test
 */
Cypress.Commands.add('resetDatabase', () => {
  cy.request('POST', `${API_URL}/api/reset`).then((response) => {
    expect(response.status).to.eq(200);
    cy.log('Database reset to default state');
  });
});

/**
 * Navigate to a page via the nav bar
 */
Cypress.Commands.add('navigateTo', (page) => {
  cy.get(`[data-cy="nav-${page}"]`).click();
});

/**
 * Add an expense via the UI form
 */
Cypress.Commands.add('addExpense', ({ category, amount, description, date }) => {
  cy.get('[data-cy="nav-expenses"]').click();
  cy.get('[data-cy="expense-category"]').select(category);
  cy.get('[data-cy="expense-amount"]').clear().type(String(amount));
  if (description) cy.get('[data-cy="expense-description"]').clear().type(description);
  if (date) cy.get('[data-cy="expense-date"]').clear().type(date);
  cy.get('[data-cy="expense-submit"]').click();
});

/**
 * Add an income record via the UI form
 */
Cypress.Commands.add('addIncome', ({ category, amount, description, date }) => {
  cy.get('[data-cy="nav-income"]').click();
  cy.get('[data-cy="income-category"]').select(category);
  cy.get('[data-cy="income-amount"]').clear().type(String(amount));
  if (description) cy.get('[data-cy="income-description"]').clear().type(description);
  if (date) cy.get('[data-cy="income-date"]').clear().type(date);
  cy.get('[data-cy="income-submit"]').click();
});

/**
 * Wait for the backend API to be ready
 */
Cypress.Commands.add('waitForBackend', () => {
  cy.request({ url: `${API_URL}/api/health`, retryOnStatusCodeFailure: true, timeout: 30000 })
    .its('status')
    .should('eq', 200);
});

/**
 * Verify dashboard summary values
 */
Cypress.Commands.add('verifyDashboardSummary', ({ income, expenses, balance }) => {
  cy.get('[data-cy="nav-dashboard"]').click();
  cy.get('[data-cy="summary-grid"]').should('be.visible');
  if (income !== undefined) {
    cy.get('[data-cy="total-income"]').should('contain', income.toFixed(2));
  }
  if (expenses !== undefined) {
    cy.get('[data-cy="total-expenses"]').should('contain', expenses.toFixed(2));
  }
  if (balance !== undefined) {
    cy.get('[data-cy="net-balance"]').should('contain', balance.toFixed(2));
  }
});
