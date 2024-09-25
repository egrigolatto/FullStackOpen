describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Emanuel Grigolatto",
      username: "emagrigo1",
      password: "morty",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.contains("Blogs");
  });

  it("Login form is shown", function () {
    cy.contains("log in");
  });

  describe("Login back", () => {
    it("succeeds with correct credentials 1", function () {
      cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
        username: "emagrigo1",
        password: "morty",
      }).then(({ body }) => {
        localStorage.setItem("loggedBlogappUser", JSON.stringify(body));
        cy.visit("");
      });
    });

    it("fails with wrong credentials 1", function () {
      cy.request({
        method: "POST",
        url: `${Cypress.env("BACKEND")}/login`,
        body: {
          username: "emagrigo1",
          password: "wrongpassword",
        },
        failOnStatusCode: false, // Evita que Cypress falle automáticamente
      }).then((response) => {
        expect(response.status).to.eq(401);
        cy.visit("");
      });
    });
  });

  describe("Login front", () => {
    it("succeeds with correct credentials 2", function () {
      cy.visit("");
      cy.contains("log in").click();
      cy.get("#username").type("emagrigo1");
      cy.get("#password").type("morty");
      cy.get("#login-button").click();

      cy.contains("Emanuel Grigolatto logged-in");
    });

    it("fails with wrong credentials 2", function () {
      cy.visit("");
      cy.contains("log in").click();
      cy.get("#username").type("emagrigo1");
      cy.get("#password").type("wrongpassword");
      cy.get("#login-button").click();

       cy.get(".error")
         .should("contain", "Wrong credentials")
         .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.visit("");
      cy.contains("log in").click();
      cy.get("#username").type("emagrigo1");
      cy.get("#password").type("morty");
      cy.get("#login-button").click();

      // Crear un nuevo blog para las pruebas
      cy.contains("create new blog").click();
      cy.get("#blog-title").type("a blog created by cypress");
      cy.get("#blog-author").type("cypress author");
      cy.get("#blog-url").type("http://cypress.io");
      cy.contains("Create").click();
    });

    it("A blog can be created", function () {
      cy.contains("a blog created by cypress");
    });

    it("A user can like a blog", function () {
      cy.contains("a blog created by cypress").contains("view").click();

      cy.contains("like").click().parent().contains("1");
    });

    it("The user who created a blog can delete it", function () {
      cy.contains("a blog created by cypress").contains("view").click();

      cy.contains("delete").click();

      cy.get("html").should("not.contain", "a blog created by cypress");
    });

    it("Only the creator can see the delete button", function () {
      cy.contains("a blog created by cypress").contains("view").click();

      cy.contains("delete").should("be.visible");

      // Logout
      cy.contains("logout").click();

      // Crear y loguear con un nuevo usuario
      const newUser = {
        name: "Another User",
        username: "anotheruser",
        password: "anotherpassword",
      };
      cy.request("POST", `${Cypress.env("BACKEND")}/users`, newUser);
      cy.visit("");
      cy.contains("log in").click();
      cy.get("#username").type("anotheruser");
      cy.get("#password").type("anotherpassword");
      cy.get("#login-button").click();

      cy.contains("a blog created by cypress").contains("view").click();

      cy.contains("delete").should("not.exist");
    });
  });
});

  
/*
  it("login form can be opened", function () {
    // cy.visit("http://localhost:5173");
    cy.contains("log in").click();
    // cy.get("input:first").type("emagrigo");
    // cy.get("input:last").type("morty");
    cy.get("#username").type("emagrigo1");
    cy.get("#password").type("morty");
    cy.get("#login-button").click();

    cy.contains("Emanuel Grigolatto logged-in");
  });
  
  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("log in").click();
      cy.get("#username").type("emagrigo");
      cy.get("#password").type("morty");
      cy.get("#login-button").click();
    });

    it("a new note can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#blog-title").type("a note created by cypress");
      cy.get("#blog-author").type("a note created by cypress");
      cy.get("#blog-url").type("a note created by cypress");
      cy.contains("Create").click();
      cy.contains("a note created by cypress");
    });
  });
  
  describe("when logged in", function () {

    Cypress.Commands.add("login", ({ username, password }) => {
      cy.request("POST", "http://localhost:3003/api/login", {
        username,
        password,
      }).then(({ body }) => {
        localStorage.setItem("loggedBlogappUser", JSON.stringify(body));
        cy.visit("");
      });
    });

    beforeEach(function () {
      cy.login({ username: "emagrigo1", password: "morty" });
    });


    
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "emagrigo1",
        password: "morty",
      }).then((response) => {
        localStorage.setItem(
          "loggedNoteappUser",
          JSON.stringify(response.body)
        );
        cy.visit("http://localhost:5173");
      });
    });
    
    Cypress.Commands.add("createBlog", ({ title, author, url }) => {
      cy.request({
        url: "http://localhost:3003/api/blogs",
        method: "POST",
        body: { title, author, url },
        headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem("loggedBlogappUser")).token
            }`,
        },
      });

      cy.visit("");
    });

    it("a new note can be created", function () {
      // ...
    });
  });
  describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a note created by cypress',
          author: 'a note created by cypress',
          url: 'a note created by cypress',
        })
      })
  });
*/
