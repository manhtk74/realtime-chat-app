describe("Authentication Tests", () => {
  const baseUrl = "http://localhost:3000";

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  describe("1. Form Toggle", () => {
    it("should switch to sign up form when clicking Sign Up button", () => {
      // Click button trong overlay-right, không phải button submit
      cy.get(".overlay-right button.ghost").click();
      cy.get("#container").should("have.class", "right-panel-active");
      cy.get(".sign-up-container").should("be.visible");
    });

    it("should switch back to sign in form when clicking Sign In button", () => {
      cy.get(".overlay-right button.ghost").click();
      cy.wait(500);
      cy.get(".overlay-left button.ghost").click();
      cy.wait(500);
      cy.get("#container").should("not.have.class", "right-panel-active");
    });
  });

  describe("2. Sign Up Validation", () => {
    beforeEach(() => {
      cy.get(".overlay-right button.ghost").click();
      cy.wait(500);
    });

    it("should not allow clicking submit button when email is empty", () => {
      cy.get('.sign-up-container input[placeholder="Password"]').type(
        "TestPassword123!"
      );
      cy.get('.sign-up-container input[placeholder="Confirm Password"]').type(
        "TestPassword123!"
      );

      cy.get('.sign-up-container button[type="submit"]')
        .should("have.class", "disabled-auth-button")
        .should("have.css", "pointer-events", "none");
    });

    it("should not allow clicking submit button when password is empty", () => {
      cy.get('.sign-up-container input[type="email"]').type("test@test.com");

      cy.get('.sign-up-container button[type="submit"]')
        .should("have.class", "disabled-auth-button")
        .should("have.css", "pointer-events", "none");
    });

    it("should show warning when passwords do not match", () => {
      cy.get('.sign-up-container input[type="email"]').type("test@test.com");
      cy.get('.sign-up-container input[placeholder="Password"]').type(
        "TestPassword123!"
      );
      cy.get('.sign-up-container input[placeholder="Confirm Password"]').type(
        "DifferentPass123!"
      );
      cy.get('.sign-up-container button[type="submit"]').click();

      cy.contains("Passwords do not match", { timeout: 5000 }).should(
        "be.visible"
      );
    });

    it("should disable submit button when fields are empty", () => {
      cy.get('.sign-up-container button[type="submit"]')
        .should("have.class", "disabled-auth-button")
        .should("have.css", "pointer-events", "none");
    });

    it("should keep button disabled when only email is filled", () => {
      cy.get('.sign-up-container input[type="email"]').type("test@test.com");
      cy.get('.sign-up-container button[type="submit"]')
        .should("have.class", "disabled-auth-button")
        .should("have.css", "pointer-events", "none");
    });

    it("should keep button disabled when only password is filled", () => {
      cy.get('.sign-up-container input[placeholder="Password"]').type(
        "TestPassword123!"
      );
      cy.get('.sign-up-container button[type="submit"]')
        .should("have.class", "disabled-auth-button")
        .should("have.css", "pointer-events", "none");
    });

    it("should successfully sign up and navigate chat page", () => {
      const uniqueEmail = `testuser_${Date.now()}@test.com`;

      cy.get('.sign-up-container input[type="email"]').type(uniqueEmail);
      cy.get('.sign-up-container input[placeholder="Password"]').type(
        "TestPassword123!"
      );
      cy.get('.sign-up-container input[placeholder="Confirm Password"]').type(
        "TestPassword123!"
      );

      cy.get('.sign-up-container button[type="submit"]').click();

      cy.contains("Signup successful", { timeout: 10000 }).should("be.visible");
      cy.url({ timeout: 10000 }).should("include", "/profile");

      cy.get('input[placeholder="First Name"]').clear().type("John");
      cy.get('input[placeholder="Last Name"]').clear().type("Doe");
      cy.contains("button", "Save Changes").click();

      cy.contains("Profile updated successfully", { timeout: 10000 }).should(
        "be.visible"
      );
      cy.url({ timeout: 10000 }).should("include", "/chat");
    });
  });

  describe("3. Sign in", () => {
    const loginUser = {
      email: `kiemthu1@gmail.com`,
      password: "123456",
    };

    beforeEach(() => {
      cy.visit(baseUrl);
    });

    it("should not allow clicking submit button when email is empty", () => {
      cy.get('.sign-in-container input[placeholder="Password"]').type(
        loginUser.password
      );

      cy.get('.sign-in-container button[type="submit"]')
        .should("have.class", "disabled-auth-button")
        .should("have.css", "pointer-events", "none");
    });

    it("should not allow clicking submit button when password is empty", () => {
      cy.get('.sign-in-container input[type="email"]').type(loginUser.email);

      cy.get('.sign-in-container button[type="submit"]')
        .should("have.class", "disabled-auth-button")
        .should("have.css", "pointer-events", "none");
    });

    it("should enable submit button when both fields are filled", () => {
      cy.get('.sign-in-container input[type="email"]').type(loginUser.email);
      cy.get('.sign-in-container input[placeholder="Password"]').type(
        loginUser.password
      );

      cy.get('.sign-in-container button[type="submit"]')
        .should("not.have.class", "disabled-auth-button")
        .should("not.have.css", "pointer-events", "none");
    });

    it("should successfully sign in and navigate to chat page", () => {
      cy.get('.sign-in-container input[type="email"]').type(loginUser.email);
      cy.get('.sign-in-container input[placeholder="Password"]').type(
        loginUser.password
      );
      cy.get('.sign-in-container button[type="submit"]').click();

      cy.contains("Login successful", { timeout: 10000 }).should("be.visible");
      cy.url({ timeout: 10000 }).should("include", "/chat");
    });

    it("should handle incorrect password", () => {
      // Listen for uncaught exceptions and prevent test from failing
      cy.on("uncaught:exception", (err) => {
        if (err.message.includes("Request failed with status code 400")) {
          return false;
        }
      });

      cy.get('.sign-in-container input[type="email"]').type(loginUser.email);
      cy.get('.sign-in-container input[placeholder="Password"]').type(
        "WrongPassword123!"
      );
      cy.get('.sign-in-container button[type="submit"]').click();

      // Should stay on auth page
      cy.wait(2000);
      cy.url().should("eq", baseUrl + "/auth");
    });

    it("should handle non-existent user", () => {
      // Listen for uncaught exceptions and prevent test from failing
      cy.on("uncaught:exception", (err, runnable) => {
        // Return false to prevent the error from failing this test
        if (err.message.includes("Request failed with status code 400")) {
          return false;
        }
        return true;
      });

      cy.get('.sign-in-container input[type="email"]').type(
        `nonexist_${Date.now()}@test.com`
      );
      cy.get('.sign-in-container input[placeholder="Password"]').type(
        loginUser.password
      );
      cy.get('.sign-in-container button[type="submit"]').click();

      // Should stay on auth page
      cy.wait(2000);
      cy.url().should("eq", baseUrl + "/auth");
    });
  });
});
