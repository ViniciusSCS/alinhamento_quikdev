const { ValidationError } = require("yup");
const { sendBadRequest, sendInternalServerError } = require("../errors");
const PeopleService = require("../services/PeopleService");
const { validarCadastro } = require("../validators/PeopleValidator");
const models = require("../models/index");

class PeopleController {
  peopleService;

  constructor(peopleRepository) {
    this.peopleService = new PeopleService(peopleRepository);
  }

  async store(req, res) {
    try {
      const { body } = req;

      const validateBody = await validarCadastro(body);

      const payload = await this.peopleService.cadastrar(validateBody);

      if (!payload) {
        return sendBadRequest(req, res, "Não foi possível cadastrar");
      }

      const people = Object.assign({}, body);
      delete people.senha;
      delete people.confirmacaoSenha;

      return res.status(200).json({
        data: payload,
        mensagem: "Pessoa adicionada ao banco de dados com Sucesso!!",
      });
    } catch (e) {
      if (e instanceof ValidationError) {
        return sendBadRequest(req, res, e.inner.responseErrors());
      }

      sendInternalServerError(req, res, e?.message, e);
    }
  }

  async index(req, res) {
    const body = await models.people.findAll();

    const people = Object.assign({}, body.to);
    delete people.senha;

    return res.status(200).json({ data: body });
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;

      await validarCadastro(body);

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
      if (e instanceof ValidationError) {
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

module.exports = PeopleController;
