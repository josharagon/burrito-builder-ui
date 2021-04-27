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
})  