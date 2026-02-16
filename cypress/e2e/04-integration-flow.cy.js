// ============================================================
// Test Suite 4: Full E2E Integration Flow
// ============================================================

describe('Full Integration Flow - UI to Backend Data Persistence', () => {
  before(() => {
    cy.waitForBackend();
  });

  beforeEach(() => {
    cy.resetDatabase();
    cy.visit('/');
  });

  it('should complete a full financial tracking workflow', () => {
    // Step 1: Verify initial dashboard state
    cy.get('[data-cy="dashboard-page"]').should('be.visible');
    cy.get('[data-cy="total-income"]').should('contain', '3000.00');
    cy.get('[data-cy="total-expenses"]').should('contain', '230.00');
    cy.get('[data-cy="net-balance"]').should('contain', '2770.00');

    // Step 2: Add a new income record
    cy.addIncome({ category: 'Freelance', amount: 500, description: 'E2E Test Income' });
    cy.get('[data-cy="income-success"]').should('be.visible');

    // Step 3: Add a new expense
    cy.addExpense({ category: 'Transport', amount: 45, description: 'E2E Test Expense' });
    cy.get('[data-cy="expense-success"]').should('be.visible');

    // Step 4: Navigate to dashboard and verify updated totals
    cy.navigateTo('dashboard');
    cy.get('[data-cy="total-income"]').should('contain', '3500.00');   // 3000 + 500
    cy.get('[data-cy="total-expenses"]').should('contain', '275.00');  // 230 + 45
    cy.get('[data-cy="net-balance"]').should('contain', '3225.00');    // 3500 - 275
    cy.get('[data-cy="transaction-count"]').should('contain', '5');    // 3 + 1 + 1

    // Step 5: Verify via All Transactions page
    cy.navigateTo('transactions');
    cy.get('[data-cy="all-transactions-table"] tbody tr').should('have.length', 5);
    cy.get('[data-cy="all-transactions-table"]').should('contain', 'E2E Test Income');
    cy.get('[data-cy="all-transactions-table"]').should('contain', 'E2E Test Expense');
  });

  it('should validate data consistency between UI and API at each step', () => {
    // Get API baseline
    cy.request('GET', `${Cypress.env('API_URL')}/api/summary`).then((summaryRes) => {
      const initial = summaryRes.body;

      // Add income via UI
      cy.addIncome({ category: 'Bonus', amount: 250, description: 'Consistency Check Income' });
      cy.get('[data-cy="income-success"]').should('be.visible');

      // Verify API reflects the change
      cy.request('GET', `${Cypress.env('API_URL')}/api/summary`).then((afterIncomeRes) => {
        expect(afterIncomeRes.body.totalIncome).to.eq(initial.totalIncome + 250);
        expect(afterIncomeRes.body.balance).to.eq(initial.balance + 250);
      });

      // Add expense via UI
      cy.addExpense({ category: 'Entertainment', amount: 30, description: 'Consistency Check Expense' });
      cy.get('[data-cy="expense-success"]').should('be.visible');

      // Verify API reflects the expense
      cy.request('GET', `${Cypress.env('API_URL')}/api/summary`).then((afterExpenseRes) => {
        expect(afterExpenseRes.body.totalExpenses).to.eq(initial.totalExpenses + 30);
        expect(afterExpenseRes.body.balance).to.eq(initial.balance + 250 - 30);
      });
    });
  });

  it('should filter transactions correctly on the transactions page', () => {
    // Add mixed transactions
    cy.addIncome({ category: 'Salary', amount: 1000, description: 'Filter Test Income' });
    cy.get('[data-cy="income-success"]').should('be.visible');
    cy.addExpense({ category: 'Food', amount: 50, description: 'Filter Test Expense' });
    cy.get('[data-cy="expense-success"]').should('be.visible');

    cy.navigateTo('transactions');

    // All filter
    cy.get('[data-cy="filter-all"]').click();
    cy.get('[data-cy="all-transactions-table"] tbody tr').should('have.length.at.least', 5);

    // Income filter
    cy.get('[data-cy="filter-income"]').click();
    cy.get('[data-cy="all-transactions-table"] tbody tr').each(($row) => {
      cy.wrap($row).find('.badge-income').should('exist');
    });

    // Expense filter
    cy.get('[data-cy="filter-expense"]').click();
    cy.get('[data-cy="all-transactions-table"] tbody tr').each(($row) => {
      cy.wrap($row).find('.badge-expense').should('exist');
    });
  });

  it('should handle adding a large amount income and correctly update balance', () => {
    cy.get('[data-cy="net-balance"]').invoke('text').then((baseText) => {
      const baseBalance = parseFloat(baseText.replace('$', ''));

      cy.addIncome({ category: 'Investment', amount: 10000, description: 'Large Investment Return' });
      cy.get('[data-cy="income-success"]').should('be.visible');

      cy.navigateTo('dashboard');
      cy.get('[data-cy="net-balance"]').should('contain', (baseBalance + 10000).toFixed(2));
    });
  });

  it('should verify the health endpoint is accessible', () => {
    cy.request('GET', `${Cypress.env('API_URL')}/api/health`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.status).to.eq('ok');
    });
  });

  it('should handle the full CRUD cycle for a transaction', () => {
    cy.addExpense({ category: 'Other', amount: 99, description: 'CRUD Test Transaction' });
    cy.get('[data-cy="expense-success"]').should('be.visible');

    // Verify it appears
    cy.get('[data-cy="expenses-table"]').should('contain', 'CRUD Test Transaction');

    // Delete it
    cy.get('[data-cy="expenses-table"] tbody tr').last().within(() => {
      cy.get('button').contains('Delete').click();
    });

    // Verify it's gone
    cy.get('[data-cy="expenses-table"]').should('not.contain', 'CRUD Test Transaction');

    // Verify dashboard updated
    cy.navigateTo('dashboard');
    cy.get('[data-cy="transaction-count"]').should('contain', '3');
  });
});
