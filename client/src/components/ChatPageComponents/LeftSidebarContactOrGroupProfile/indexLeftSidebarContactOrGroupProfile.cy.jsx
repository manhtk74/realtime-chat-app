import React from 'react'
import LeftSidebarContactOrGroupProfile from './index'
import { useAppStore } from '../../../store'

describe('<LeftSidebarContactOrGroupProfile />', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    useAppStore.setState({
      activeIcon: 'contact',
      setActiveIcon: cy.stub(),
      userInfo: {
        id: '1',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe'
      },
      setUserInfo: cy.stub(),
      closeChat: cy.stub(),
      contactOrGroupProfile: {
        _id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        image: 'https://www.pixelstalk.net/wp-content/uploads/2016/10/Desktop-nature-photo-hd-download-free.jpg'
      },
      setSelectedChatType: cy.stub(),
      setSelectedChatData: cy.stub(),
      selectedChatData: null,
      setSelectedChatMessages: cy.stub(),
      setActiveChatId: cy.stub()
    })

    cy.intercept('GET', '**/groups-in-common/**', {
      statusCode: 201,
      body: { groups: [] }
    })

    cy.intercept('GET', '**/group-members/**', {
      statusCode: 200,
      body: { members: [] }
    })

    cy.intercept('GET', '**/contact-files/**', {
      statusCode: 200,
      body: { files: [] }
    })

    cy.intercept('GET', '**/group-files/**', {
      statusCode: 200,
      body: { files: [] }
    })
    cy.intercept('GET', '**/groups/get-groups-in-common/**', {
      statusCode: 200,
      body: { files: [] }
    })
    cy.intercept('GET', '**/contacts/get-contact-files/**', {
      statusCode: 200,
      body: { files: [] }
    })
    cy.intercept('GET', '**/groups/get-group-members/**', {
      statusCode: 200,
      body: { files: [] }
    })
  })

  it('hiển thị component profile contact/group với cấu trúc và UI elements đúng', () => {
    cy.mount(<LeftSidebarContactOrGroupProfile />)
    cy.get('.left-sidebar-contact-or-group-profile').should('exist').and('be.visible')
    cy.get('h1').should('be.visible')
    cy.get('h1').should('contain.text', 'Jane Smith')
    cy.get('.info-container').should('exist')
  })

  it('hiển thị avatar contact với src đúng', () => {
    cy.mount(<LeftSidebarContactOrGroupProfile />)
    cy.get('img.profile-image').should('exist').and('be.visible')
    cy.get('img.profile-image').should('have.attr', 'src').and('include', 'pixelstalk.net')
  })

  it('hiển thị thông tin contact đầy đủ (tên, email, label)', () => {
    cy.mount(<LeftSidebarContactOrGroupProfile />)
    cy.get('h1').should('contain.text', 'Jane')
    cy.get('h1').should('contain.text', 'Smith')
    cy.get('body').should('contain.text', 'jane@example.com')
    cy.get('body').should('contain.text', 'Contact:')
  })

  it('hiển thị label contact và divider đúng', () => {
    cy.mount(<LeftSidebarContactOrGroupProfile />)
    cy.contains('Contact:').should('be.visible')
    cy.get('.contact-info-divider').should('exist')
  })

  it('hiển thị phần groups in common với trạng thái rỗng', () => {
    cy.mount(<LeftSidebarContactOrGroupProfile />)
    cy.contains('Groups in common:').should('be.visible')
    cy.contains('no groups in common').should('exist')
  })

  it('hiển thị phần shared files với cấu trúc đúng', () => {
    cy.mount(<LeftSidebarContactOrGroupProfile />)
    cy.contains('Shared files:').should('be.visible')
    cy.get('.shared-files-placeholder').should('exist')
  })

  it('hiển thị thông báo không có file chia sẻ khi danh sách rỗng', () => {
    cy.mount(<LeftSidebarContactOrGroupProfile />)
    cy.contains('no shared files').should('be.visible')
  })
})