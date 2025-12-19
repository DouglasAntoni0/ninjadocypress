describe('Simulando Mauseover', ()=>{
    it('Deve mostrar um texto ao passar o mause em cima do link do intagram',()=>{
        cy.login()

        cy.contains('Isso é Mouseover!').should('not.exist')
        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!').should('exist')







    })




})