import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IUserRepository from '../repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  id: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('Invalid user id');
    }
    return user;
  }
}

export default ShowUserService;
