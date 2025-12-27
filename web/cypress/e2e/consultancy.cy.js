import { personal, company } from '../fixtures/consultancy.json'

describe('Formulario de Consultoria', () => {
  beforeEach(() => {
    cy.login()
    cy.goTo('Formulários', 'Consultoria')
    cy.fixture('consultancy').as('consultancyData')
  })

  it('Deve solicitar consultoria individual', () => {
    cy.fillConsultancyForm(personal)
    cy.submitConsultancyForm()
    cy.validateConsultancySuccessModal()
  })

  it('Deve verificar os campos obrigatorios', () => {
    cy.submitConsultancyForm()

    const requiredFields = [
      { label: 'Nome Completo', Message: 'Campo obrigatório' },
      { label: 'Email', Message: 'Campo obrigatório' },
      { label: 'termos de uso', Message: 'Você precisa aceitar os termos de uso' }
    ]

    requiredFields.forEach(({ label, Message }) => {
      cy.contains('label', label)
        .parent()
        .find('p')
        .should('contain.text', Message)
        .and('have.class', 'text-red-400')
    })
  })

  it('Deve solicitar consultoria In Company', () => {
    cy.fillConsultancyForm(company)
    cy.submitConsultancyForm()
    cy.validateConsultancySuccessModal()
  })
})