describe('Formulario de Consultoria', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
    })

    it('Deve solicitar consultoria individual', () => {
        

        cy.get('#name').type('Fernando Papito')
        cy.get('input[placeholder="Digite seu email"]').type('papito@teste.com.br')
        cy.get('input[placeholder="(00) 00000-0000"]').type('(11) 99999-1000').should('have.value', '(11) 99999-1000')

        cy.get('#consultancyType').select('Individual')

        cy.contains('label', 'Pessoa Física').find('input').check()

        cy.contains('label', 'Pessoa Jurídica').find('input').should('not.be.checked')

        cy.contains('label', 'CPF').parent().find('input').type('123.456.789-10').should('have.value', '123.456.789-10')

        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ]

        discoveryChannels.forEach(channel => {
            cy.contains('label', channel).find('input').check()

        })

        cy.get('input[type="file"]').selectFile('./cypress/fixtures/linha_do_tempo_restauracao_operacao.pdf', { force: true })

        cy.get('#details').type('Gostaria de agendar uma consultoria individual para discutir estratégias de marketing digital para minha empresa. Tenho interesse em explorar novas abordagens para aumentar nossa presença online e engajamento com o público-alvo. Por favor, me informe sobre a disponibilidade de horários e os próximos passos para agendar a consultoria. Obrigado!')

        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]').type('Cypress').type('{enter}')

        const techs = ['Cypress', 'JavaScript', 'HTML', 'CSS', 'React']


        techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]').type(tech).type('{enter}')
        })

        techs.forEach((tech) => {
            cy.contains('label', 'Tecnologias').parent().contains('span', tech).should('be.visible')
        })

        cy.contains('label', 'termos de uso').find('input').check()

        cy.contains('button', 'Enviar formulário').click()

        cy.get('.modal', {timeout: 7000}).should('be.visible').find('.modal-content').should('be.visible').and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
        
    })

    it('Deve verificar os campos obrigatorios', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.goTo('Formulários', 'Consultoria')
        cy.contains('button', 'Enviar formulário').click()

        cy.contains('label', 'Nome Completo').parent().find('p').should('contain.text', 'Campo obrigatório').and('have.class', 'text-red-400').and('have.css', 'color', 'rgb(248, 113, 113)')
        cy.contains('label', 'Email').parent().find('p').should('contain.text', 'Campo obrigatório').and('have.class', 'text-red-400').and('have.css', 'color', 'rgb(248, 113, 113)')
        cy.contains('label', 'termos de uso').parent().find('p').should('contain.text', 'Você precisa aceitar os termos de uso').and('have.class', 'text-red-400').and('have.css', 'color', 'rgb(248, 113, 113)')



    })

})