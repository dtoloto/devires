import FakeTypeRepository from '@modules/types/repositories/fakes/FakeTypeRepository';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

let fakeTypeRepository: FakeTypeRepository;
let fakeUserRepository: FakeUserRepository;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeTypeRepository = new FakeTypeRepository();
    fakeUserRepository = new FakeUserRepository();
    createUserService = new CreateUserService(fakeUserRepository);
  });

  it('should be able to create a new user', async () => {
    const type = await fakeTypeRepository.create({
      name: 'Type One',
      description: 'Description Type One',
    });

    const { user } = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456789',
      status: true,
      type_id: type.id,
    });

    expect(user).toHaveProperty('id');
  });
});
