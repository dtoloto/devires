import FakeTypeRepository from '@modules/types/repositories/fakes/FakeTypeRepository';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateRootUserService from './CreateRootUserService';

let fakeTypeRepository: FakeTypeRepository;
let fakeUserRepository: FakeUserRepository;
let createRootUserService: CreateRootUserService;

describe('CreateRootUser', () => {
  beforeEach(() => {
    fakeTypeRepository = new FakeTypeRepository();
    fakeUserRepository = new FakeUserRepository();
    createRootUserService = new CreateRootUserService(
      fakeUserRepository,
      fakeTypeRepository,
    );
  });

  it('should be able to create a new root user', async () => {
    await fakeTypeRepository.create({
      name: 'root',
      description: 'Description Type One',
    });

    const { user } = await createRootUserService.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456789',
      status: true,
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new root user if root type does not exist', async () => {
    await expect(
      createRootUserService.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456789',
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
