/// <reference types="cypress" />
import { generateUser } from '../support/ganagate.users';

const user = generateUser(); 
// кращого селектора не бачу https://prnt.sc/u__0PKkoRbg7
const swal4FailUserName = 'Username field required.'
const successfulBtn = 'swal-button--confirm'
const logOutBtn = 'btn.btn-outline-danger'


describe('Settings Page', () => {
  beforeEach(() => {
    cy.registerAndLogin().as('user');
    cy.visit('/settings');
  });

  const updateSettings = 'btn.btn-lg.btn-primary.pull-xs-right';




  it('Should display the username input with pre-filled value and correct title name', function () {
    
    cy.findByPlaceholderAndCheckValue('Your username', this.user.username)
    cy.findH1ByText('Your Settings');
  });

  it('Should display the email input with pre-filled value and correct title name', function () {
    
    cy.findByPlaceholderAndCheckValue('Email', this.user.email)
    cy.findH1ByText('Your Settings');
  });

  it('Should not display the password input with pre-filled value and correct title name', function () {
    
    cy.findByPlaceholderAndCheckValue('Password', '')
    cy.findH1ByText('Your Settings');
  });

  it('Should update username', () => {

    cy.findByPlaceholder('Your username').clear().type(user.username)
    cy.clickButWithClass(updateSettings)
    cy.get('.swal-title').contains('Update successful!');


  })

}); 