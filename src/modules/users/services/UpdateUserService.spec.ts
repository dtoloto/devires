import FakeTypeRepository from '@modules/types/repositories/fakes/FakeTypeRepository';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateUserService from './UpdateUserService';

let fakeTypeRepository: FakeTypeRepository;
let fakeUserRepository: FakeUserRepository;
let updateUserService: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeTypeRepository = new FakeTypeRepository();
    fakeUserRepository = new FakeUserRepository();
    updateUserService = new UpdateUserService(
      fakeUserRepository,
      fakeTypeRepository,
    );
  });

  it('should be able to update an user if current user is root', async () => {
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

    const user = await fakeUserRepository.create({
      name: 'John Three',
      email: 'johnthree@email.com',
      password: '123456789',
      status: true,
      type_id: type.id,
    });

    const updatedUser = await updateUserService.execute({
      currentUserId: root.id,
      id: user.id,
      name: 'John Doe Doe',
      email: 'johndoedoe@email.com',
      password: '9987654321',
      status: false,
      type_id: rootType.id,
    });

    expect(updatedUser?.name).toBe('John Doe Doe');
    expect(updatedUser?.email).toBe('johndoedoe@email.com');
    expect(updatedUser?.password).toBe('9987654321');
    expect(updatedUser?.status).toBe(false);
    expect(updatedUser?.type_id).toBe(rootType.id);
  });

  it('should be able to update an user if current user is admin', async () => {
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

    const user = await fakeUserRepository.create({
      name: 'John Three',
      email: 'johnthree@email.com',
      password: '123456789',
      status: true,
      type_id: type.id,
    });

    const updatedUser = await updateUserService.execute({
      currentUserId: admin.id,
      id: user.id,
      name: 'John Doe Doe',
      email: 'johndoedoe@email.com',
      password: '9987654321',
      status: false,
      type_id: adminType.id,
    });

    expect(updatedUser?.name).toBe('John Doe Doe');
    expect(updatedUser?.email).toBe('johndoedoe@email.com');
    expect(updatedUser?.password).toBe('9987654321');
    expect(updatedUser?.status).toBe(false);
    expect(updatedUser?.type_id).toBe(adminType.id);
  });

  it('should be able to update everything but the type on his own profile, if his type is not root or admin', async () => {
    const type = await fakeTypeRepository.create({
      name: 'general',
      description: 'Description General',
    });

    const rootType = await fakeTypeRepository.create({
      name: 'root',
      description: 'Description Root',
    });

    const user = await fakeUserRepository.create({
      name: 'John Three',
      email: 'johnthree@email.com',
      password: '123456789',
      status: true,
      type_id: type.id,
    });

    const updatedUser = await updateUserService.execute({
      currentUserId: user.id,
      id: user.id,
      name: 'John Doe Doe',
      email: 'johndoedoe@email.com',
      password: '9987654321',
      status: false,
      type_id: rootType.id,
    });

    expect(updatedUser?.name).toBe('John Doe Doe');
    expect(updatedUser?.email).toBe('johndoedoe@email.com');
    expect(updatedUser?.password).toBe('9987654321');
    expect(updatedUser?.status).toBe(false);
    expect(updatedUser?.type_id).toBe(type.id);
  });

  it('should not be able to update other user if current user is not root or admin', async () => {
    const type = await fakeTypeRepository.create({
      name: 'general',
      description: 'Description General',
    });

    const fakeUser = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456789',
      status: true,
      type_id: type.id,
    });

    const user = await fakeUserRepository.create({
      name: 'John Three',
      email: 'johnthree@email.com',
      password: '123456789',
      status: true,
      type_id: type.id,
    });

    await expect(
      updateUserService.execute({
        currentUserId: fakeUser.id,
        id: user.id,
        name: 'John Doe Doe',
        email: 'johndoedoe@email.com',
        password: '9987654321',
        status: false,
        type_id: type.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an user that does not exist', async () => {
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
      updateUserService.execute({
        currentUserId: root.id,
        id: 'invalid-user-id',
        name: 'John Doe Doe',
        email: 'johndoedoe@email.com',
        password: '9987654321',
        status: false,
        type_id: rootType.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an user if current user does not exist', async () => {
    const type = await fakeTypeRepository.create({
      name: 'general',
      description: 'Description Type General',
    });

    await expect(
      updateUserService.execute({
        currentUserId: 'invalid-user-id',
        id: 'invalid-user-id',
        name: 'John Doe Doe',
        email: 'johndoedoe@email.com',
        password: '9987654321',
        status: false,
        type_id: type.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an user with invalid type id', async () => {
    const type = await fakeTypeRepository.create({
      name: 'general',
      description: 'Description General',
    });

    const user = await fakeUserRepository.create({
      name: 'John Three',
      email: 'johnthree@email.com',
      password: '123456789',
      status: true,
      type_id: type.id,
    });

    await expect(
      updateUserService.execute({
        currentUserId: user.id,
        id: user.id,
        name: 'John Doe Doe',
        email: 'johndoedoe@email.com',
        password: '9987654321',
        status: false,
        type_id: 'invalid-type-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
