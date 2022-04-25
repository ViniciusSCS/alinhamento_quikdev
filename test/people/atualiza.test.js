const people = require("../../app")
const supertest = require("supertest")
const request = supertest(people)
describe("Pessoa", () => {
    test("Deve atualizar a pessoas cadastrada com sucesso", async () => {
        let people = {
            name: 'Teste Testando',
            email: 'teste.testando@jest.test',
            usarname: 'teste.testando',
            password: '12@45A78b',
            passwordConfirmation: '12@45A78b',
            perfilId: 2
        }

        return request.put("/people/2")
            .send(people)
            .then(res => {
                expect(res.body)
                expect(res.statusCode).toEqual(200)
            }).catch(e => {
                fail(e)
            })
    })
})