const people = require("../../app")
const supertest = require("supertest")
const request = supertest(people)

describe("Pessoa deve realizar login", () => {
    test("Deve logar uma pessoa ao sistema com sucesso", () => {
        let people = {
            email: 'vinicius.siqueira@teste.com.br',
            senha: '123!456A78b',
        }

        return request.post("/people/login")
        .send(people)
        .then(res => {
            expect(res.body)
            expect(res.statusCode).toEqual(200)
        }).catch(e => {
            fail(e)
        })
    })
})