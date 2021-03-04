import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITypeRepository from '@modules/types/repositories/ITypeRepository';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  currentUserId: string;
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
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TypeRepository')
    private typeRepository: ITypeRepository,
  ) {}

  public async execute({
    currentUserId,
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
      currentUser.type_id,
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

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      password: hashedPassword,
      type_id,
      email,
      status,
    });

    return { user };
  }
}

export default CreateUserService;
