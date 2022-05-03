const yup = require("yup");
require("yup-password")(yup);

const validarCadastro = (body) => {
  const validaCampos = yup.object().shape({
    name: yup
      .string("Erro: Necessário preencher o campo nome")
      .required("Erro: Necessário preencher o campo nome"),
    email: yup
      .string("Erro: Necessário preencher o campo e-mail")
      .required("Erro: Necessário preencher o campo e-mail")
      .email("Erro: Necessário preencher o campo com um e-mail válido"),
    username: yup
      .string("Erro: Necessário preencher o campo usuário")
      .required("Erro: Necessário preencher o campo usuário"),
    password: yup
      .string("Erro: Necessário preencher o campo senha")
      .required("Erro: Necessário preencher o campo senha")
      .min(8, "Senha muito curta, digite pelo menos 8 caracteres")
      .minNumbers(1, "A senha deve conter ao menos um número")
      .minLowercase(1, "A senha deve conter ao menos uma letra minúscula")
      .minUppercase(1, "A senha deve conter ao menos uma letra maiúscula")
      .minSymbols(1, "A senha deve conter ao menos um caracter especial"),
    passwordConfirmation: yup
      .string()
      .required("ERRO: Confirme a senha")
      .oneOf([yup.ref("password")], "As senhas devem corresponder"),
    profileId: yup
      .number("Erro: Necessário preencher o campo Perfil")
      .required("Erro: Necessário preencher o campo Perfil"),
  });

  return validaCampos.validate(body, { abortEarly: false, stripUnknown: true });
};

const validarLogin = (body) => {
  const validaCampos = yup.object().shape({
    email: yup
      .string()
      .typeError("E-mail inválido")
      .email("Necessário preencher o campo com um e-mail válido")
      .required("Necessário preencher o campo e-mail"),
    password: yup
      .string()
      .typeError("Senha inválida")
      .min(8, "Senha muito curta, digite pelo menos 8 caracteres")
      .minNumbers(1, "A senha deve conter ao menos um número")
      .minLowercase(1, "A senha deve conter ao menos uma letra minúscula")
      .minUppercase(1, "A senha deve conter ao menos uma letra maiúscula")
      .minSymbols(1, "A senha deve conter ao menos um caracter especial")
      .required("Necessário preencher o campo senha"),
  });

  return validaCampos.validate(body, { abortEarly: false, stripUnknown: true });
};

const validatePassword = (body) => {
  const validatePassword = yup.object().shape({
    password: yup
      .string("Erro: Necessário preencher o campo senha")
      .required("Erro: Necessário preencher o campo senha")
      .min(8, "Senha muito curta, digite pelo menos 8 caracteres")
      .minNumbers(1, "A senha deve conter ao menos um número")
      .minLowercase(1, "A senha deve conter ao menos uma letra minúscula")
      .minUppercase(1, "A senha deve conter ao menos uma letra maiúscula")
      .minSymbols(1, "A senha deve conter ao menos um caracter especial"),
    passwordConfirmation: yup
      .string()
      .required("ERRO: Confirme a senha")
      .oneOf([yup.ref("password")], "As senhas devem corresponder"),
  });

  return validatePassword.validate(body, {
    abortEarly: false,
    stripUnknown: true,
  });
};

module.exports = {
  validarCadastro,
  validatePassword,
  validarLogin,
};
