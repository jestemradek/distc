// https://docs.cypress.io/api/introduction/api.html

describe("Live frontend tests", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "DistC");
    cy.contains("p", "GPS Distance Calculator");
  });
});
