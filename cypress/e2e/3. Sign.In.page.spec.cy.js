/// <reference types="cypress" />

  const { generateUser } = require('../support/ganagate.users');

describe('Sign In Page', () => {

  let email, username, password;

  // Текст помилки для невірних данних логіну
  const ErrorInvalidData = 'Invalid user credentials.'
  const LogInBtn = 'btn btn-lg btn-primary pull-xs-right'

  beforeEach(() => {
    cy.visit('/login');
    cy.registerNewUser().then((userData) => {
      email = userData.email;
      username = userData.username;
      password = userData.password;
    });
  });

  it('should allow to log in with click button ', () => {
    cy.findH1ByText('Sign in');
    
      cy.findByPlaceholder('Email').type(email);
      cy.findByPlaceholder('Password').type(password);

      cy.clickButWithClass('btn');
      cy.customCheckUserLoggedIn(username)

  
  });


  it('should not log in without an Email', () => {
    cy.findH1ByText('Sign in');

      cy.findByPlaceholder('Password').type(password);
      cy.clickButWithClass('btn');

      cy.checkSwalText('Email field required.');

  });

  it('should not log in without a Password', () => {
    cy.findH1ByText('Sign in');

      cy.findByPlaceholder('Email').type(email + `{Enter}`);

      cy.checkSwalText('Password field required.');

  });

  it('should not log in with an incorrect Email', () => {
    cy.findH1ByText('Sign in');

      cy.findByPlaceholder('Email').type(email + 'g');

      cy.findByPlaceholder('Password').type(password + `{Enter}`);

      cy.checkSwalText(ErrorInvalidData);

  });

  it('should not log in with an incorrect Password', () => {
    cy.findH1ByText('Sign in');

      cy.findByPlaceholder('Email').type(email);

      cy.findByPlaceholder('Password').type(password + `f` + `{Enter}`);

      cy.checkSwalText(ErrorInvalidData);

  });
});
