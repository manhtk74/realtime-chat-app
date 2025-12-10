import React from 'react'
import Chat from './index'

describe('<Chat />', () => {
  // mock data for contact and group contact
  const mockContact = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    image: 'https://www.pixelstalk.net/wp-content/uploads/2016/10/Desktop-nature-photo-hd-download-free.jpg',
    lastMessage: 'Hello, how are you?',
    lastMessageType: 'text',
    lastMessageTime: new Date().toISOString()
  };
  const mockGroupContact = {
    id: '2',
    name: 'Team Chat',
    lastMessage: { content: 'Great project!', messageType: 'text', timestamp: new Date().toISOString() }
  };
  
  it('hiển thị component chat', () => {
    cy.mount(<Chat contact={mockContact} isGroup={false} isActive={false} />);
    cy.get('.chat').should('exist');
    cy.contains('John Doe').should('exist');
    cy.contains('Hello, how are you?').should('exist');
  });

  it('hiển thị avatar contact khi có avatar', () => {
    cy.mount(<Chat contact={mockContact} isGroup={false} isActive={false} />);
    cy.get('img.img').should('have.attr', 'src', 'https://www.pixelstalk.net/wp-content/uploads/2016/10/Desktop-nature-photo-hd-download-free.jpg');
  });

  it('hiển thị chữ cái đầu tiên khi không có avatar', () => {
    const contactWithoutImage = { ...mockContact, image: null };
    cy.mount(<Chat contact={contactWithoutImage} isGroup={false} isActive={false} />);
    cy.get('.img.non-present').should('contain', 'J D'); // First and Last initials
  });

  it('hiển thị component nhóm', () => {
    cy.mount(<Chat contact={mockGroupContact} isGroup={true} isActive={false} />);
    cy.get('.group-img').should('exist');
    cy.contains('Team Chat').should('exist');
    cy.contains('Great project!').should('exist');
  });

  it('hiển thị nội dung tin nhắn cuối cùng', () => {
    cy.mount(<Chat contact={mockContact} isGroup={false} isActive={false} />);
    cy.get('.last-message').should('contain', 'Hello, how are you?');
  });

  it('làm nổi bật chat khi isActive là true', () => {
    cy.mount(<Chat contact={mockContact} isGroup={false} isActive={true} />);
    cy.get('.chat').should('have.class', 'active-chat');
  });

  it('hiển thị icon file khi tin nhắn cuối là file', () => {
    const contactWithFile = {
      ...mockContact,
      lastMessageType: 'file',
      lastMessage: 'https://example.com/documents/file.pdf'
    };
    cy.mount(<Chat contact={contactWithFile} isGroup={false} isActive={false} />);
    cy.get('.last-message-file').should('exist');
  });

  it('hiển thị ... khi tin nhắn dài', () => {
    const contactWithLongMessage = {
      ...mockContact,
      lastMessage: 'This is a very long message that should be shortened with ellipsis to fit properly in the UI component'
    };
    cy.mount(<Chat contact={contactWithLongMessage} isGroup={false} isActive={false} />);
    cy.get('.last-message').should('contain', '...');
  });
});