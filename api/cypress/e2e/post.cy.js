import { faker } from '@faker-js/faker'

describe('POST /api/users/register', () => {

  it('Deve cadastrar um novo usuário com sucesso', () => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: '123456'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('User successfully registered')
      expect(response.body.user.id.toString()).to.match(/^-?\d+$/)
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)
    })
  })

  it('Não deve cadastrar com email duplicado', () => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: '123456'
    }

    // Primeira tentativa: cadastra com sucesso
    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
    })

    // Segunda tentativa: tenta cadastrar o mesmo user e espera o erro
    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(409)
      expect(response.body.error).to.eq('Email already registered')
    })
  })

  context('Validação de campos obrigatórios', () => {
    
    it('Não deve cadastrar sem o campo email', () => {
      const user = {
        name: faker.person.fullName(),
        password: '123456'
      }

      cy.postUser(user).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Email field is required')
      })
    })

    it('Não deve cadastrar sem o campo name', () => {
      const user = {
        email: faker.internet.email(),
        password: '123456'
      }

      cy.postUser(user).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Name field is required')
      })
    })

    it('Não deve cadastrar sem o campo password', () => {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email()
      }

      cy.postUser(user).then((response) => {
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

      cy.postUser(user).then((response) => {

        expect(response.status).to.eq(400)
      })
    })

  })
})

Cypress.Commands.add('postUser', (user) => {
  return cy.api({
    method: 'POST',
    url: 'http://localhost:3333/api/users/register',
    body: user,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  })
})