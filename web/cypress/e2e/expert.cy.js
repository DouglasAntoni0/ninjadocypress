import { faker } from "@faker-js/faker";
import _ from "lodash";

describe("Expert", () => {
  beforeEach(() => {
    cy.start();
  });
  it("Deve manipular os atributos de elementos", () => {
    cy.get("#email").invoke("val", "papito@teste.com.br");

    cy.get("#password").invoke("attr", "name", "senha");

    cy.contains("button", "Entrar").invoke("hide").should("not.be.visible");

    cy.contains("button", "Entrar").invoke("show").should("be.visible");
  });

  it("Não deve logar com senha invalida", () => {
    cy.get("#email").type("papito@webdojo.com");
    cy.get("#password").type("katana321{Enter}");

    cy.contains(
      "[data-sonner-toaster=true] div[class=title]",
      "Acesso negado! Tente novamente.",
    )
      .should("be.visible")
      .should("have.text", "Acesso negado! Tente novamente.");

    cy.wait(5000);
    cy.get("[data-sonner-toaster=true]").should("not.exist");
  });

  it("Simulando a tecla TAB com cy.press()", () => {
    cy.log("todo");

    cy.get("body").press("Tab");

    cy.focused().should("have.attr", "id", "email");

    cy.get("#email").press("Tab");
    cy.focused().should("have.attr", "id", "password");
  });

  it.only("Deve realizar uma carga de dados fakes", () => {
    _.times(100, () => {
      const name = faker.person.fullName();
      const email = faker.internet.email();
      const password = "pwp123";

      cy.log(name);
      cy.log(email);
      cy.log(password);
    });
  });
});
