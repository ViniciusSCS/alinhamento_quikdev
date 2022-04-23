const people = require("../../app")
const supertest = require("supertest")
const request = supertest(people)
describe("Cadastro de Pessoa", () => {
    test("Deve deletar a pessoa cadastrada com sucesso", async () => {
        return request.delete("/people/3")
        .then(res => {
            expect(res.body)
            expect(res.statusCode).toEqual(200)
        }).catch(e => {
            fail(e)
        })
    })
})