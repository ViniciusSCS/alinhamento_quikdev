const { ValidationError } = require("yup");
const {
  sendBadRequest,
  sendInternalServerError,
  sendNotFoundError,
} = require("../errors");
const PeopleService = require("../services/PeopleService");
const {
  validarCadastro,
  validarLogin,
} = require("../validators/PeopleValidator");
const models = require("../models/index");

class PeopleController {
  peopleService;

  constructor(peopleRepository) {
    this.peopleService = new PeopleService(peopleRepository);
  }

  async me(req, res) {
    try {
      const { userId } = req;
      const payload = await this.peopleService.me(userId);

      if (!payload)
        return sendNotFoundError(req, res, `Usuário ${userId} não encontrado`);

      return res.status(200).json({
        data: payload,
        message: "Usuário encontrado",
      });
    } catch (error) {
      sendInternalServerError(req, res, error?.message, error);
    }
  }

  async login(req, res) {
    try {
      const { body } = req;

      const validatedBody = await validarLogin(body);

      const payload = await this.peopleService.login(validatedBody);

      if (!payload) return sendBadRequest(req, res, "Não foi possível logar");

      return res.json({
        data: payload,
        message: "Usuário logado com sucesso!",
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendBadRequest(req, res, error.inner.responseErrors());
      }

      sendInternalServerError(req, res, error?.message, error);
    }
  }

  async store(req, res) {
    try {
      const { body } = req;

      const validateBody = await validarCadastro(body);

      const payload = await this.peopleService.cadastrar(validateBody);

      if (!payload) {
        return sendBadRequest(req, res, "Não foi possível cadastrar");
      }

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
    if (req.profileId == 1) {
      const body = await this.peopleService.findAll();

      return res.status(200).json({ data: body });
    } else {
      return res.status(200).json({
        message:
          "ALERT: Usuário NÃO possui permissão para visualizar perfis cadastrados!!",
      });
    }
  }

  async update(req, res) {
    try {
      const { body, userId } = req;

      const validateBody = await validarCadastro(body);

      const payload = await this.peopleService.atualizar(userId, validateBody);

      if (!payload) {
        return sendBadRequest(req, res, "Não foi possível cadastrar");
      }
      return res.status(200).json({
        data: payload,
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
