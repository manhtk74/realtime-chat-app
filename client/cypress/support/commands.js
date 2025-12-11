// Import cypress-file-upload plugin for file upload testing
import 'cypress-file-upload';

/**
 * Custom command to login with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 */
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/auth');
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button').contains(/login|sign in/i).click();
  cy.url().should('include', '/chat');
});

/**
 * Custom command to navigate to chat page
 */
Cypress.Commands.add('goToChat', () => {
  cy.visit('/chat');
});

/**
 * Custom command to open profile section
 */
Cypress.Commands.add('openProfile', () => {
  cy.get('.left-sidebar .avatar').click();
});

/**
 * Custom command to setup API intercepts for common endpoints from backend
 */
Cypress.Commands.add('setupApiIntercepts', () => {
  cy.intercept('GET', '**/api/contacts/get-contacts-for-dm').as('getContacts');
  cy.intercept('GET', '**/api/groups/get-user-groups').as('getGroups');
  cy.intercept('POST', '**/api/contacts/search-dm').as('searchDmContacts');
  cy.intercept('POST', '**/api/groups/search-groups').as('searchGroups');
  cy.intercept('POST', '**/api/auth/update-profile').as('updateProfile');
  cy.intercept('POST', '**/api/auth/logout').as('logout');
  cy.intercept('GET', '**/api/groups/get-groups-in-common/*').as('getGroupsInCommon');
  cy.intercept('GET', '**/api/groups/get-group-members/*').as('getGroupMembers');
  cy.intercept('GET', '**/api/friend-requests/get-friend-requests').as('getFriendRequests');
});

/**
 * Custom command to search in chat list
 * @param {string} searchTerm - The term to search for
 */
Cypress.Commands.add('searchChats', (searchTerm) => {
  cy.get('.search-input').clear().type(searchTerm);
});

/**
 * Custom command to update profile
 * @param {string} firstName - New first name
 * @param {string} lastName - New last name
 */
Cypress.Commands.add('updateProfile', (firstName, lastName) => {
  cy.openProfile();
  cy.get('input[placeholder="First Name"]').clear().type(firstName);
  cy.get('input[placeholder="Last Name"]').clear().type(lastName);
  cy.get('.info-button').click();
});
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
