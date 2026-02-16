// ============================================================
// Test Suite 2: Add New Expense & Verify in List
// ============================================================

describe('Expenses - Add New Expense and Verify in List', () => {
  before(() => {
    cy.waitForBackend();
  });

  beforeEach(() => {
    cy.resetDatabase();
    cy.visit('/');
    cy.get('[data-cy="nav-expenses"]').click();
    cy.get('[data-cy="expenses-page"]').should('be.visible');
  });

  it('should display the expense form with all required fields', () => {
    cy.get('[data-cy="expense-form"]').should('be.visible');
    cy.get('[data-cy="expense-category"]').should('be.visible');
    cy.get('[data-cy="expense-amount"]').should('be.visible');
    cy.get('[data-cy="expense-description"]').should('be.visible');
    cy.get('[data-cy="expense-date"]').should('be.visible');
    cy.get('[data-cy="expense-submit"]').should('be.visible');
  });

  it('should load existing expenses from the backend on page load', () => {
    cy.get('[data-cy="expenses-table"]').should('be.visible');
    cy.get('[data-cy="expenses-table"] tbody tr').should('have.length.at.least', 1);
  });

  it('should add a new expense and display it in the list immediately', () => {
    cy.fixture('transactions').then((data) => {
      const { expense } = data;

      // Get initial expense count
      cy.get('[data-cy="expenses-table"] tbody tr').then(($rows) => {
        const initialCount = $rows.length;

        // Fill and submit the form
        cy.get('[data-cy="expense-category"]').select(expense.category);
        cy.get('[data-cy="expense-amount"]').clear().type(expense.amount);
        cy.get('[data-cy="expense-description"]').clear().type(expense.description);
        cy.get('[data-cy="expense-date"]').clear().type(expense.date);
        cy.get('[data-cy="expense-submit"]').click();

        // Verify success message
        cy.get('[data-cy="expense-success"]').should('contain', 'Expense added successfully');

        // Verify expense count increased
        cy.get('[data-cy="expenses-table"] tbody tr').should('have.length', initialCount + 1);

        // Verify the new expense appears with correct details
        cy.get('[data-cy="expenses-table"] tbody tr').last().within(() => {
          cy.contains(expense.category).should('be.visible');
          cy.contains(expense.description).should('be.visible');
          cy.contains(expense.amount.toFixed(2)).should('be.visible');
        });
      });
    });
  });

  it('should persist the new expense in the backend after submission', () => {
    cy.fixture('transactions').then((data) => {
      const { expense } = data;

      cy.get('[data-cy="expense-category"]').select(expense.category);
      cy.get('[data-cy="expense-amount"]').clear().type(expense.amount);
      cy.get('[data-cy="expense-description"]').clear().type(expense.description);
      cy.get('[data-cy="expense-submit"]').click();

      cy.get('[data-cy="expense-success"]').should('be.visible');

      // Verify backend received the data
      cy.request('GET', `${Cypress.env('API_URL')}/api/transactions`).then((response) => {
        const expenses = response.body.filter(t => t.type === 'expense');
        const newExpense = expenses.find(e => e.description === expense.description);
        expect(newExpense).to.exist;
        expect(newExpense.amount).to.eq(expense.amount);
        expect(newExpense.category).to.eq(expense.category);
      });
    });
  });

  it('should show validation error for invalid amount', () => {
    cy.get('[data-cy="expense-amount"]').clear().type('-50');
    cy.get('[data-cy="expense-submit"]').click();
    cy.get('[data-cy="expense-error"]').should('contain', 'valid positive amount');
  });

  it('should show validation error for empty amount', () => {
    cy.get('[data-cy="expense-amount"]').clear();
    cy.get('[data-cy="expense-submit"]').click();
    cy.get('[data-cy="expense-error"]').should('contain', 'valid positive amount');
  });

  it('should allow adding multiple expenses and all appear in the list', () => {
    cy.fixture('transactions').then((data) => {
      const expenses = [data.expense, data.largeExpense];
      const initialCountHolder = {};

      cy.get('[data-cy="expenses-table"] tbody tr').then(($rows) => {
        initialCountHolder.count = $rows.length;
      });

      expenses.forEach((exp) => {
        cy.get('[data-cy="expense-category"]').select(exp.category);
        cy.get('[data-cy="expense-amount"]').clear().type(exp.amount);
        cy.get('[data-cy="expense-description"]').clear().type(exp.description);
        cy.get('[data-cy="expense-submit"]').click();
        cy.get('[data-cy="expense-success"]').should('be.visible');
      });

      cy.get('[data-cy="expenses-table"] tbody tr').should('have.length.at.least', initialCountHolder.count + 2);
    });
  });

  it('should delete an expense and remove it from the list', () => {
    // First add an expense to delete
    cy.get('[data-cy="expense-category"]').select('Shopping');
    cy.get('[data-cy="expense-amount"]').clear().type('25');
    cy.get('[data-cy="expense-description"]').clear().type('Test delete expense');
    cy.get('[data-cy="expense-submit"]').click();
    cy.get('[data-cy="expense-success"]').should('be.visible');

    // Get count after adding
    cy.get('[data-cy="expenses-table"] tbody tr').then(($rows) => {
      const countAfterAdd = $rows.length;

      // Click delete on the last row
      cy.get('[data-cy="expenses-table"] tbody tr').last().within(() => {
        cy.get('button').contains('Delete').click();
      });

      // Verify count decreased
      cy.get('[data-cy="expenses-table"] tbody tr').should('have.length', countAfterAdd - 1);
    });
  });
});
