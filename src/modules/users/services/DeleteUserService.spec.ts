import FakeTypeRepository from '@modules/types/repositories/fakes/FakeTypeRepository';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import DeleteUserService from './DeleteUserService';

let fakeTypeRepository: FakeTypeRepository;
let fakeUserRepository: FakeUserRepository;
let deleteUserService: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeTypeRepository = new FakeTypeRepository();
    fakeUserRepository = new FakeUserRepository();
    deleteUserService = new DeleteUserService(
      fakeUserRepository,
      fakeTypeRepository,
    );
  });

  it('should be able to delete an user if current user is root', async () => {
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

    const user = await fakeUserRepository.create({
      name: 'John Three',
      email: 'johnthree@email.com',
      password: '123456789',
      status: true,
      type_id: rootType.id,
    });

    const deleted = await deleteUserService.execute({
      rootId: root.id,
      id: user.id,
    });

    expect(deleted).toBe('User deleted');
  });

  it('should not be able to delete an user if current user is not root', async () => {
    const generalType = await fakeTypeRepository.create({
      name: 'general',
      description: 'Description Type General',
    });

    const generalUser = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456789',
      status: true,
      type_id: generalType.id,
    });

    const user = await fakeUserRepository.create({
      name: 'John Three',
      email: 'johnthree@email.com',
      password: '123456789',
      status: true,
      type_id: generalType.id,
    });

    await expect(
      deleteUserService.execute({
        rootId: generalUser.id,
        id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
