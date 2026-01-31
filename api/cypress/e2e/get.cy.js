describe("GET /api/users", () => {
  const heroes = [
    {
      name: "Charles Xavier",
      email: "professorx@xmen.com",
      password: "pwd123",
    },
    {
      name: "Logan",
      email: "wolverine@xmen.com",
      password: "pwd123",
    },
    {
      name: "Jean Grey",
      email: "jean.grey@xmen.com",
      password: "pwd123",
    },
    {
      name: "Scott Summers",
      email: "cyclops@xmen.com",
      password: "pwd123",
    },
    {
      name: "Ororo Munroe",
      email: "storm@xmen.com",
      password: "pwd123",
    },
  ];
  before(() => {
    heroes.forEach((hero) => {
      cy.postUser(hero);
    });
  });

  it("Deve retornar uma lista de usuarios", () => {
    cy.getUsers().then((response) => {
      expect(response.status).to.eq(200);

      heroes.forEach((hero) => {
        const user = response.body.find((user) => user.email === hero.email);
        expect(user.name).to.eq(hero.name);
        expect(user.email).to.eq(hero.email);
        expect(user).to.have.property("id");
      });
    });
  });
});
