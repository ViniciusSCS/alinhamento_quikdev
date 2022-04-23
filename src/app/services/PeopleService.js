class PeopleService {
  constructor(peopleRepository) {
    this.peopleRepository = peopleRepository;
  }

  async cadastrar(people) {
    await this.peopleRepository.create(people);

    return { people };
  }
}

module.exports = PeopleService;
