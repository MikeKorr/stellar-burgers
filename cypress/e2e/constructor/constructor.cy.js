// describe("service is available", function () {
//   it("should be available on localhost:3000", function () {
//     cy.visit("http://localhost:3000");
//   });
// });

const ingredientClass = 'div[draggable="true"]';

describe("service is available", function () {
  it("should be available on localhost:3000", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Соберите бургер");
  });
  it("should open ingredient details", function () {
    cy.visit("http://localhost:3000/");
    cy.get(ingredientClass).first().click();
    cy.contains("Детали ингредиента");
  });
});
