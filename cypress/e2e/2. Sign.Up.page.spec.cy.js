/// <reference types="cypress" />

const { generateUser } = require('../support/ganagate.users');


describe('Sign Up page', () => {

  // Кнопка для регестрації
  const btnSingUp = 'btn.btn-lg.btn-primary.pull-xs-right'
  // Помилка при невірному паролі
  const ErrorTextForPassword = 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.'
  // Вдала регістрація
  const successfulReg = 'Your registration was successful!'
  // Помилка при невірному паролі
  const ErrorTextForEmain = 'Email must be a valid email.'
  // Змінні для створеня користувача
  let email, username, password;

  beforeEach(() => {
    cy.visit('/register');
    const userData = generateUser();
    email = userData.email;
    username = userData.username;
    password = userData.password;  
  
  });


  it('should successfully register a new user', () => {

    cy.findH1ByText('Sign up');
    cy.findByPlaceholder('Username').type(username);

    cy.findByPlaceholder('Email').type(email);

    cy.findByPlaceholder('Password').type(password);

    cy.clickButWithClass(btnSingUp);

    cy.checkSwalText(successfulReg);

    cy.get('button.swal-button.swal-button--confirm').click();

    cy.customCheckUserLoggedIn(username)

  });

  it('should not allow user to register with a password without numbers', () => {

    cy.findH1ByText('Sign up');

    cy.findByPlaceholder('Username').type(username);

    cy.findByPlaceholder('Email').type(email);

    cy.findByPlaceholder('Password').type(password.replace(/\d/g, ''));

    cy.clickButWithClass(btnSingUp);

    cy.checkSwalText(ErrorTextForPassword);
  });

  it('Registration should fail if there is no uppercase letter in the password', () => {

    cy.findH1ByText('Sign up');

    cy.findByPlaceholder('Username').type(username);

    cy.findByPlaceholder('Email').type(email);

    cy.findByPlaceholder('Password').type(password.toLowerCase());

    cy.clickButWithClass(btnSingUp);

    cy.checkSwalText(ErrorTextForPassword);
  });

  it('Registration should fail with a very short password', () => {

    cy.findH1ByText('Sign up');

    cy.findByPlaceholder('Username').type(username);

    cy.findByPlaceholder('Email').type(email);

    cy.findByPlaceholder('Password').type(password.substring(0, 2));

    cy.clickButWithClass(btnSingUp);

    cy.checkSwalText(ErrorTextForPassword);
  });

  it('Registration should fail without at least 1 lowercase letter in the password', () => {

    cy.findH1ByText('Sign up');

    cy.findByPlaceholder('Username').type(username);

    cy.findByPlaceholder('Email').type(email);

    cy.findByPlaceholder('Password').type(password.toUpperCase());

    cy.clickButWithClass(btnSingUp);

    cy.checkSwalText(ErrorTextForPassword);
  });

  it('Should not allow registration with the same email', () => {

    cy.registerNewUser().then(({ email, username, password }) => {

      cy.findByPlaceholder('Username').type(username);

      cy.findByPlaceholder('Email').type(email);

      cy.findByPlaceholder('Password').type(password + `{enter}`);

      cy.checkSwalText('Email already taken.');
    });
    // Без then тест валиться, як розумію не виходить переотримати данні вже зареєстрованного користувача
    
  });

  it('can`t register user with email without @ symbol', () => {

    cy.findH1ByText('Sign up');

    cy.findByPlaceholder('Username').type(username);

    cy.findByPlaceholder('Email').type('email.com.ua');

    cy.findByPlaceholder('Password').type(password);

    cy.clickButWithClass(btnSingUp);

    cy.checkSwalText(ErrorTextForEmain);
  });

  it('should not register USER without email', () => {

    cy.findByPlaceholder('Username').type(username);

    cy.findByPlaceholder('Password').type(password);

    cy.clickButWithClass(btnSingUp);

    cy.checkSwalText('Email field required.');
  });

  it('should not register USER without username', () => {

    cy.findByPlaceholder('Email').type(email);

    cy.findByPlaceholder('Password').type(password);

    cy.clickButWithClass(btnSingUp);


    cy.checkSwalText('Username field required.');
  });

  it('should not register USER without password', () => {

    cy.findByPlaceholder('Email').type(email);

    cy.findByPlaceholder('Username').type(username);

    cy.clickButWithClass(btnSingUp);


    cy.checkSwalText('Password field required.');
  });

});


