import 'cypress-real-events'
import './actions/consultancy.actions'

Cypress.Commands.add('start', () => {
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('submitLoginForm', (email, senha) => {
  cy.get('#email').type(email)
  cy.get('#password').type(senha)
  cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
  cy.contains('button', buttonName).should('be.visible').click()
  cy.contains('h1', pageTitle).should('be.visible')
})

function getTodayDate() {
  const today = new Date()

  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0') // Mês começa no 0, aquele 🤡
  const year = today.getFullYear()

  return `${day}/${month}/${year}`
}

Cypress.Commands.add('login', (ui = false) => {
  if (ui === true) {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')
  } else {
    const token = 'e1033d63a53fe66c0fd3451c7fd8f617'
    const loginDate = getTodayDate()

    cy.setCookie('login_date', loginDate)

    // Visita a página já injetando o token no localStorage
    cy.visit('http://localhost:3000/dashboard', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', token)
      }
    })
  }
})