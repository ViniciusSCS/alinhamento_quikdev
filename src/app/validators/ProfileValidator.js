const yup = require('yup')

const validarCadastro = (body) => {
  const validaCampos = yup.object().shape({
    description: yup
      .string('Erro: Necessário preencher o campo descrição')
      .required('Erro: Necessário preencher o campo descrição')
  })

  return validaCampos.validate(body, { abortEarly: false, stripUnknown: true })
}

module.exports = {
  validarCadastro
}
