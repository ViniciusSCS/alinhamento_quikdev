const { ValidationError } = require("yup");
const { sendBadRequest, sendInternalServerError } = require("../errors");
const ProfileService = require("../services/ProfileService");
const { validarCadastro } = require("../validators/ProfileValidator");

class ProfileController {
  profileService;

  constructor(profileRepository) {
    this.profileService = new ProfileService(profileRepository);
  }

  async index(req, res) {
    if (req.profileId == 1) {
      const body = await this.profileService.findAll();

      return res.status(200).json({ data: body });
    } else {
      return res.status(200).json({
        message:
          "ALERT: Usuário NÃO possui permissão para visualizar perfis cadastrados!!",
      });
    }
  }

  async store(req, res) {
    const { body, profileId } = req;

    if (profileId == 1) {
      try {
        const validateBody = await validarCadastro(body);

        const payload = await this.profileService.store(validateBody);

        if (!payload) {
          return sendBadRequest(
            req,
            res,
            "Não foi possível cadastrar o perfil"
          );
        }

        return res.status(200).json({
          data: payload,
          mensagem: "Perfil adicionado ao banco de dados com Sucesso!!",
        });
      } catch (e) {
        if (e instanceof ValidationError) {
          return sendBadRequest(req, res, e.inner.responseErrors());
        }

        sendInternalServerError(req, res, e?.message, e);
      }
    } else {
      return res.status(200).json({
        message:
          "ALERT: Usuário NÃO possui permissão para cadastrar novo perfil!!",
      });
    }
  }
}

module.exports = ProfileController;
