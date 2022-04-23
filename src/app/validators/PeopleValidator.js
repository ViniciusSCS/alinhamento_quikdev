const yup = require("yup");
require("yup-password")(yup);

const validarCadastro = (body) => {
  const validaCampos = yup.object().shape({
    cpf: yup
      .string("Erro: Necessário preencher o campo CPF")
      .required("Erro: Necessário preencher o campo CPF")
      .length(11, "Erro: Necessário preencher o campo com um CPF válido"),
    name: yup
      .string("Erro: Necessário preencher o campo nome")
      .required("Erro: Necessário preencher o campo nome"),
  });

  return validaCampos.validate(body, { abortEarly: false, stripUnknown: true });
};
module.exports = {
  validarCadastro,
};
