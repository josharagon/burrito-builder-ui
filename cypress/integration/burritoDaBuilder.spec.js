describe('Initial Page View', () => {
  beforeEach(() => {
    cy.fixture('burritoMock.json')
    .then(orders => {
        cy.intercept('GET', 'http://localhost:3003/api/v1/orders', {
            statusCode: 200,
            body: orders
        })
    cy.visit('http://localhost:3000/')
    })
  })
})  