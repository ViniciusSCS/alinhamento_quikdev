const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/auth')
const { encrypt, gerarTokenAccess } = require('../../helpers/bcrypt')
const models = require('../models/')
class PeopleService {
  constructor (peopleRepository) {
    this.peopleRepository = peopleRepository
  }

  async findAll () {
    const peopleFound = await this.peopleRepository.findAll({
      include: [{ model: models.profile }]
    })

    const people = Object.assign({}, peopleFound.dataValues)
    delete people.password

    return { people }
  }

  async findOne (query) {
    return this.peopleRepository.findOne(query)
  }

  async cadastrar (people) {
    const peopleExist = await this.findOne({ where: { email: people.email } })

    if (peopleExist) {
      throw new Error('Pessoa já cadastrada na Base de Dados!')
    }

    const passwordKey = await encrypt(people.password)
    people.password = passwordKey

    const access = gerarTokenAccess(people)

    await this.peopleRepository.create(people)

    people = Object.assign({}, people)
    delete people.password
    delete people.passwordConfirmation

    return { people, token: access }
  }

  async me (userId) {
    const peopleFound = userId
      ? await this.peopleRepository.findOne({
        where: { id: userId },
        include: [{ model: models.profile }]
      })
      : false

    if (!peopleFound) throw new Error('Usuário não encontrado!')

    const people = Object.assign({}, peopleFound.dataValues)
    delete people.password

    return people
  }

  async atualizar (id, people) {
    const peopleExists = await this.peopleRepository.findOne({
      where: { id }
    })

    if (!peopleExists) {
      throw new Error('Pessoa não encontrada')
    }

    const passwordKey = await encrypt(people.password)
    people.password = passwordKey

    await this.peopleRepository.findByIdAndUpdate(people, {
      where: { id: people.id }
    })

    people = Object.assign({}, people.dataValues)
    delete people.password
    delete people.passwordConfirmation

    const peopleUpdate = await this.peopleRepository.findOne({
      where: { id: people.id }
    })

    return { peopleUpdate }
  }

  async login (people) {
    const { email, password } = people

    const peopleFound = email
      ? await this.peopleRepository.findOne({
        where: { email },
        include: [{ model: models.profile }]
      })
      : false

    if (!peopleFound) throw new Error('E-mail ou senha inválidos!')

    const validPassword = await bcrypt.compare(password, peopleFound.password)

    if (!validPassword) throw new Error('E-mail ou senha inválidos!')

    people = Object.assign({}, peopleFound.dataValues)
    delete people.password

    const token = jwt.sign(
      { userId: people.id, profileId: people.profileId },
      secret,
      {
        expiresIn: 300
      }
    )

    return { people, token }
  }

  async updatePassword (id, people) {
    const peopleExists = await this.peopleRepository.findOne({
      where: { id }
    })

    if (!peopleExists) {
      throw new Error('Pessoa não encontrada')
    }

    const passwordKey = await encrypt(people.password)
    people.password = passwordKey

    await this.peopleRepository.update(people, {
      where: { id: people.id }
    })

    people = Object.assign({}, people)
    delete people.password && delete people.passwordConfirmation

    return { people }
  }
}

module.exports = PeopleService
