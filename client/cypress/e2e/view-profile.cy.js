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

  // describe('TC 2: View Contact Profile', () => {
    
  //   beforeEach(() => {
  //     cy.get('.chat-type-indicator.dms')
  //       .next('.chats')
  //       .find('.chat')
  //       .first()
  //       .click();

  //     cy.get('.single-chat-header').should('be.visible');

  //     cy.get('.single-chat-header .avatar').click();

  //     cy.get('.left-sidebar-contact-or-group-profile').should('be.visible');
  //   });

  //   it('Should display contact profile image or default avatar', () => {
  //     cy.get('.left-sidebar-contact-or-group-profile .profile-image')
  //       .should('be.visible');
  //   });

  //   it('Should display contact name as heading', () => {
  //     cy.get('.left-sidebar-contact-or-group-profile h1')
  //       .should('be.visible')
  //       .and('not.be.empty');
  //   });

  //   it('Should display contact email', () => {
  //     cy.get('.left-sidebar-contact-or-group-profile .contact-info')
  //       .should('be.visible');

  //     cy.get('.left-sidebar-contact-or-group-profile .label')
  //       .contains('Contact:')
  //       .should('be.visible');
  //   });

  // });
});
