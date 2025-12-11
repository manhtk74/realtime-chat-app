describe('View Profile', () => {
  
  const testUser = {
    email: 'kiemthu1@gmail.com',
    password: '123456'
  };

  beforeEach(() => {
    cy.setupApiIntercepts();

    cy.visit('/auth');
    cy.get('.sign-in-container input[type="email"]').type(testUser.email);
    cy.get('.sign-in-container input[type="password"]').type(testUser.password);
    cy.get('.sign-in-container button[type="submit"]').click();

    cy.url().should('include', '/chat');

    cy.wait(['@getContacts', '@getGroups'], { timeout: 10000 });
  });

  describe('TC 1: View User Profile', () => {
    
    beforeEach(() => {
      cy.openProfile();
    });

    it('Should display user email in profile', () => {
      cy.get('.left-sidebar-profile input[type="email"]')
        .should('be.visible')
        .invoke('val')
        .should('not.be.empty');
    });

    it('Should display user first name in profile', () => {
      cy.get('.left-sidebar-profile input[placeholder="First Name"]')
        .should('be.visible')
        .invoke('val')
        .should('not.be.empty');
    });

    it('Should display user last name in profile', () => {
      cy.get('.left-sidebar-profile input[placeholder="Last Name"]')
        .should('be.visible')
        .invoke('val')
        .should('not.be.empty');
    });

    it('Should display profile image or default avatar', () => {
      cy.get('.left-sidebar-profile .profile-image').should('be.visible');
    });

  });
});
