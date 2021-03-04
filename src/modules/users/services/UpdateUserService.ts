import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITypeRepository from '@modules/types/repositories/ITypeRepository';
import User from '../infra/typeorm/entities/User';

import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  currentUserId: string;
  name: string;
  id: string;
  password: string;
  type_id: string;
  email: string;
  status: boolean;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TypeRepository')
    private typeRepository: ITypeRepository,
  ) {}

  public async execute({
    currentUserId,
    id,
    name,
    password,
    type_id,
    email,
    status,
  }: IRequest): Promise<User> {
    const currentUser = await this.userRepository.findById(currentUserId);

    if (!currentUser) {
      throw new AppError('Invalid current user id');
    }

    const currentUserType = await this.typeRepository.findById(
      currentUser.type_id,
    );

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Invalid User Id');
    }

    if (
      currentUserType &&
      currentUserType.name !== 'root' &&
      currentUserType.name !== 'admin' &&
      currentUserId !== user.id
    ) {
      throw new AppError('Current user is not root/admin', 401);
    }

    const typeExists = await this.typeRepository.findById(type_id);

    if (!typeExists) {
      throw new AppError('Invalid type id');
    }

    user.name = name;
    user.password = password;
    user.email = email;
    user.status = status;
    if (
      (currentUserType && currentUserType.name === 'root') ||
      (currentUserType && currentUserType.name === 'admin')
    ) {
      user.type_id = typeExists.id;
    }

    return this.userRepository.save(user);
  }
}

export default UpdateUserService;
