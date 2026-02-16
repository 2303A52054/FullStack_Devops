// ***********************************************************
// This file is processed and loaded automatically before
// your test files. This is a great place to put global
// configuration and behavior that modifies Cypress.
// ***********************************************************

import './commands';

// Disable uncaught exception handling for React dev warnings
Cypress.on('uncaught:exception', (err) => {
  // Returning false here prevents Cypress from failing the test
  if (err.message.includes('ResizeObserver') || err.message.includes('Non-Error')) {
    return false;
  }
  return true;
});

// Log test name before each test
beforeEach(function () {
  cy.log(`Running: ${this.currentTest.fullTitle()}`);
});
