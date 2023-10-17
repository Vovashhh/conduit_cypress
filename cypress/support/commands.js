// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { generateUser } from '../support/ganagate.users';

Cypress.Commands.add('registerNewUser', () => {
  const { email, username, password } = generateUser();
  cy.request('POST', '/users', {
    email,
    password,
    username,
  }).then((response) => ({
    ...response.body.user,
    password,
  }));
});

Cypress.Commands.add('login', (user) => {
  cy.request('POST', 'users/login', {
    user,
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('registerAndLogin', () => {
  cy.registerNewUser().then((user) => {
    cy.login(user).then(() => user);
  });
});


Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('findH1ByText', (text) => {
  cy.get('h1').should('contain.text', text);
});

Cypress.Commands.add('checkSwalText', (text) => {
  cy.get('.swal-text').should('contain.text', text);
});

Cypress.Commands.add('clickButWithClass', (className) => {
  cy.get(`.${className}`).click();
});

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  originalFn('/#' + url);
});

Cypress.Commands.add('assertPageUrl', (url) => {
  cy.url().should('equal', Cypress.config().baseUrl + url);
});


Cypress.Commands.add('findByCss', (selector) => {
  cy.get(selector);
});

Cypress.Commands.add('customCheckUserLoggedIn', (username) => {
  cy.get(':nth-child(4) > .nav-link').should('contain.text', username);

  cy.assertPageUrl('/#/');

  cy.get('a.nav-link.router-link-exact-active.active').should('be.visible');
});

Cypress.Commands.add('checkUpdateSuccessfulAlert', () => {
  cy.get('.swal-title').and('contain', 'Update successful!');
});

Cypress.Commands.add('checkTextareaPlaceholder', (placeholder, expectedText) => {
  cy.get(`textarea[placeholder="${placeholder}"]`).should('have.value', expectedText);
});

Cypress.Commands.add('findByPlaceholderAndCheckValue', (placeholder, expectedValue) => {
  cy.findByPlaceholder(placeholder)
    .should('have.value', expectedValue);
});

Cypress.Commands.add('clickSubmitButton', () => {
  cy.get('button[type="submit"].btn.btn-lg.pull-xs-right.btn-primary')
      .click();
});

Cypress.Commands.add('checkSwalTitle', () => {
  cy.get('.swal-title').should('contain', 'Oops!');
});



//точно всі команди, які прописані тут, ти використовуєш?
//якщо так, то ок. Якщо ні, то видали зайві команди