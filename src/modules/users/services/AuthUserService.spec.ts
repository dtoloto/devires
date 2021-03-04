import AppError from '@shared/errors/AppError';

import FakeTypeRepository from '@modules/types/repositories/fakes/FakeTypeRepository';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthUserService from './AuthUserService';

let fakeTypeRepository: FakeTypeRepository;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authUserService: AuthUserService;

describe('AuthUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTypeRepository = new FakeTypeRepository();

    authUserService = new AuthUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to auth', async () => {
    const type = await fakeTypeRepository.create({
      name: 'root',
      description: 'Description Type Root',
    });

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456789',
      status: true,
      type_id: type.id,
    });

    const response = await authUserService.execute({
      email: 'johndoe@email.com',
      password: '123456789',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to auth with non existing user', async () => {
    await expect(
      authUserService.execute({
        email: 'non-existing-email',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to auth with wrong password', async () => {
    const type = await fakeTypeRepository.create({
      name: 'root',
      description: 'Description Type Root',
    });

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456789',
      status: true,
      type_id: type.id,
    });

    await expect(
      authUserService.execute({
        email: 'johndoe@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
