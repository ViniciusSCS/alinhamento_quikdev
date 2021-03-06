const people = require("../../app")
const supertest = require("supertest")
const request = supertest(people)
describe("Cadastro de Pessoa", () => {
    test("Deve cadastrar uma pessoa com sucesso", () => {
        let people = {
            name: 'Teste Testando',
            email: 'teste.testando@jest.test',
            usarname: 'teste.testando',
            password: '12@45A78b',
            passwordConfirmation: '12@45A78b',
            perfilId: 2
        }

        return request.post("/people/")
            .send(people)
            .then(res => {
                expect(res.body)
                expect(res.statusCode).toEqual(200)
            }).catch(e => {
                fail(e)
            })
    })
})