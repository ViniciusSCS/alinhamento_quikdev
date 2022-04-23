const models = require("../models/index");
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
    });

    try {
      const body = req.body;

      await validaCampos.validate(body, { abortEarly: false });
      console.log(body);
      await models.people.create(body);

      return res.status(200).json({
        data: body,
        mensagem: "Pessoa adicionada ao banco de dados com Sucesso!!",
      });
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        return res.status(401).json({
          validaCampos: e.inner.responseErrors(),
          message: "ERRO: Usuário não cadastrado!!",
        });
      } else {
        return res.status(401).json({
          validaCampos: e.errors,
          message: "ERRO: Usuário não cadastrado!!",
        });
      }
    }
  }

  async index(req, res) {
    const people = await models.people.findAll();

    return res.status(200).json({ data: people });
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
    });

    try {
      const id = req.params.id;
      const body = req.body;

      await validaCampos.validate(body, { abortEarly: false });

      const peopleExists = await models.people.findOne({ where: { id: id } });

      if (!peopleExists) {
        return res.status(404).json({ msg: "Pessoa não encontrada", data: {} });
      }
      await models.people.update(body, { where: { id: id } });
      const peopleUpdate = await models.people.findOne({ where: { id: id } });
      return res.status(200).json({
        data: peopleUpdate,
        mensagem: "Pessoa atualizada com sucesso",
      });
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        return res.status(401).json({
          validaCampos: e.inner.responseErrors(),
          message: "ERRO: Pessoa não atualizada!!",
        });
      } else {
        return res.status(401).json({
          validaCampos: e.errors,
          message: "ERRO: Pessoa não atualizada!!!!",
        });
      }
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    try {
      const peopleExists = await models.people.findOne({ where: { id: id } });

      if (!peopleExists) {
        return res.status(404).json({ msg: "Pessoa não encontrada", data: {} });
      } else {
        await peopleExists.destroy({ where: { id: id } });
        return res
          .status(200)
          .json({ mensagem: "Pessoa deletada com sucesso" });
      }
    } catch (error) {
      return res.status(400).json({ msg: "Bad request" });
    }
  }
}

module.exports = new PeopleController();
