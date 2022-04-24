class PeopleService {
  constructor(profileRepository) {
    this.profileRepository = profileRepository;
  }

  async findAll() {
    return await this.profileRepository.findAll();
  }

  async store(profile) {
    await this.profileRepository.create(profile);

    return { profile };
  }
}

module.exports = PeopleService;
