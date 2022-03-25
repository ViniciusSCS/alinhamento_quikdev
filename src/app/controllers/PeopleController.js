const People = require('../schemas/PeopleSchemas')
const yup = require("yup");

class PeopleController {
    async store(req, res) {
        const validaCampos = yup.object().shape({
            cpf: yup
                .string("Erro: Necessário preencher o campo CPF")
                .required("Erro: Necessário preencher o campo CPF")
                .length(11, "Erro: Necessário preencher o campo com um CPF válido"),
            name: yup
                .string("Erro: Necessário preencher o campo nome")
                .required("Erro: Necessário preencher o campo nome"),
        })

        try {
            const body = req.body;

            await validaCampos.validate(body);
            await People.create(body)

            return res.status(200).json({ data: body, mensagem: 'Pessoa adicionada ao banco de dados com Sucesso!!' });
        } catch (e) {
            return res.status(400).json({
                erro: true,
                mensagem: e.errors,
            });
        }

    }

    async index(reqa, res) {
        const people = await People.find()

        return res.status(200).json({ data: people })
    }

    async update(req, res) {
        const validaCampos = yup.object().shape({
            cpf: yup
                .string("Erro: Necessário preencher o campo CPF")
                .required("Erro: Necessário preencher o campo CPF")
                .length(11, "Erro: Necessário preencher o campo com um CPF válido"),
            name: yup
                .string("Erro: Necessário preencher o campo nome")
                .required("Erro: Necessário preencher o campo nome"),
        })

        try {
            const id = req.params.id
            const body = req.body

            await validaCampos.validate(body);

            try {
                const peopleExists = await People.findById(id)

                if (!peopleExists) {
                    return res.status(404).json({ msg: 'Pessoa não encontrada', data: {} })
                }
                await peopleExists.updateOne(body)
                const peopleUpdate = await People.findById(id)
                return res.status(200).json({ data: peopleUpdate })
            } catch (error) {
                return res.status(400).json({ msg: 'Bad request' })
            }
        } catch (e) {
            return res.status(400).json({
                erro: true,
                mensagem: e.errors,
            });
        }
    }

    async delete(req, res) {
        const id = req.params.id
        try {
            const peopleExists = await People.findById(id)
            if (!peopleExists)
                return res.status(404).json({ msg: 'Pessoa não encontrada', data: {} })
            
            await peopleExists.delete()
            return res.status(200).json({mensagem: "Pessoa deletada com sucesso"})

        } catch (error) {
            return res.status(400).json({msg: 'Bad request'})
        }
    }
}

module.exports = new PeopleController()