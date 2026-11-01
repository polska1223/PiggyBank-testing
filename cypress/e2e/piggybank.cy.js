describe('PiggyBank - End-to-End tests', () => {
  it('TC01 - Inloggen als Melvin', () => {
    cy.visit('http://localhost:3000/login')
    cy.contains('Melvin').click()
    cy.url().should('eq', 'http://localhost:3000/')
    cy.contains('Melvin').should('be.visible')
  })

  it('TC02 - Rekening van Melvin bekijken', () => {
    cy.visit('http://localhost:3000/login')
    cy.contains('Melvin').click()
    cy.contains('Rekening van Melvin').should('be.visible')
  })

 it('TC03 - Transacties van Melvin bekijken', () => {
  cy.intercept('GET', '**/api/v1/transactions/1*').as('transactions')

  cy.visit('http://localhost:3000/login')
  cy.contains('Melvin').click()

  cy.wait('@transactions').its('response.statusCode').should('eq', 200)
  cy.contains('Rekening van Melvin').should('be.visible')
})

  it('TC04 - Inloggen als Sara', () => {
    cy.visit('http://localhost:3000/login')
    cy.contains('Sara').click()
    cy.url().should('eq', 'http://localhost:3000/')
    cy.contains('Rekening van Sara').should('be.visible')
  })

  it('TC05 - Transacties van Sara ophalen', () => {
    cy.intercept('GET', '**/api/v1/transactions/2*').as('transactions')

    cy.visit('http://localhost:3000/login')
    cy.contains('Sara').click()

    cy.wait('@transactions').its('response.statusCode').should('eq', 200)
    cy.contains('Rekening van Sara').should('be.visible')
  })
  it('TC06 - Niet bestaande pagina openen', () => {
    cy.visit('http://localhost:3000/login')
    cy.contains('Melvin').click()

    cy.visit('http://localhost:3000/pagina-bestaat-niet', {
      failOnStatusCode: false
    })

    cy.url().should('include', '/pagina-bestaat-niet')
  })
it('TC07 - Overboeken zonder ontvanger', () => {
  cy.visit('http://localhost:3000/login')
  cy.contains('Melvin').click()

  cy.contains('Overboeken').click()

  cy.get('input').last().type('10')
  cy.get('textarea').type('Test zonder ontvanger')

  cy.get('select').eq(1).should('have.value', null)

  cy.contains('button', 'Overboeken').click()

  cy.url().should('include', '/transfer')
})

it('TC08 - Negatief bedrag overboeken', () => {
  cy.visit('http://localhost:3000/login')
  cy.contains('Melvin').click()

  cy.contains('Overboeken').click()

  cy.get('select').eq(1).select(1)
  cy.get('input').last().type('-10')

  cy.intercept('POST', '**/api/v1/transactions').as('overboeking')

  cy.contains('button', 'Overboeken').click()

  cy.get('@overboeking.all').then((requests) => {
    expect(requests.length).to.eq(0)
  })

  cy.url().should('include', '/transfer')
})
})