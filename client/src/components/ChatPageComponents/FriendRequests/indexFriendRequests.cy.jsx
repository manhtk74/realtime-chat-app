import React from 'react'
import FriendRequests from './index'
import { useAppStore } from '../../../store'

describe('<FriendRequests />', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    useAppStore.setState({
      friendRequests: [
        {
          _id: '1',
          firstName: 'Alice',
          lastName: 'Johnson',
          email: 'alice@example.com',
          image: null
        },
        {
          _id: '2',
          firstName: 'Bob',
          lastName: 'Smith',
          email: 'bob@example.com',
          image: 'https://www.pixelstalk.net/wp-content/uploads/2016/10/Desktop-nature-photo-hd-download-free.jpg'
        }
      ],
      setFriendRequests: cy.stub()
    })

    cy.intercept('GET', '**/get-friend-requests', {
      statusCode: 200,
      body: { 
        friendRequests: [
          {
            _id: '1',
            firstName: 'Alice',
            lastName: 'Johnson',
            email: 'alice@example.com'
          },
          {
            _id: '2',
            firstName: 'Bob',
            lastName: 'Smith',
            email: 'bob@example.com'
          }
        ]
      }
    })

    cy.intercept('POST', '**/search-friend-requests', {
      statusCode: 200,
      body: { searchedFriendRequests: [] }
    })
  })

  it('hiển thị component friend requests', () => {
    cy.mount(<FriendRequests />)
    cy.get('.friend-requests').should('exist').and('be.visible')
    cy.get('.header').should('exist')
    cy.get('h1').should('contain.text', 'Friend Requests').and('be.visible')
    cy.get('.search-form').should('exist')
    cy.get('input[placeholder="Search a request"]').should('exist').and('be.visible')
    cy.get('.search-icon').should('exist')
    cy.get('.search-icon svg').should('be.visible')
    cy.get('.request-chats-container').should('exist').and('be.visible')
    cy.get('.filler-container').should('have.length.greaterThan', 0)
    cy.get('.scrollbar-triangle').should('exist')
  })

  it('chức năng search', () => {
    cy.mount(<FriendRequests />)
    cy.get('input#search').should('have.value', '')
    cy.get('.search-icon').should('exist')
    cy.get('.search-go-back-arrow').should('not.exist')
    cy.get('input#search').type('Alice', { force: true })
    cy.get('input#search').should('have.value', 'Alice')
    cy.get('.search-go-back-arrow').should('exist').and('be.visible')
  })

  it('back arrow xóa search input', () => {
    cy.mount(<FriendRequests />)
    cy.get('input#search').type('Bob', { force: true })
    cy.get('input#search').should('have.value', 'Bob')
    cy.get('.search-go-back-arrow').should('exist')
    cy.get('.search-go-back-arrow').click()
    cy.get('input#search').should('have.value', '')
    cy.get('.search-go-back-arrow').should('not.exist')
    cy.get('.search-icon').should('exist')
  })

  it('hover nút đồng ý thay đổi giao diện', () => {
    cy.mount(<FriendRequests />)
    cy.get('.icon.approve').should('exist')
    cy.get('.icon.approve').first().should('be.visible')
    cy.get('.icon.approve').first().trigger('mouseenter')
    cy.get('.icon.approve').first().should('be.visible')
  })

  it('hover nút từ chối thay đổi giao diện', () => {
    cy.mount(<FriendRequests />)
    cy.get('.icon.reject').should('exist')
    cy.get('.icon.reject').first().should('be.visible')
    cy.get('.icon.reject').first().trigger('mouseenter')
    cy.get('.icon.reject').first().should('be.visible')
  })
})