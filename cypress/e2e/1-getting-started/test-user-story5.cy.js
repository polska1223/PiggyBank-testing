describe('PiggyBank - User Stories', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.contains('Sophie').click();
  });

  it('User Story 2 - Sophie maakt 20 euro over naar Melvin', () => {
    cy.contains('Overboeken').click();

    cy.get('select').eq(0).should('contain', 'Sophie');
    cy.get('select').eq(1).select('Melvin Webster');
    cy.get('select').eq(2).select('€');

    cy.get('input').clear().type('20');
    cy.get('textarea').clear().type('Overboeking');

    cy.contains('button', 'Overboeken').click();
  });

  it('User Story 3 - Sophie maakt geld over met een omschrijving', () => {
    cy.contains('Overboeken').click();

    cy.get('select').eq(0).should('contain', 'Sophie');
    cy.get('select').eq(1).select('Melvin Webster');
    cy.get('select').eq(2).select('€');

    cy.get('input').clear().type('20');
    cy.get('textarea').clear().type('Cadeau');

    cy.contains('button', 'Overboeken').click();

  });

  it('User Story 4 - Sophie maakt geld over zonder omschrijving', () => {
    cy.contains('Overboeken').click();

    cy.get('select').eq(0).should('contain', 'Sophie');
    cy.get('select').eq(1).select('Melvin Webster');
    cy.get('select').eq(2).select('€');

    cy.get('input').clear().type('20');

    cy.contains('button', 'Overboeken').click();
  });

  it('User Story 5 - Sophie mag niet meer overmaken dan haar saldo', () => {
    cy.contains('Overboeken').click();

    cy.get('select').eq(0).should('contain', 'Sophie');
    cy.get('select').eq(1).select('Melvin Webster');
    cy.get('select').eq(2).select('€');

    cy.get('input').clear().type('1000');
    cy.get('textarea').clear().type('Overboeking');

    cy.contains('button', 'Overboeken').click();

  });

  it('User Story 8 - Sophie kan haar transacties bekijken', () => {
    cy.contains('Transacties').click();

    cy.url().should('include', 'transactions');
    cy.contains('Transacties').should('be.visible');
  });

});