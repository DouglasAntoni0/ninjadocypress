import {personal, company} from '../fixtures/consultancy.json'


describe('Formulario de Consultoria', () => {

    beforeEach(() => {
        cy.login() 
        cy.goTo('Formulários', 'Consultoria')
        cy.fixture('consultancy').as('consultancyData')
    })

    it('Deve solicitar consultoria individual', () => {

        cy.get('#name').type(personal.name)
        cy.get('input[placeholder="Digite seu email"]').type(personal.email)
        cy.get('input[placeholder="(00) 00000-0000"]').type(personal.phone).should('have.value', '(11) 99999-1000')

        cy.contains('label', 'Tipo de Consultoria').parent().find('select').select(personal.consultancyType)

        if (personal.personType === 'cpf') {
            cy.contains('label', 'Pessoa Física').find('input').click().should('be.checked')
        } else if (personal.personType === 'cnpj') { // Melhor usar else if
            cy.contains('label', 'Pessoa Jurídica').find('input').click().should('be.checked')
        }

        cy.contains('label', 'CPF').parent().find('input').type(personal.document).should('have.value', '123.456.789-10',)

        personal.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel).find('input')
            .check().should('be.checked')
        })

        cy.get('input[type="file"]').selectFile(personal.file, { force: true })

        cy.get('#details').type(personal.description)

        personal.techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
              .type(tech)
              .type('{enter}')
            
            cy.contains('label', 'Tecnologias').parent().contains('span', tech).should('be.visible')
        })

        if (personal.terms === true) {
            cy.contains('label', 'termos de uso').find('input').check().should('be.checked')
        }

        cy.contains('button', 'Enviar formulário').click()

        cy.get('.modal', { timeout: 7000 })
          .should('be.visible')
          .find('.modal-content')
          .should('be.visible')
          .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    })

    it('Deve verificar os campos obrigatorios', () => {
        cy.contains('button', 'Enviar formulário').click()

        cy.contains('label', 'Nome Completo').parent().find('p').should('contain.text', 'Campo obrigatório').and('have.class', 'text-red-400')
        cy.contains('label', 'Email').parent().find('p').should('contain.text', 'Campo obrigatório').and('have.class', 'text-red-400')
        cy.contains('label', 'termos de uso').parent().find('p').should('contain.text', 'Você precisa aceitar os termos de uso').and('have.class', 'text-red-400')
    })


it('Deve solicitar consultoria In Company', () => {


        cy.get('#name').type(company.name)
        cy.get('input[placeholder="Digite seu email"]').type(company.email)
        cy.get('input[placeholder="(00) 00000-0000"]').type(company.phone).should('have.value', '(11) 99999-1000')

        cy.contains('label', 'Tipo de Consultoria').parent().find('select').select(company.consultancyType)

        if (company.personType === 'cnpj') {
            cy.contains('label', 'Pessoa Jurídica').find('input').click().should('be.checked')
        } else if (company.personType === 'cpf') { 
            cy.contains('label', 'Pessoa Física').find('input').click().should('be.checked')
        }

        cy.contains('label', 'CNPJ').parent().find('input').type(company.document).should('have.value', '12.728.543/0001-09',)

        company.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel).find('input')
            .check().should('be.checked')
        })

        cy.get('input[type="file"]').selectFile(company.file, { force: true })

        cy.get('#details').type(company.description)

        company.techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
              .type(tech)
              .type('{enter}')
            
            cy.contains('label', 'Tecnologias').parent().contains('span', tech).should('be.visible')
        })

        if (company.terms === true) {
            cy.contains('label', 'termos de uso').find('input').check().should('be.checked')
        }

        cy.contains('button', 'Enviar formulário').click()

        cy.get('.modal', { timeout: 7000 })
          .should('be.visible')
          .find('.modal-content')
          .should('be.visible')
          .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    })
})