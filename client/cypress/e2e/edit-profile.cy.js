describe('Edit Profile Feature', () => {
  
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

    cy.openProfile();
  });

  it('Should allow editing first name field', () => {
    const newFirstName = 'NewFirstName';
    cy.get('.left-sidebar-profile input[placeholder="First Name"]')
      .clear()
      .type(newFirstName)
      .should('have.value', newFirstName);
  });

  it('Should allow editing last name field', () => {
    const newLastName = 'NewLastName';
    cy.get('.left-sidebar-profile input[placeholder="Last Name"]')
      .clear()
      .type(newLastName)
      .should('have.value', newLastName);
  });

  it('Should trigger file input when profile image is clicked', () => {
    cy.get('.left-sidebar-profile input[type="file"]')
      .should('exist')
      .and('have.class', 'hidden');
    
    cy.get('.left-sidebar-profile .profile-image').click();
  });

  it('Should disable save button when first name is empty', () => {
    cy.get('.left-sidebar-profile input[placeholder="First Name"]').clear();
    cy.get('.left-sidebar-profile .info-button')
      .should('have.class', 'button-disabled');
  });

  it('Should disable save button when last name is empty', () => {
    cy.get('.left-sidebar-profile input[placeholder="Last Name"]').clear();
    cy.get('.left-sidebar-profile .info-button')
      .should('have.class', 'button-disabled');
  });

  it('Should save profile changes successfully', () => {
    const testFirstName = 'TestFirst';
    const testLastName = 'TestLast';
    
    cy.get('.left-sidebar-profile input[placeholder="First Name"]')
      .clear()
      .type(testFirstName);
    
    cy.get('.left-sidebar-profile input[placeholder="Last Name"]')
      .clear()
      .type(testLastName);
    
    cy.get('.left-sidebar-profile .info-button')
      .should('not.have.class', 'button-disabled');
    
    cy.get('.left-sidebar-profile .info-button').click();
    
    cy.wait('@updateProfile');
    
    cy.get('.Toastify__toast--success', { timeout: 5000 })
      .should('be.visible')
      .and('contain.text', 'Profile updated successfully');
  });

});