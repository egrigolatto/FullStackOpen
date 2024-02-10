// import { beforeEach, describe } from "vitest";

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Ema Buel",
      username: "emagrigo",
      password: "123456",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("front page can be opened", function () {
    // ...
  });

  it("user can login", function () {
    // ...
  });

  describe("when logged in", function () {
    // ...
  });
});



/* eso esta andando
describe('Blog app', () => {

  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  it("front page can be opened", () => {
    cy.contains("Blogs");
  });

  it("login form can be opened", function () {
    cy.contains("log in").click();

    cy.get("#username").type("jorge");
    cy.get("#password").type("123456");
    cy.get("#login-button").click();

    cy.contains("jorge pedro logged in");
  });
})

describe('when logged in', function () {

  beforeEach(function () {
    cy.visit("http://localhost:5173");

    cy.contains("log in").click();

    cy.get("#username").type("jorge");
    cy.get("#password").type("123456");
    cy.get("#login-button").click();
  });
  
  it("a new blog can be created", function () {
    cy.contains("create new blog").click();
    cy.get("#title").type("cypress blog");
    cy.get("#author").type("jorgito");
    cy.get("#url").type("www.jorgitocypres.com");
    cy.get("#create_button").click();
  });
 
 })
 */