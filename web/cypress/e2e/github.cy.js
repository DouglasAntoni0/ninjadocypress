describe('Gerenciamento de Perfis no Github', () => {
  beforeEach(() => {
    cy.login()
    cy.goTo('Tabela', 'Perfis do GitHub')
  })

  it('Deve poder cadastrar um novo perfil do github', () => {
    //cy.log('todo')

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
  it('Deve poder remover um perfil do github', () => {
    
     const profile = {
      name: 'Douglas Antonio',
      username: 'qapapito',
      desc: 'QA'

    }
    cy.get('#name').type(profile.name)
    cy.get('#username').type(profile.username)
    cy.get('#profile').type(profile.desc)
    cy.contains('button', 'Adicionar Perfil').click()


    cy.contains('table, tbody tr', profile.username)
      .should('be.visible')
      .as('trProfile')
    cy.get('@trProfile').find('button[title="Remover perfil"]').click()

    cy.contains('table tbody', profile.username)
      .should('not.exist')
 })

 it('Deve validar o link do github', () => {
    
     const profile = {
      name: 'Douglas Antonio',
      username: 'DouglasAntoni0',
      desc: 'QA'

    }
    cy.get('#name').type(profile.name)
    cy.get('#username').type(profile.username)
    cy.get('#profile').type(profile.desc)
    cy.contains('button', 'Adicionar Perfil').click()


    cy.contains('table, tbody tr', profile.username)
      .should('be.visible')
      .as('trProfile')
    cy.get('@trProfile').find('a')
      .should('have.attr', 'href', 'https://github.com/' + profile.username)
      .and('have.attr', 'target', '_blank')

})



})