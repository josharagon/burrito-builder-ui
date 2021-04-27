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
      statusCode: 200,
      body: { name: 'Joseph', ingredients: ['beans, steak'] }
    })
    cy.get('input').type('Joseph')
      .get('#beans').click()
      .get('#steak').click()
      .get('#submit-button').click()
    cy.get('section').children().should('have.length', 4)
  })

  describe('Error Handling', () => {
    beforeEach(() => {
      cy.fixture('burritoMock.json')
        .then(orders => {
          cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
            statusCode: 200,
            body: ''
          })
          cy.visit('http://localhost:3000/')
        })
    })
    it('Should have appropriate message if error while fetching orders', () => {
      cy.get('h2').contains('Error fetching orders')
    })

    it('Should warn customer if they have not filled out all fields', () => {
      cy.get('input').type('yomama')
        .get('#submit-button').click()
        .get('h4').contains('Please fill out every input field')
        .get('input').clear()

      cy.get('#beans').click()
        .get('#submit-button').click()
        .get('h4').contains('Please fill out every input field')
    })
  })

  describe('No Orders', () => {
    beforeEach(() => {
      cy.fixture('emptyMock.json')
        .then(orders => {
          cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
            statusCode: 200,
            body: orders
          })
          cy.visit('http://localhost:3000/')
        })
    })

    it('should show appropriate message if no current orders exist', () => {
      cy.get('p').last().contains('No orders yet!')
    })
  })
})