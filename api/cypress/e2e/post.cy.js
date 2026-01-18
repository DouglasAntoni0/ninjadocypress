import { faker } from '@faker-js/faker'

describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {


    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: '123456'
    }
    
    cy.request({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: user
    }).then((response) => {
      expect(response.status).to.eq(201)
      
    })
  })
})
  