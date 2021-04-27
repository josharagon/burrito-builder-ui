describe('Initial Page View', () => {
  beforeEach(() => {
    cy.fixture('burritoMock.json')
    .then(orders => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
            statusCode: 200,
            body: orders
        })
    cy.visit('http://localhost:3000/')
    })
  })

  it('Should Title on page load', () => {
    cy.get('h1').contains('Burrito Builder')
  })

  it('Should show form where customers can create a new order', () => {
    cy.get('form')
  })

  it('Should show pre-existing orders', () => {
    cy.get('section').children().should('have.length', 3)
  })
})  

describe('Placing Orders', () => {
  beforeEach(() => {
    cy.fixture('burritoMock.json')
    .then(orders => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
            statusCode: 200,
            body: orders
        })
    cy.visit('http://localhost:3000/')
    })
  })

  it('Should be able to enter a name and pick ingredients', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
        statusCode:200,
        body: {name: 'Joseph', ingredients: ['beans, steak']}
    })
    cy.get('input').type('Joseph')
    .get('#beans').click()
    .get('#steak').click()
    .get('#submit-button').click()
    cy.get('section').children().should('have.length', 4)
  })
})