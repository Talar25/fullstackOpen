describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user1 = {
      name: 'Pluto Mouse',
      username: 'Pluto',
      password: 'pluto123',
    }
    const user2 = {
      name: 'Micky Mouse',
      username: 'Micky',
      password: 'micky123',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Pluto')
      cy.get('#password').type('pluto123')
      cy.get('#login-button').click()

      cy.contains('Logged as Pluto')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Pluto')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('Pluto')
      cy.get('#password').type('pluto123')
      cy.contains('login').click()

      cy.contains('Logged as Pluto')
    })

    it('A blog can be created', function () {
      cy.login({ username: 'Pluto', password: 'pluto123' })
      cy.get('#toggle-button').click()
      cy.get('#title').type('test')
      cy.get('#author').type('test')
      cy.get('#url').type('test')

      cy.get('#create-button').click({ force: true })
    })

    describe('blog exists', function () {
      beforeEach(function () {
        cy.login({ username: 'Pluto', password: 'pluto123' })
        cy.get('#toggle-button').click()
        cy.get('#title').type('test')
        cy.get('#author').type('test')
        cy.get('#url').type('test')
        cy.get('#create-button').click({ force: true })
      })

      it('user can add likes', function () {
        cy.contains('view').click()
        cy.contains('0')
        cy.get('.btn-like').click()
        cy.contains('likes 1')
      })

      it('user can delete it', function () {
        cy.login({ username: 'Pluto', password: 'pluto123' })
        cy.contains('view').click()
        cy.contains('delete').click()
        cy.contains('Blog test was successfully deleted')
      })

      it('user that didnt create a blog cannot delete it', function () {
        cy.contains('logout').click()
        cy.get('#username').type('Micky')
        cy.get('#password').type('micky123')
        cy.contains('login').click()

        cy.contains('Logged as Micky')
        cy.contains('view').click()
        cy.contains('delete').should('not.exist')
      })

      it('blogs are ordered by likes', function () {
        cy.login({ username: 'Micky', password: 'micky123' })
        cy.createBlog({ author: '1', title: '1', url: 'url1', likes: 1 })
        cy.createBlog({ author: '2', title: '2', url: 'url2', likes: 2 })
        cy.createBlog({ author: '3', title: '3', url: 'url3', likes: 3 })

        cy.get('.blog').eq(0).should('contain', '3')
        cy.get('.blog').eq(1).should('contain', '2')
        cy.get('.blog').eq(2).should('contain', '1')
      })
    })
  })
})
