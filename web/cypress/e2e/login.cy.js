describe('Login', () => {

  function getTodayDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // months start at 0 🤡
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
}


  it('Deve logar com sucesso', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

      cy.getCookie('login_date').should('exist')

      cy.getCookie('login_date').should((cookie)=> {
        expect(cookie.value).to.eq(getTodayDate())
      })

      cy.window().then((win) => {
       const token = win.localStorage.getItem('token')
        expect(token).to.match(/^[a-fA-F0-9]{32}$/)
      })
  })

  it('Não deve logar com senha invalida', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana321')
    cy.contains('Acesso negado! Tente novamente.').should('be.visible')
  })

  it('Não deve logar com email invalido', () => {
    cy.start()
    cy.submitLoginForm('pare@webdojo.com', 'katana123')
    cy.contains('Acesso negado! Tente novamente.').should('be.visible')
  })
})