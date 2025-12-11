describe('Search Feature', () => {
  
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

  it('Search by name', () => {
    const searchTerm = 'kiemthu';

    cy.get('.search-input')
      .should('not.be.disabled')
      .should('be.visible')
      .type(searchTerm);

    cy.wait('@searchDmContacts');

    cy.get('.chat-type-indicator.dms')
      .should('be.visible')
      .and('contain.text', 'Direct Messages');
 
    cy.get('.dms-and-group-chats-container .chats')
      .should('exist')
      .find('.chat')
      .should('have.length.greaterThan', 0);
    
    cy.get('.dms-and-group-chats-container .chats .chat')
      .first()
      .should('contain.text', 'kiemthu');
  });

  it('Search for non-existent contact', () => {
    const searchTerm = 'John';

    cy.get('.search-input')
      .should('not.be.disabled')
      .should('be.visible')
      .type(searchTerm);

    cy.wait('@searchDmContacts');
   
    cy.get('.dms-and-group-chats-container').then(($container) => {
      const dmIndicator = $container.find('.chat-type-indicator.dms');
      if (dmIndicator.length > 0) {
        cy.get('.chat-type-indicator.dms')
          .next('.chats')
          .find('.chat')
          .should('have.length', 0);
      } else {
        cy.get('.chat-type-indicator.dms').should('not.exist');
      }
    });
  });

  it('Search contact by partial name', () => {
    const searchTerm = 'Phuc';

    cy.get('.search-input')
      .should('not.be.disabled')
      .should('be.visible')
      .clear()
      .type(searchTerm);
    
    cy.wait('@searchDmContacts');

    cy.get('.dms-and-group-chats-container .chats .chat')
      .should('have.length', 1)
      .first()
      .should('contain.text', 'Phuc');
  });

  it('Lowercase search', () => {
    const searchTerm = 'phuc';
 
    cy.get('.search-input')
      .should('not.be.disabled')
      .should('be.visible')
      .clear()
      .type(searchTerm);
    
    cy.wait('@searchDmContacts');
    
    cy.get('.dms-and-group-chats-container .chats .chat')
      .should('have.length.at.least', 1); 
  });

  it('Uppercase search', () => {
    const searchTerm = 'PHUC';

    cy.get('.search-input')
      .should('not.be.disabled')
      .should('be.visible')
      .clear()
      .type(searchTerm);
    
    cy.wait('@searchDmContacts');

    cy.get('.dms-and-group-chats-container .chats .chat')
      .should('have.length.at.least', 1);
  });

});