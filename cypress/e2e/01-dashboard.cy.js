// ============================================================
// Test Suite 1: Dashboard Navigation & Summary Data Loading
// ============================================================

describe('Dashboard - Navigation and Summary Data', () => {
  before(() => {
    cy.waitForBackend();
  });

  beforeEach(() => {
    cy.resetDatabase();
    cy.visit('/');
  });

  it('should load the application and display the navigation bar', () => {
    cy.get('nav').should('be.visible');
    cy.get('nav h1').should('contain', 'Finance Tracker');
    cy.get('[data-cy="nav-dashboard"]').should('be.visible').and('contain', 'Dashboard');
    cy.get('[data-cy="nav-expenses"]').should('be.visible').and('contain', 'Expenses');
    cy.get('[data-cy="nav-income"]').should('be.visible').and('contain', 'Income');
    cy.get('[data-cy="nav-transactions"]').should('be.visible').and('contain', 'All Transactions');
  });

  it('should navigate to the Dashboard page on load', () => {
    cy.get('[data-cy="dashboard-page"]').should('be.visible');
    cy.get('h2').should('contain', 'Dashboard');
  });

  it('should load and display summary cards with financial data', () => {
    cy.get('[data-cy="summary-grid"]').should('be.visible');

    // Verify all four summary cards are present
    cy.get('[data-cy="total-income-card"]').should('be.visible');
    cy.get('[data-cy="total-expenses-card"]').should('be.visible');
    cy.get('[data-cy="balance-card"]').should('be.visible');
    cy.get('[data-cy="count-card"]').should('be.visible');
  });

  it('should display correct summary values matching backend data', () => {
    // Default data: income=3000, expenses=80+150=230, balance=2770, count=3
    cy.get('[data-cy="total-income"]').should('contain', '3000.00');
    cy.get('[data-cy="total-expenses"]').should('contain', '230.00');
    cy.get('[data-cy="net-balance"]').should('contain', '2770.00');
    cy.get('[data-cy="transaction-count"]').should('contain', '3');
  });

  it('should display the recent transactions table with data', () => {
    cy.get('[data-cy="recent-transactions-table"]').should('be.visible');
    cy.get('[data-cy="recent-transactions-table"] tbody tr').should('have.length.at.least', 1);
  });

  it('should navigate to each page using the nav links', () => {
    // Navigate to Expenses
    cy.get('[data-cy="nav-expenses"]').click();
    cy.get('[data-cy="expenses-page"]').should('be.visible');

    // Navigate to Income
    cy.get('[data-cy="nav-income"]').click();
    cy.get('[data-cy="income-page"]').should('be.visible');

    // Navigate to All Transactions
    cy.get('[data-cy="nav-transactions"]').click();
    cy.get('[data-cy="transactions-page"]').should('be.visible');

    // Navigate back to Dashboard
    cy.get('[data-cy="nav-dashboard"]').click();
    cy.get('[data-cy="dashboard-page"]').should('be.visible');
  });

  it('should reflect API data on dashboard via direct API call verification', () => {
    cy.request('GET', `${Cypress.env('API_URL')}/api/summary`).then((response) => {
      expect(response.status).to.eq(200);
      const { totalIncome, totalExpenses, balance } = response.body;

      cy.get('[data-cy="total-income"]').should('contain', totalIncome.toFixed(2));
      cy.get('[data-cy="total-expenses"]').should('contain', totalExpenses.toFixed(2));
      cy.get('[data-cy="net-balance"]').should('contain', balance.toFixed(2));
    });
  });
});
