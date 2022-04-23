const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/auth");
const { encrypt, gerarTokenAccess } = require("../../helpers/bcrypt");
class PeopleService {
  constructor(peopleRepository) {
    this.peopleRepository = peopleRepository;
  }

  async findAll() {
    return await this.peopleRepository.findAll();
  }

  async cadastrar(people) {
    const password = await encrypt(people.senha);
    people.senha = password;

    const access = gerarTokenAccess(people);

    await this.peopleRepository.create(people);

    people = Object.assign({}, people);
    delete people.senha;
    delete people.confirmacaoSenha;

    return { people, token: access };
  }

  async me(userId) {
    const peopleFound = userId
      ? await this.peopleRepository.findOne({ where: { id: userId } })
      : false;

    if (!peopleFound) throw new Error("Usuário não encontrado!");

    const people = Object.assign({}, peopleFound.dataValues);
    delete people.senha;

    return people;
  }

  async atualizar(id, people) {
    const peopleExists = await this.peopleRepository.findOne({
      where: { id: id },
    });

    if (!peopleExists) {
      throw new Error("Pessoa não encontrada");
    }

    const password = await encrypt(people.senha);
    people.senha = password;

    await this.peopleRepository.findByIdAndUpdate(people, {
      where: { id: people.id },
    });

    people = Object.assign({}, people.dataValues);
    delete people.senha;
    delete people.confirmacaoSenha;

    const peopleUpdate = await this.peopleRepository.findOne({
      where: { id: people.id },
    });

    return { peopleUpdate };
  }

  async login(people) {
    const { email, senha } = people;

    const peopleFound = email
      ? await this.peopleRepository.findOne({ email })
      : false;

    if (!peopleFound) throw new Error("E-mail ou senha inválidos!");

    const validPassword = await bcrypt.compare(senha, peopleFound.senha);

    if (!validPassword) throw new Error("E-mail ou senha inválidos!");

    people = Object.assign({}, peopleFound.dataValues);
    delete people.senha;

    const token = jwt.sign({ userId: people.id }, secret, {
      expiresIn: 300,
    });

    return { people, token };
  }
}

module.exports = PeopleService;
