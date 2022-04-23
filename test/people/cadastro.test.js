const people = require("../../app")
const supertest = require("supertest")
const request = supertest(people)
describe("Cadastro de Pessoa", () => {
    test("Deve cadastrar uma pessoa com sucesso", () => {
        let people = {
            name: 'Teste Testando',
            email: 'teste.testando@jest.test',
            usuario: 'teste.testando',
            cpf: '12345678910',
            senha: '12@45A78b',
            confirmacaoSenha: '12@45A78b'
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