/// <reference types="cypress" />
import { generateArticle } from '../support/ganerate.articles';

describe('Articless page', () => {
  beforeEach(() => {
    cy.registerAndLogin();
    cy.visit('/editor');
  });
  const { title, description, article, extraLongArticle } = generateArticle();

  it('Should allow creating a new article', () => {
    const expectedSlug = title
        .toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');

    cy.findByPlaceholder('Article Title').type(title)
    cy.findByPlaceholder('What\'s this article about?').type(description)
    cy.findByPlaceholder('Write your article (in markdown)').type(article)

    cy.clickSubmitButton()

    cy.assertPageUrl(`/#/articles/${expectedSlug}`);
    cy.findH1ByText(title)
    cy.checkTextInDiv(article)
    cy.visit('/')
    cy.checkTextOnPage(description)
  });

  it('Should allow creating a new article with long article', () => {
    const expectedSlug = title
        .toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');

    cy.findByPlaceholder('Article Title').type(title)
    cy.findByPlaceholder('What\'s this article about?').type(description)
    cy.findByPlaceholder('Write your article (in markdown)').type(extraLongArticle)

    cy.clickSubmitButton()

    cy.assertPageUrl(`/#/articles/${expectedSlug}`);

  })

  it('shouldn`t add article without article ', () => {

    cy.findByPlaceholder('What\'s this article about?').type(description)
    cy.findByPlaceholder('Write your article (in markdown)').type(article)

    cy.clickSubmitButton()
    cy.checkSwalTitle();

  });

  it('shouldn`t add article without description  ', () => {

    cy.findByPlaceholder('Article Title').type(title)
    cy.findByPlaceholder('Write your article (in markdown)').type(article)

    cy.clickSubmitButton()
    cy.checkSwalTitle();

  });

  it('shouldn`t add article without article  ', () => {

    cy.findByPlaceholder('Article Title').type(title)
    cy.findByPlaceholder('What\'s this article about?').type(description)

    cy.clickSubmitButton()
    cy.checkSwalTitle();

  });


});


//більше тестів, наприклад, на створення коменту, видалення коменту, редагування коменту,

// Тут баг с тегами, по этому не знаю как добавить проверку что они добавляются


