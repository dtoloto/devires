import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITypeRepository from '@modules/types/repositories/ITypeRepository';

import IUserRepository from '../repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  id: string;
}

@injectable()
class IndexUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TypeRepository')
    private typeRepository: ITypeRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<User[]> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Invalid User id');
    }

    const type = await this.typeRepository.findById(user.type_id);

    if (type && type.name !== 'root' && type.name !== 'admin') {
      throw new AppError('Only root and admin can index all users', 401);
    }

    return this.userRepository.findAll();
  }
}

export default IndexUserService;
