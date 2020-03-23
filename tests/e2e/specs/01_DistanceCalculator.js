// https://docs.cypress.io/api/introduction/api.html

describe("Live frontend tests", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "DistC");
    cy.contains("p", "GPS Distance Calculator");
    cy.contains("form");
    cy.get('#input-1').type('48.8589507');
    cy.get('#input-2').type('2.2770209');
    cy.get('#input-3').type('51.5287718');
    cy.get('#input-4').type('-0.2416789');
    cy.get('[for=radio-group-1__BV_option_0_]').click(); 
    cy.get('[type=submit]').click();
    cy.get('#input-5').should('have.value', '347.138');
    cy.get('#input-6').should('have.value', '347138');
    cy.get('#input-7').should('have.value', 'Vincenty\'s');

    cy.get('[type=reset]').click();

    cy.get('#input-1').type('0');
    cy.get('#input-2').type('0');
    cy.get('#input-3').type('10');
    cy.get('#input-4').type('20');
    cy.get('[for=radio-group-1__BV_option_1_]').click(); 
    cy.get('[type=submit]').click();
    cy.get('#input-5').should('have.value', '2476.171');
    cy.get('#input-6').should('have.value', '2476171');
    cy.get('#input-7').should('have.value', 'Haversine');

    cy.get('[type=reset]').click();

    cy.get('#input-1').type('100');
    cy.get('#input-1').should('have.class', 'is-invalid');
    cy.get('#input-1').clear();
    cy.get('#input-1').type('90');
    cy.get('#input-1').should('not.have.class', 'is-invalid');
  });
});
