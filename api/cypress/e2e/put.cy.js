describe('PUT /api/users/:id', () => {
   


    context('Atualização', () => {
        let userId

    const originalUsers = {
        name: 'Peter Parker',
        email: 'parker@starker.com',
        password: '1234567'
    }
      
    const updatedUsers= {
        name: 'Spiderman',
        email: 'spider@marvel.com',
        password: '7654321'

    }

    before(()=> {
        cy.task('deleteUser', originalUsers.email)
        cy.task('deleteUser', updatedUsers.email)
        cy.postUser(originalUsers).then(response => {
            cy.log(response.body.user.id)
            userId = response.body.user.id
        })
        })

    it('Deve atualizar um usuário existente', () => {
       
        cy.putUser(userId, updatedUsers).then((response) => {
            expect(response.status).to.eq(204)
        })
    })
    after(() => {
        cy.getUsers().then((response) => {
            const spider = response.body.find(user => user.id === userId)
            expect(spider).to.exist
            expect(spider.name).to.eq(updatedUsers.name)
            expect(spider.email).to.eq(updatedUsers.email)
        })
    })

    })



    context('Quando o id não existe', () => {
     let userId

     const originalUsers = {
        name: 'Tony Stark',
      email: 'tony@gmail.com',
        password: '123456678'
    }

    const updatedUsers= {
        name: 'Homem de Ferro',
      email: 'ferr@nada.com',
        password: '87654321'

    }



    before(()=> {
        cy.task('deleteUser', originalUsers.email)

        cy.postUser(originalUsers).then(response => {
            cy.log(response.body.user.id)
            userId = response.body.user.id
        })

        cy.task('deleteUser', originalUsers.email)

    })
    

    it('Deve retornar 404 user not found', () => {
        cy.api({
            method: 'PUT',
            url: 'http://localhost:3333/api/users/' + userId,
            headers: {
                'Content-Type': 'application/json',
            },
            body: updatedUsers,

            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body.error).to.eq('User not found.')
        })
})

})

    context('Validação de campos obrigatórios', () => {
        it('Não deve cadastrar sem o campo email', () => {
      const user = {
        name: 'Jean Grey',
        password: '123456'
      }

      cy.putUser(1, user).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Email field is required')
      })
    })

    it('Não deve cadastrar sem o campo name', () => {
      const user = {
        email: 'storm@xmen.com',
        password: '123456'
      }

      cy.putUser(1, user).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Name field is required')
      })
    })

    it('Não deve cadastrar sem o campo password', () => {
      const user = {
        name: 'Chavier Careca',
        email: 'chavier@teste.com'
      }

      cy.putUser(1, user).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Password field is required')
      })
    })

    it('Não deve passar quando o JSON estiver mal formatado (falta virgula)', () => {
      const user = `{
        "name": "Douglas Antonio",
        "email": "douglas.teste@gmail.com"
        "password": "123456"
      }`

      cy.putUser(1, user).then((response) => {
        expect(response.status).to.eq(400)
      })
    })
})
})
