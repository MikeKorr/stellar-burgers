const testUrl = "http://localhost:3000/stellar-burgers";
const ingredient = 'div[data-testid="ingttt"]';
const closePopup = 'div[data-testid="modal"]';
const dropIng = 'div[data-testid="dropIng"]';
const delElem = 'div[data-testid="delElem"]';
const email = "new@mail.ru";
const password = "newnewnew";

describe("service is available", function () {
  beforeEach(function () {
    cy.viewport(1920, 1024);
  });
  it("should be available on localhost:3000", function () {
    cy.visit(testUrl);
  });
  it("Открытие", function () {
    cy.visit(testUrl);
    cy.get(ingredient).first().click();
    cy.wait(2000).get(closePopup).click();
  });
  it("Полный путь создания заказа от днд до логирования и офомления", function () {
    cy.visit(testUrl);
    cy.get(ingredient).eq(0).trigger("dragstart");
    cy.get(dropIng).eq(0).trigger("drop");
    cy.get(ingredient).eq(4).trigger("dragstart");
    cy.get(dropIng).eq(0).trigger("drop");
    cy.get(ingredient).eq(7).trigger("dragstart");
    cy.get(dropIng).eq(0).trigger("drop");
    cy.get(ingredient).eq(3).trigger("dragstart");
    cy.get(dropIng).eq(0).trigger("drop");
    cy.get('[class^="constructor-element__action pr-2"]').eq(3).click();
    cy.get('[class^="constructor-element__action pr-2"]').eq(2).click();
    cy.get("button").contains("Оформить заказ").click();
    cy.get('[class^="input pr-6 pl-6 input_size_default"]').first().type(email);
    cy.get('[class^="input pr-6 pl-6 input_type_password input_size_default"]')
      .last()
      .type(password);
    cy.get("button").contains("Войти").click();
    cy.get("button").contains("Оформить заказ").click();
    cy.wait(23000).get(closePopup).click();
  });
});
