import FakeTypeRepository from '@modules/types/repositories/fakes/FakeTypeRepository';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowUserService from './ShowUserService';

let fakeTypeRepository: FakeTypeRepository;
let fakeUserRepository: FakeUserRepository;
let showUserService: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeTypeRepository = new FakeTypeRepository();
    fakeUserRepository = new FakeUserRepository();
    showUserService = new ShowUserService(fakeUserRepository);
  });

  it('should be able to show user profile', async () => {
    const type = await fakeTypeRepository.create({
      name: 'root',
      description: 'Description Type Root',
    });

    const newUser = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456789',
      status: true,
      type_id: type.id,
    });

    const user = await showUserService.execute({
      id: newUser.id,
    });

    expect(user.id).toBe(newUser.id);
  });

  it('should not be able to show user profile if user does not exist', async () => {
    await expect(
      showUserService.execute({
        id: 'invalid-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
