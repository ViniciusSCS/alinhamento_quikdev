// const people = require("../../app")
// const supertest = require("supertest")
// const request = supertest(people)]

const models = require('../../src/app/models')

describe("Autenticação", () => {
    it("Cadastrando Test", async () => {
        const people = await models.people.create({
            name: 'Teste Testando',
            email: 'teste.testando@jest.test',
            usarname: 'teste.testando',
            password: '12@45A78b',
            passwordConfirmation: '12@45A78b',
            profileId: 1
        })

        console.log(people);
        expect(people.email).toBe('teste.testando@jest.test')
    })
})

