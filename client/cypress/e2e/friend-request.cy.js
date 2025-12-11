describe("Friend Request Tests", () => {
  const baseUrl = "http://localhost:3000/auth";

  const userA = {
    email: `usera_${Date.now()}@test.com`,
    password: "TestPassword123!",
    firstName: "User",
    lastName: "A",
    fullName: "User A",
  };

  const userB = {
    email: `userb_${Date.now()}@test.com`,
    password: "TestPassword123!",
    firstName: "User",
    lastName: "B",
    fullName: "User B",
  };

  // Sign up và setup profile
  const signUpAndSetupProfile = (user) => {
    cy.visit(baseUrl);
    cy.get(".overlay-right button.ghost").click();
    cy.wait(500);

    cy.get('.sign-up-container input[type="email"]').type(user.email);
    cy.get('.sign-up-container input[placeholder="Password"]').type(
      user.password
    );
    cy.get('.sign-up-container input[placeholder="Confirm Password"]').type(
      user.password
    );
    cy.get('.sign-up-container button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should("include", "/profile");

    cy.get('input[placeholder="First Name"]').type(user.firstName);
    cy.get('input[placeholder="Last Name"]').type(user.lastName);
    cy.contains("button", "Save Changes").click();

    cy.url({ timeout: 10000 }).should("include", "/chat");
  };

  // Logout
  const logout = () => {
    cy.get(".left-sidebar .avatar", { timeout: 10000 }).click();
    cy.get(".logout-button").click();
    cy.url({ timeout: 10000 }).should("include", "/auth");
  };

  // Login
  const login = (user) => {
    cy.visit(baseUrl);
    cy.get('.sign-in-container input[type="email"]').type(user.email);
    cy.get('.sign-in-container input[placeholder="Password"]').type(
      user.password
    );
    cy.get('.sign-in-container button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should("include", "/chat");
  };

  before(() => {
    signUpAndSetupProfile(userA);
    logout();

    signUpAndSetupProfile(userB);
    logout();
  });

  describe("1. Send Friend Request", () => {
    beforeEach(() => {
      login(userA);
    });

    it("should not allow sending friend request to yourself", () => {
      cy.get(".add-new-friend").click();
      cy.get(".modal-input").type(userA.email);
      cy.get(".modal-input").type("{enter}");

      cy.contains("Cannot send friend request to yourself", {
        timeout: 5000,
      }).should("be.visible");
    });

    it("should successfully send friend request to another user", () => {
      cy.get(".add-new-friend").click();
      cy.get(".modal-input").type(userB.email);
      cy.get(".modal-input").type("{enter}");

      cy.contains(
        `Friend request sent to the user with email: ${userB.email}`,
        { timeout: 5000 }
      ).should("be.visible");
    });
  });

  describe("2. Receive and View Friend Requests", () => {
    before(() => {
      login(userA);
      cy.get(".add-new-friend").click();
      cy.get(".modal-input").type(userB.email);
      cy.get(".modal-input").type("{enter}");
      cy.wait(1000);
      logout();
    });

    it("should show friend request notification badge", () => {
      login(userB);
      cy.get(".friend-requests-icon-container", {
        timeout: 10000,
      }).should("be.visible");
      // Phải có request mới
      cy.get(".friend-requests-icon-container").should("contain", "1");
      cy.get(".friend-requests-icon-container").click();
      cy.wait(1000);
      // Click vào phải có tên User A
      cy.contains(userA.fullName).should("be.visible");
    });
  });

  describe("3. Accept Friend Request", () => {
    it("should have accept button on friend request", () => {
      login(userB);
      cy.get(".friend-requests-icon-container").click();
      cy.wait(1000);
      // Phải click được approve
      cy.get(".icon.approve").should("be.visible");
      cy.get(".icon.approve").first().click();
      // Phải chọn tin nhắn mới được
      cy.get(".icon-container").first().click();
      cy.get(".tooltip.sub-header-icon ").eq(2).click();
      cy.contains(userA.email).should("be.visible");
    });
  });

  describe("4. Reject Friend Request", () => {
    before(() => {
      login(userA);
      cy.get(".add-new-friend").click();
      cy.get(".modal-input").type(userB.email);
      cy.get(".modal-input").type("{enter}");
      cy.wait(1000);
      logout();
    });

    it("should have reject button on friend request", () => {
      login(userB);
      cy.get(".friend-requests-icon-container").click();
      cy.wait(1000);
      // Phải click reject được
      cy.get(".icon.reject").should("be.visible");
      cy.get(".icon.reject").first().click();
      cy.wait(1000);
      // Reject xong thì request đấy k còn nữa
      cy.contains(userA.fullName).should("not.exist");
    });
  });
});
