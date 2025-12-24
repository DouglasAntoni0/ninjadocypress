import {personal, company} from '../fixtures/consultancy.json'


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

        cy.contains('label', 'Nome Completo').parent().find('p').should('contain.text', 'Campo obrigatório').and('have.class', 'text-red-400')
        cy.contains('label', 'Email').parent().find('p').should('contain.text', 'Campo obrigatório').and('have.class', 'text-red-400')
        cy.contains('label', 'termos de uso').parent().find('p').should('contain.text', 'Você precisa aceitar os termos de uso').and('have.class', 'text-red-400')
    })


it('Deve solicitar consultoria In Company', () => {
        cy.fillConsultancyForm(company)

        cy.submitConsultancyForm()

        cy.validateConsultancySuccessModal()
    })
})