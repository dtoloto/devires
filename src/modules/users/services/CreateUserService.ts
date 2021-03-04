import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITypeRepository from '@modules/types/repositories/ITypeRepository';
import User from '../infra/typeorm/entities/User';

import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  currentUserId: string;
  currentUserTypeId: string;
  name: string;
  password: string;
  type_id: string;
  email: string;
  status: boolean;
}

interface IResponse {
  user: User;
}

@injectable()
class CreateTypeService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TypeRepository')
    private typeRepository: ITypeRepository,
  ) {}

  public async execute({
    currentUserId,
    currentUserTypeId,
    name,
    password,
    type_id,
    email,
    status,
  }: IRequest): Promise<IResponse> {
    const currentUser = await this.userRepository.findById(currentUserId);

    if (!currentUser) {
      throw new AppError('Invalid current user id');
    }

    const currentUserType = await this.typeRepository.findById(
      currentUserTypeId,
    );

    if (
      currentUserType &&
      currentUserType.name !== 'root' &&
      currentUserType.name !== 'admin'
    ) {
      throw new AppError('Current user is not root/admin', 401);
    }

    const typeExists = await this.typeRepository.findById(type_id);

    if (!typeExists) {
      throw new AppError('Invalid type id');
    }

    const user = await this.userRepository.create({
      name,
      password,
      type_id,
      email,
      status,
    });

    return { user };
  }
}

export default CreateTypeService;
