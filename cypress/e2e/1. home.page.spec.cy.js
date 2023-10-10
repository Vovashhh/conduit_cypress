/// <reference types="cypress" />

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Checking visible elements for non-logged in users', () => {
    // Перевірка елементів сторінки
    cy.contains('a', 'Global Feed').should('be.visible');
    cy.contains('.sidebar', 'Popular Tags').should('be.visible');
    // Перевірка переходу на вхід
    cy.contains('a', 'Sign in').click();
    cy.assertPageUrl('/#/login');
    cy.findH1ByText('Sign in');
    // Перевірка переходу на регестрацію
    cy.contains('a', 'Sign up').click();
    cy.assertPageUrl('/#/register');
    cy.findH1ByText('Sign up');

  });

  it('Checking visible elements for log in users', () => {

  })

});

// зробити різницю з логін та нелогін користувачем 