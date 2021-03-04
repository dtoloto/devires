import FakeTypeRepository from '@modules/types/repositories/fakes/FakeTypeRepository';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import IndexUserService from './IndexUserService';

let fakeTypeRepository: FakeTypeRepository;
let fakeUserRepository: FakeUserRepository;
let indexUserService: IndexUserService;

describe('IndexUser', () => {
  beforeEach(() => {
    fakeTypeRepository = new FakeTypeRepository();
    fakeUserRepository = new FakeUserRepository();
    indexUserService = new IndexUserService(
      fakeUserRepository,
      fakeTypeRepository,
    );
  });

  it('should be able to index all users', async () => {
    const rootType = await fakeTypeRepository.create({
      name: 'root',
      description: 'Description Type Root',
    });

    const root = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456789',
      status: true,
      type_id: rootType.id,
    });

    await fakeUserRepository.create({
      name: 'John Three',
      email: 'johnthree@email.com',
      password: '123456789',
      status: true,
      type_id: rootType.id,
    });

    const users = await indexUserService.execute({
      id: root.id,
    });

    expect(users).toHaveLength(2);
  });

  it('should not be able to index all users if user is not root or admin', async () => {
    const generalType = await fakeTypeRepository.create({
      name: 'general',
      description: 'Description Type General',
    });

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456789',
      status: true,
      type_id: generalType.id,
    });

    await expect(
      indexUserService.execute({
        id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to index all users if user does not exist', async () => {
    await expect(
      indexUserService.execute({
        id: 'invalid-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
