describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Brian-desu",
      username: "briuwu",
      password: "millonte",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    const user2 = {
      name: "Other User",
      username: "otheruser",
      password: "otherpassword",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("login").click();

    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("briuwu");
      cy.get("#password").type("millonte");
      cy.get("#login-button").click();

      cy.contains("Brian-desu logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("briuwu");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.contains("wrong username or password");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "briuwu", password: "millonte" });
    });

    it("a new blog can be created", function () {
      cy.createBlog({
        title: "test blog",
        author: "test author",
        url: "test url",
      });

      cy.contains("test blog");
    });

    it("a blog can be liked", function () {
      cy.createBlog({
        title: "test blog",
        author: "test author",
        url: "test url",
      });

      cy.contains("test blog").parent().find("button").click();
      cy.contains("like").click();
      cy.contains("likes 1");
    });

    it("a blog can be deleted", function () {
      cy.createBlog({
        title: "test blog",
        author: "test author",
        url: "test url",
      });

      cy.contains("test blog").parent().find("button").click();
      cy.contains("remove").click();
      cy.get("html").should("not.contain", "test blog test author");
    });

    it("only shows delete button to the creator of the blog", function () {
      cy.createBlog({
        title: "test blog",
        author: "test author",
        url: "test url",
      });

      cy.get("#logout-button").click();
      cy.login({ username: "otheruser", password: "otherpassword" });

      cy.contains("test blog").parent().find("button").click();
      cy.contains("remove").should("not.exist");

      cy.get("#logout-button").click();
      cy.login({ username: "briuwu", password: "millonte" });

      cy.contains("test blog").parent().find("button").click();
      cy.contains("remove").should("exist");
    });

    describe("and several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test blog",
          author: "test author",
          url: "test url",
        });
        cy.createBlog({
          title: "test blog 2",
          author: "test author 2",
          url: "test url 2",
        });
      });

      it("blogs are ordered by likes", function () {
        cy.contains("test blog 2").parent().find("button").click();
        cy.contains("like").click();
        cy.contains("like").click();

        cy.visit("");
        cy.get(".blog").then((blogs) => {
          cy.wrap(blogs[0]).contains("test blog 2");
          cy.wrap(blogs[1]).contains("test blog");
        });
      });
    });
  });
});
