const randomString = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5)
const randomName = randomString()
const randomSurName = randomString()
const randomEmail = `${randomString()}@test.com`
const randomPassword = `A@!${randomString()}`

const url = 'http://localhost:5000'

describe('Main App', () => {
  beforeEach(() => {
    cy.visit(url)
  })

  it('user can sign up', function () {
    cy.contains('account').click()
    cy.get('#text-name').type(randomName)
    cy.get('#text-surname').type(randomSurName)
    cy.get('#email-email').type(randomEmail)
    cy.get('#password-password').type(randomPassword)
    cy.contains('Sign Up').click()

    cy.contains(`Welcome ${randomName} ${randomSurName}!`)

    cy.contains('Users')
    cy.contains(randomName)
    cy.contains(randomSurName)
    cy.contains(randomEmail)
  })

  it('user can login & logout', function () {
    cy.get('#email-email').type(randomEmail)
    cy.get('#password-password').type(randomPassword)
    cy.contains('Log In').click()

    cy.contains(`Welcome ${randomName} ${randomSurName}!`)

    cy.contains('Users')
    cy.contains(randomName)
    cy.contains(randomSurName)
    cy.contains(randomEmail)

    cy.contains('Logout').click()
    cy.contains('Logout')

    cy.contains(`Hi ${randomName}! Are you sure you want to log out?`)
    cy.contains('Now').click()

    cy.contains('Login')
  })

  it('other user can not sign up with same email', function () {
    cy.contains('account').click()
    cy.get('#text-name').type(randomName)
    cy.get('#text-surname').type(randomSurName)
    cy.get('#email-email').type(randomEmail)
    cy.get('#password-password').type(randomPassword)
    cy.contains('Sign Up').click()

    cy.contains('Email already exists')
  })

  it('strong password is required', function () {
    cy.contains('account').click()
    cy.get('#text-name').type(randomName)
    cy.get('#text-surname').type(randomSurName)
    cy.get('#email-email').type('test@test.com')
    cy.get('#password-password').type('admin')
    cy.contains('Sign Up').click()

    cy.contains('password is too weak')
    cy.contains('password must be longer than or equal to 8 characters')
  })

  it('users page is under login restrictions', function () {
    cy.visit(`${url}/users`)
    cy.contains('Users')
    cy.contains('Unauthorized')
  })

  it('there is page 404 & allow return to home (login)', function () {
    cy.visit(`${url}/xxxxxx`)
    cy.contains('404')
    cy.contains('home').click()
    cy.url().should('be.equal', `${url}/`)
  })
})

