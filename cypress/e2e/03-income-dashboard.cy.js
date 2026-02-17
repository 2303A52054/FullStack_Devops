// ============================================================
// Test Suite 3: Add Income & Verify Dashboard Reflection
// ============================================================

describe('Income - Add Income and Verify Dashboard Reflection', () => {
  before(() => {
    cy.waitForBackend();
  });

  beforeEach(() => {
    cy.resetDatabase();
    cy.visit('/');
  });

  it('should display the income page with form and history', () => {
    cy.get('[data-cy="nav-income"]').click();
    cy.get('[data-cy="income-page"]').should('be.visible');
    cy.get('[data-cy="income-form"]').should('be.visible');
    cy.get('[data-cy="income-table"]').should('be.visible');
  });

  it('should add a new income record and display it in the income list', () => {
    cy.get('[data-cy="nav-income"]').click();

    cy.fixture('transactions').then((data) => {
      const { income } = data;

      cy.get('[data-cy="income-table"] tbody tr').then(($rows) => {
        const initialCount = $rows.length;

        cy.get('[data-cy="income-category"]').select(income.category);
        cy.get('[data-cy="income-amount"]').clear().type(income.amount);
        cy.get('[data-cy="income-description"]').clear().type(income.description);
        cy.get('[data-cy="income-date"]').clear().type(income.date);
        cy.get('[data-cy="income-submit"]').click();

        cy.get('[data-cy="income-success"]').should('contain', 'Income record added successfully');

        cy.get('[data-cy="income-table"] tbody tr').should('have.length', initialCount + 1);

        cy.get('[data-cy="income-table"] tbody tr').last().within(() => {
          cy.contains(income.category).should('be.visible');
          cy.contains(income.description).should('be.visible');
          cy.contains(income.amount.toFixed(2)).should('be.visible');
        });
      });
    });
  });

  it('should reflect new income on the Dashboard total income card', () => {
    // Record baseline dashboard values
    cy.get('[data-cy="dashboard-page"]').should('be.visible');

    cy.get('[data-cy="total-income"]').invoke('text').then((baselineText) => {
      const baseline = parseFloat(baselineText.replace('$', ''));

      // Add income
      cy.fixture('transactions').then((data) => {
        const { income } = data;

        cy.get('[data-cy="nav-income"]').click();
        cy.get('[data-cy="income-category"]').select(income.category);
        cy.get('[data-cy="income-amount"]').clear().type(income.amount);
        cy.get('[data-cy="income-description"]').clear().type(income.description);
        cy.get('[data-cy="income-submit"]').click();
        cy.get('[data-cy="income-success"]').should('be.visible');

        // Navigate to dashboard and check updated values
        cy.get('[data-cy="nav-dashboard"]').click();
        cy.get('[data-cy="summary-grid"]').should('be.visible');

        const expectedIncome = baseline + income.amount;
        cy.get('[data-cy="total-income"]').should('contain', expectedIncome.toFixed(2));
      });
    });
  });

  it('should reflect new income on the Dashboard net balance', () => {
    cy.get('[data-cy="net-balance"]').invoke('text').then((baselineText) => {
      const baseline = parseFloat(baselineText.replace('$', ''));

      cy.fixture('transactions').then((data) => {
        const { income } = data;

        cy.get('[data-cy="nav-income"]').click();
        cy.get('[data-cy="income-category"]').select(income.category);
        cy.get('[data-cy="income-amount"]').clear().type(income.amount);
        cy.get('[data-cy="income-description"]').clear().type(income.description);
        cy.get('[data-cy="income-submit"]').click();
        cy.get('[data-cy="income-success"]').should('be.visible');

        cy.get('[data-cy="nav-dashboard"]').click();
        cy.get('[data-cy="summary-grid"]').should('be.visible');

        const expectedBalance = baseline + income.amount;
        cy.get('[data-cy="net-balance"]').should('contain', expectedBalance.toFixed(2));
      });
    });
  });

  it('should show the new income in the Dashboard recent transactions table', () => {
    cy.fixture('transactions').then((data) => {
      const { income } = data;

      cy.get('[data-cy="nav-income"]').click();
      cy.get('[data-cy="income-category"]').select(income.category);
      cy.get('[data-cy="income-amount"]').clear().type(income.amount);
      cy.get('[data-cy="income-description"]').clear().type(income.description);
      cy.get('[data-cy="income-submit"]').click();
      cy.get('[data-cy="income-success"]').should('be.visible');

      cy.get('[data-cy="nav-dashboard"]').click();
      cy.get('[data-cy="recent-transactions-table"]').should('be.visible');
      cy.get('[data-cy="recent-transactions-table"]').should('contain', income.description);
    });
  });

  it('should update transaction count on dashboard after adding income', () => {
    cy.get('[data-cy="dashboard-page"]').should('be.visible');

    cy.get('[data-cy="transaction-count"]').invoke('text').then((baselineText) => {
      const baseline = parseInt(baselineText, 10);

      cy.fixture('transactions').then((data) => {
        cy.get('[data-cy="nav-income"]').click();
        cy.get('[data-cy="income-category"]').select(data.income.category);
        cy.get('[data-cy="income-amount"]').clear().type(data.income.amount);
        cy.get('[data-cy="income-submit"]').click();
        cy.get('[data-cy="income-success"]').should('be.visible');

        cy.get('[data-cy="nav-dashboard"]').click();
        cy.get('[data-cy="transaction-count"]').should('contain', String(baseline + 1));
      });
    });
  });

  it('should persist income in backend and be retrievable via API', () => {
    cy.fixture('transactions').then((data) => {
      const { income } = data;

      cy.get('[data-cy="nav-income"]').click();
      cy.get('[data-cy="income-category"]').select(income.category);
      cy.get('[data-cy="income-amount"]').clear().type(income.amount);
      cy.get('[data-cy="income-description"]').clear().type(income.description);
      cy.get('[data-cy="income-submit"]').click();
      cy.get('[data-cy="income-success"]').should('be.visible');

      cy.request('GET', `${Cypress.env('API_URL')}/api/transactions`).then((response) => {
        const incomes = response.body.filter(t => t.type === 'income');
        const newIncome = incomes.find(i => i.description === income.description);
        expect(newIncome).to.exist;
        expect(newIncome.amount).to.eq(income.amount);
        expect(newIncome.category).to.eq(income.category);
      });
    });
  });

  it('should validate income form - reject empty amount', () => {
    cy.get('[data-cy="nav-income"]').click();
    cy.get('[data-cy="income-amount"]').clear();
    cy.get('[data-cy="income-submit"]').click();
    cy.get('[data-cy="income-error"]').should('contain', 'valid positive amount');
  });
});
