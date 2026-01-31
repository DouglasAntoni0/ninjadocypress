describe("POST /api/users/register", () => {
  it("Deve cadastrar um novo usuário com sucesso", () => {
    const user = {
      name: "Wolverine",
      email: "wolverine@teste.com",
      password: "123456",
    };

    cy.task("deleteUser", user.email);

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("User successfully registered");
      expect(response.body.user.id.toString()).to.match(/^-?\d+$/);
      expect(response.body.user.name).to.eq(user.name);
      expect(response.body.user.email).to.eq(user.email);
    });
  });

  it("Não deve cadastrar com email duplicado", () => {
    const user = {
      name: "Cyclops",
      email: "cyclops@teste.com",
      password: "123456",
    };

    cy.task("deleteUser", user.email);

    // Primeira tentativa: cadastra com sucesso
    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201);
    });

    // Segunda tentativa: tenta cadastrar o mesmo user e espera o erro
    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body.error).to.eq("Email already registered");
    });
  });

  context("Validação de campos obrigatórios", () => {
    it("Não deve cadastrar sem o campo email", () => {
      const user = {
        name: "Jean Grey",
        password: "123456",
      };

      cy.postUser(user).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq("Email field is required");
      });
    });

    it("Não deve cadastrar sem o campo name", () => {
      const user = {
        email: "storm@xmen.com",
        password: "123456",
      };

      cy.postUser(user).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq("Name field is required");
      });
    });

    it("Não deve cadastrar sem o campo password", () => {
      const user = {
        name: "Chavier Careca",
        email: "chavier@teste.com",
      };

      cy.postUser(user).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq("Password field is required");
      });
    });

    it("Não deve passar quando o JSON estiver mal formatado (falta virgula)", () => {
      const user = `{
        "name": "Douglas Antonio",
        "email": "douglas.teste@gmail.com"
        "password": "123456"
      }`;

      cy.postUser(user).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  });
});
