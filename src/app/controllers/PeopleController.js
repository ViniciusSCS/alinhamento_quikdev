const jwt = require("jsonwebtoken");
const models = require("../models/index");
const bcrypt = require("bcrypt");
const yup = require("yup");
require("yup-password")(yup);

var salt = bcrypt.genSaltSync(parseInt(process.env.SALT));

class PeopleController {
  async store(req, res) {
    try {
      const { body } = req;

      await validaCampos(body);

      const senhaEncriptografada = await atualizaSenha(body.senha);
      body.senha = senhaEncriptografada;

      const access = gerarTokenAccess(body);

      await models.people.create(body);

      const people = Object.assign({}, body);
      delete people.senha;
      delete people.confirmacaoSenha;

      return res.status(200).json({
        data: people,
        token: access,
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
    const body = await models.people.findAll();

    const people = Object.assign({}, body.to);
    delete people.senha;

    return res.status(200).json({ data: body });
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;

      await validaCampos(body);

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

function validaCampos(body) {
  const validaCampos = yup.object().shape({
    cpf: yup
      .string("Erro: Necessário preencher o campo CPF")
      .required("Erro: Necessário preencher o campo CPF")
      .length(11, "Erro: Necessário preencher o campo com um CPF válido"),
    name: yup
      .string("Erro: Necessário preencher o campo nome")
      .required("Erro: Necessário preencher o campo nome"),
    email: yup
      .string("Erro: Necessário preencher o campo e-mail")
      .required("Erro: Necessário preencher o campo e-mail")
      .email("Erro: Necessário preencher o campo com um e-mail válido"),
    usuario: yup
      .string("Erro: Necessário preencher o campo usuário")
      .required("Erro: Necessário preencher o campo usuário"),
    senha: yup
      .string("Erro: Necessário preencher o campo senha")
      .required("Erro: Necessário preencher o campo senha")
      .min(8, "Senha muito curta, digite pelo menos 8 caracteres")
      .minNumbers(1, "A senha deve conter ao menos um número")
      .minLowercase(1, "A senha deve conter ao menos uma letra minúscula")
      .minUppercase(1, "A senha deve conter ao menos uma letra maiúscula")
      .minSymbols(1, "A senha deve conter ao menos um caracter especial"),
    confirmacaoSenha: yup
      .string()
      .required("ERRO: Confirme a senha")
      .oneOf([yup.ref("senha")], "As senhas devem corresponder"),
  });

  return validaCampos.validate(body, { abortEarly: false });
}

function atualizaSenha(senha, res) {
  try {
    var tokenPass = bcrypt.hashSync(senha, salt);

    const senhaEncriptografada = tokenPass;

    return senhaEncriptografada;
  } catch (e) {
    if (e instanceof yup.ValidationError) {
      return res.status(401).json({
        validaCampos: e.inner.responseErrors(),
      });
    } else {
      return res.status(401).json({
        validaCampos: e.errors,
      });
    }
  }
}

function gerarTokenAccess(body) {
  var secret = new Date();
  var mes =
    secret.getMonth() + 1 != 9
      ? "0" + (secret.getMonth() + 1)
      : secret.getMonth() + 1;
  var dia = secret.getDate() != 9 ? secret.getDate() : "0" + secret.getDate();
  const uuid =
    secret.getFullYear() + mes + dia + Math.floor(1000 + Math.random() * 9000);
  const tokenAccess = jwt.sign({ userId: body.id }, uuid, { expiresIn: 300 });

  return tokenAccess;
}

module.exports = new PeopleController();
