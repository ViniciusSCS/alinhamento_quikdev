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

  return validaCampos.validate(body, { abortEarly: false, stripUnknown: true });
};

const validarLogin = (body) => {
  const validaCampos = yup.object().shape({
    email: yup
      .string()
      .typeError("E-mail inválido")
      .email("Necessário preencher o campo com um e-mail válido")
      .required("Necessário preencher o campo e-mail"),
    senha: yup
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

module.exports = {
  validarCadastro,
  validarLogin,
};
