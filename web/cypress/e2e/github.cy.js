describe('Gerenciamento de Perfis no Github', () => {
  beforeEach(() => {
    cy.login()
    cy.goTo('Tabela', 'Perfis do GitHub')
  })

  it('Deve poder cadastrar um novo perfil do github', () => {
    cy.log('todo')

    cy.get('#name').type('Douglas Antonio')
    cy.get('#username').type('qapapito')
    cy.get('#profile').type('QA')
    cy.contains('button', 'Adicionar Perfil').click()

    cy.get('#name').type('Douglas Antonio')
    cy.get('#username').type('DouglasAntoni0')
    cy.get('#profile').type('QA')
    cy.contains('button', 'Adicionar Perfil').click()

    cy.contains('table, tbody tr', 'DouglasAntoni0')
      .should('be.visible')
      .as('trProfile')

    cy.get('@trProfile').contains('td', 'Douglas Antonio').should('be.visible')
    cy.get('@trProfile').contains('td', 'QA').should('be.visible')
  })
})