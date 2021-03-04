import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITypeRepository from '@modules/types/repositories/ITypeRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  name: string;
  password: string;
  email: string;
  status: boolean;
}

interface IResponse {
  user: User;
}

@injectable()
class CreateRootUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TypeRepository')
    private typeRepository: ITypeRepository,
  ) {}

  public async execute({
    name,
    password,
    email,
    status,
  }: IRequest): Promise<IResponse> {
    const type = await this.typeRepository.findByName('root');

    if (!type) {
      throw new AppError('Type does not exist');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      password: hashedPassword,
      type_id: type?.id,
      email,
      status,
    });
    return { user };
  }
}

export default CreateRootUserService;
