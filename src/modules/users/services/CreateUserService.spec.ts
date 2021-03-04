import AppError from '@shared/errors/AppError';
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
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeTypeRepository,
    );
  });

  it('should be able to create a new user if current user is root', async () => {
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

    const type = await fakeTypeRepository.create({
      name: 'Type One',
      description: 'Description Type One',
    });

    const { user } = await createUserService.execute({
      currentUserId: root.id,
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456789',
      status: true,
      type_id: type.id,
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user if current user is admin', async () => {
    const adminType = await fakeTypeRepository.create({
      name: 'admin',
      description: 'Description Type Admin',
    });

    const admin = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456789',
      status: true,
      type_id: adminType.id,
    });

    const type = await fakeTypeRepository.create({
      name: 'Type One',
      description: 'Description Type One',
    });

    const { user } = await createUserService.execute({
      currentUserId: admin.id,
      name: 'John Three',
      email: 'johnthree@email.com',
      password: '123456789',
      status: true,
      type_id: type.id,
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user if current user is not root or admin', async () => {
    const generalType = await fakeTypeRepository.create({
      name: 'general',
      description: 'Description Type General',
    });

    const general = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456789',
      status: true,
      type_id: generalType.id,
    });

    const type = await fakeTypeRepository.create({
      name: 'Type One',
      description: 'Description Type One',
    });

    await expect(
      createUserService.execute({
        currentUserId: general.id,
        name: 'John Three',
        email: 'johnthree@email.com',
        password: '123456789',
        status: true,
        type_id: type.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user if current user does not exist', async () => {
    const type = await fakeTypeRepository.create({
      name: 'Type One',
      description: 'Description Type One',
    });

    await expect(
      createUserService.execute({
        currentUserId: 'invalid id',
        name: 'John Three',
        email: 'johnthree@email.com',
        password: '123456789',
        status: true,
        type_id: type.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with invalid type id', async () => {
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

    await expect(
      createUserService.execute({
        currentUserId: root.id,
        name: 'John Three',
        email: 'johnthree@email.com',
        password: '123456789',
        status: true,
        type_id: 'invalid type id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
