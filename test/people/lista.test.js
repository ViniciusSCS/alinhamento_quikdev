const people = require("../../app")
const supertest = require("supertest")
const request = supertest(people)
describe("Cadastro de Pessoa", () => {
    test("Deve listar as pessoas cadastradas com sucesso", async () => {
        return request.get("/people/")
        .then(res => {
            expect(res.body)
            expect(res.statusCode).toEqual(200)
        }).catch(e => {
            fail(e)
        })
    })
})