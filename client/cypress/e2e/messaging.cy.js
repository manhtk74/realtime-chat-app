describe("Messaging Tests - DM, Group, Upload File", () => {
  const baseUrl = "http://localhost:3000/auth";

  // 3 users để test group chat
  const userA = {
    email: `msguserA_${Date.now()}@test.com`,
    password: "TestPassword123!",
    firstName: "Alice",
    lastName: "Smith",
    fullname: "Alice Smith",
  };

  const userB = {
    email: `msguserB_${Date.now()}@test.com`,
    password: "TestPassword123!",
    firstName: "Bob",
    lastName: "Johnson",
    fullname: "Bob Johnson",
  };

  const userC = {
    email: `msguserC_${Date.now()}@test.com`,
    password: "TestPassword123!",
    firstName: "Charlie",
    lastName: "Brown",
    fullname: "Charlie Brown",
  };

  // Helper: Sign up và setup profile
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

  // Helper: Logout
  const logout = () => {
    cy.get(".left-sidebar .avatar", { timeout: 10000 }).click();
    cy.get(".logout-button").click();
    cy.url({ timeout: 10000 }).should("include", "/auth");
  };

  // Helper: Login
  const login = (user) => {
    cy.visit(baseUrl);
    cy.get('.sign-in-container input[type="email"]').type(user.email);
    cy.get('.sign-in-container input[placeholder="Password"]').type(
      user.password
    );
    cy.get('.sign-in-container button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should("include", "/chat");
  };

  // Helper: Send friend request và accept
  const addFriend = (fromUser, toUser) => {
    login(fromUser);
    cy.get(".add-new-friend").click();
    cy.get(".modal-input").type(toUser.email);
    cy.get(".modal-input").type("{enter}");
    cy.wait(500);
    logout();

    login(toUser);
    cy.get(".friend-requests-icon-container").click();
    cy.get(".icon.approve").first().click();
    cy.get(".icon-container").first().click();
    cy.get(".tooltip.sub-header-icon ").eq(2).click();
    cy.get(".single-contact-info").contains(fromUser.email).click();
    cy.contains(fromUser.fullname).should("be.visible");
    cy.get('.message-bar-searchbar input[type="text"]').type(
      `Hello ${fromUser.fullname}`
    );
    cy.get(".message-bar-icon").eq(2).click({ force: true });
    cy.wait(500);
    logout();
  };

  before(() => {
    // Tạo 3 users
    signUpAndSetupProfile(userA);
    logout();
    signUpAndSetupProfile(userB);
    logout();
    signUpAndSetupProfile(userC);
    logout();

    // User A add User B và User C làm bạn
    addFriend(userA, userB);
    addFriend(userA, userC);
  });

  describe("1. Direct Message (DM)", () => {
    beforeEach(() => {
      login(userA);
    });

    it("should display contacts list", () => {
      cy.get(".icon-container").first().click();
      cy.wait(1000);
      cy.contains(userB.fullname).should("be.visible");
    });

    it("should open chat when clicking on contact", () => {
      cy.get(".icon-container").first().click();
      cy.wait(1000);
      cy.contains(userB.fullname).click();
      cy.get(".single-chat-header").should("contain", userB.fullname);
    });

    it("should send text message to contact", () => {
      const testMessage = `Hello from ${userA.fullname} at ${Date.now()}`;

      cy.get(".icon-container").first().click();
      cy.wait(1000);
      cy.contains(userB.fullname).click();
      cy.wait(500);

      cy.get('.message-bar-searchbar input[type="text"]').type(testMessage);
      cy.get(".message-bar-icon").eq(2).click();

      // Message should appear in chat
      cy.contains(testMessage).should("be.visible");
    });

    it("should send message by pressing Enter", () => {
      const testMessage = `Enter key test ${Date.now()}`;

      cy.get(".icon-container").first().click();
      cy.wait(1000);
      cy.contains(userB.firstName).click();
      cy.wait(500);

      cy.get('.message-bar-searchbar input[type="text"]').type(
        testMessage + "{enter}"
      );

      cy.contains(testMessage).should("be.visible");
    });
  });

  describe("2. Receive Messages", () => {
    beforeEach(() => {
      // User A gửi message cho User B
      login(userA);
      cy.get(".icon-container").first().click();
      cy.wait(1000);
      cy.contains(userB.firstName).click();
      cy.wait(500);
      cy.get('.message-bar-searchbar input[type="text"]').type(
        `Test message ${Date.now()}{enter}`
      );
      cy.wait(2000);
      logout();
    });

    it("should receive and display message from contact", () => {
      login(userB);
      cy.get(".icon-container").first().click();
      cy.wait(1000);
      cy.contains(userA.firstName).click();
      cy.wait(1000);

      cy.contains("Test message").should("be.visible");
    });
  });

  describe("3. Create Group", () => {
    beforeEach(() => {
      login(userA);
    });

    it("should open create group modal", () => {
      cy.get(".tooltip.sub-header-icon").eq(1).click();
      cy.get(".create-group-modal").should("be.visible");
    });

    it("should successfully create a group with members", () => {
      const groupName = `Test Group ${Date.now()}`;

      cy.get(".tooltip.sub-header-icon").eq(1).click();
      cy.get('input[placeholder*="Group Name"]').type(groupName);
      cy.get(".multi-select-container .multi-select").click();
      cy.contains(
        '.multi-select-container [role="option"]',
        userB.fullname
      ).click();
      cy.contains(
        '.multi-select-container [role="option"]',
        userC.fullname
      ).click();

      // Click outside để close dropdown
      cy.get('input[placeholder*="Group Name"]').click();
      cy.get(".create-group-input-container .submit-button").click();

      cy.contains(groupName, { timeout: 5000 }).should("be.visible");
    });
  });

  describe("4. Group Messages", () => {
    const groupName = `Group Chat ${Date.now()}`;

    before(() => {
      // Tạo group
      login(userA);
      cy.get(".tooltip.sub-header-icon").eq(1).click();
      cy.get('input[placeholder*="Group Name"]').type(groupName);
      cy.get(".multi-select-container .multi-select").click();
      cy.contains(
        '.multi-select-container [role="option"]',
        userB.fullname
      ).click();
      cy.contains(
        '.multi-select-container [role="option"]',
        userC.fullname
      ).click();
      cy.get('input[placeholder*="Group Name"]').click();
      cy.get(".create-group-input-container .submit-button").click();
      logout();
    });

    beforeEach(() => {
      login(userA);
    });

    it("should display created group in list", () => {
      cy.contains(groupName).should("be.visible");
    });

    it("should send message to group", () => {
      const groupMessage = `Group message ${Date.now()}`;

      cy.contains(groupName).click();
      cy.wait(500);
      cy.get('.message-bar-searchbar input[type="text"]').type(
        groupMessage + "{enter}"
      );

      cy.contains(groupMessage).should("be.visible");
    });
  });

  describe("5. Upload File in DM", () => {
    beforeEach(() => {
      login(userA);
      cy.get(".icon-container").first().click();
      cy.wait(1000);
      cy.contains(userB.firstName).click();
      cy.wait(500);
    });

    it("should open file picker when clicking attach button", () => {
      cy.get(".message-bar-icon").eq(1).click();
      cy.get('input[type="file"]').should("exist");
    });

    it("should upload and send image file", () => {
      // Create a test image file
      cy.fixture("images.jpg", "base64").then((fileContent) => {
        cy.get('input[type="file"]').attachFile({
          fileContent,
          fileName: "images.jpg",
          mimeType: "image/jpeg",
          encoding: "base64",
        });
      });

      cy.wait(3000);
      cy.contains("File uploaded successfully", { timeout: 10000 }).should(
        "be.visible"
      );
    });
  });

  describe("6. Upload File in Group", () => {
    const groupName = `File Group ${Date.now()}`;

    before(() => {
      login(userA);
      cy.get(".tooltip.sub-header-icon").eq(1).click();
      cy.get('input[placeholder*="Group Name"]').type(groupName);
      cy.get(".multi-select-container .multi-select").click();
      cy.contains(
        '.multi-select-container [role="option"]',
        userB.fullname
      ).click();
      cy.contains(
        '.multi-select-container [role="option"]',
        userC.fullname
      ).click();

      // Click outside để close dropdown
      cy.get('input[placeholder*="Group Name"]').click();
      cy.get(".create-group-input-container .submit-button").click();
      cy.contains(groupName).click();
    });

    it("should upload file to group chat", () => {
      cy.fixture("images.jpg", "base64").then((fileContent) => {
        cy.get('input[type="file"]').attachFile({
          fileContent,
          fileName: "images.jpg",
          mimeType: "image/jpeg",
          encoding: "base64",
        });
      });

      cy.wait(1000);
      cy.contains("File uploaded successfully", { timeout: 10000 }).should(
        "be.visible"
      );
    });
  });

  describe("7. Message History", () => {
    beforeEach(() => {
      login(userA);
    });

    it("should load previous messages when opening chat", () => {
      cy.get(".icon-container").first().click();
      cy.wait(1000);
      cy.contains(userB.firstName).click();
      cy.wait(1000);

      // Should see previous messages
      cy.get(".message-container").should("have.length.greaterThan", 0);
    });

    it("should scroll to bottom when opening chat", () => {
      cy.get(".icon-container").first().click();
      cy.wait(1000);
      cy.contains(userB.firstName).click();
      cy.wait(1000);

      // Last message should be visible
      cy.get(".message-container").last().should("be.visible");
    });
  });
});
