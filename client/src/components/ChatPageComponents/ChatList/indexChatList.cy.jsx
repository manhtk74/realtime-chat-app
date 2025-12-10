import React from 'react'
import ChatList from './index'
import { useAppStore } from '../../../store'

describe('<ChatList />', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
  
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    useAppStore.setState({
      activeIcon: 'chat',
      setActiveIcon: cy.stub(),
      activeFilter: 'all',
      setActiveFilter: cy.stub(),
      refreshChatList: false,
      setRefreshChatList: cy.stub(),
      userInfo: {
        id: '1',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe'
      },
      directMessagesContacts: [
        {
          _id: '1',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          lastMessage: 'Hey, how are you?',
          lastMessageType: 'text',
          lastMessageTime: new Date().toISOString()
        }
      ],
      setDirectMessagesContacts: cy.stub(),
      groups: [
        {
          _id: '101',
          name: 'Team Discussion',
          lastMessage: { content: 'Great work!', messageType: 'text', timestamp: new Date().toISOString() }
        }
      ],
      setGroups: cy.stub(),
      addGroupInGroupList: cy.stub(),
      addContactsInDmContacts: cy.stub(),
      selectedChatMessages: [],
      setSelectedChatType: cy.stub(),
      setSelectedChatData: cy.stub(),
      selectedChatData: null
    });
    
    // mock cac api
    cy.intercept('GET', '**/get-contacts-for-dm', {
      statusCode: 200,
      body: { contacts: [] }
    });
    cy.intercept('GET', '**/get-user-groups', {
      statusCode: 200,
      body: { groups: [] }
    });
    cy.intercept('GET', '**/get-all-contacts', {
      statusCode: 200,
      body: { contacts: [] }
    });
    cy.intercept('POST', '**/search-dm-contacts', {
      statusCode: 200,
      body: { contacts: [] }
    });
    cy.intercept('POST', '**/search-groups', {
      statusCode: 200,
      body: { searchedGroups: [] }
    });
    cy.intercept('POST', '**/search-contacts', {
      statusCode: 200,
      body: { contacts: [] }
    });
  });

  it('hiển thị component chat list với cấu trúc đúng', () => {
    cy.mount(<ChatList />);
    cy.get('.chat-list').should('exist').and('be.visible');
    cy.get('.header').should('exist');
    cy.get('h1').should('contain.text', 'Chats');
    cy.get('.request-chats-container, [class*="chats"]').should('exist');
  });

  it('hiển thị input search với placeholder đúng', () => {
    cy.mount(<ChatList />);
    cy.get('input[type="text"]').should('exist').and('be.visible');
    cy.get('input[type="text"]').first().invoke('attr', 'placeholder').should('include', 'Search');
  });

  it('hiển thị tất cả filter button và chúng có thể click', () => {
    cy.mount(<ChatList />);
    cy.get('[class*="filter"], [class*="tab"]').should('have.length.greaterThan', 0);
    cy.get('body').should('contain', 'All');
    cy.get('body').should('contain', 'DMs');
    cy.get('body').should('contain', 'Groups');
    cy.get('body').contains(/\bDMs\b/).click({ force: true });
    cy.get('.chat-list').should('exist');
    cy.get('body').contains(/\bGroups\b/).click({ force: true });
    cy.get('.chat-list').should('exist');
    cy.get('body').contains('All').click({ force: true });
    cy.get('.chat-list').should('exist');
  });

  it('hiển thị phần groups với group items', () => {
    cy.mount(<ChatList />);
    cy.get('body').contains('Groups').should('be.visible');
    cy.get('body').contains('Team Discussion').should('be.visible');
    cy.get('body').contains('Great work!').should('exist');
  });

  it('hiển thị phần direct messages với contact items', () => {
    cy.mount(<ChatList />);
    cy.get('body').contains('Direct Messages').should('be.visible');
    cy.get('body').contains('Jane Smith').should('be.visible');
    cy.get('body').contains('Hey, how are you?').should('exist');
  });

  it('search input phải hoạt động và chấp nhận text', () => {
    cy.mount(<ChatList />);
    cy.get('input[type="text"]').first().type('Jane');
    cy.get('input[type="text"]').first().should('have.value', 'Jane');
  });

  it('click filter button sẽ trigger filter action và update state', () => {
    const setActiveFilterStub = cy.stub();
    useAppStore.setState({
      setActiveFilter: setActiveFilterStub
    });
    cy.mount(<ChatList />);
    cy.get('body').contains(/\bDMs\b/).click({ force: true });
    cy.wrap(setActiveFilterStub).should('have.been.called');
    cy.get('.chat-list').should('exist').and('be.visible');
    cy.get('body').contains(/\bGroups\b/).click({ force: true });
    cy.wrap(setActiveFilterStub).should('have.been.called');
    cy.get('.chat-list').should('exist');
    cy.get('body').contains('Team Discussion').should('exist');
    cy.get('body').contains('Jane Smith').should('exist');
  });
});