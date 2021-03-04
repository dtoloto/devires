import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
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
  ) {}

  public async execute({
    name,
    password,
    type_id,
    email,
    status,
  }: IRequest): Promise<IResponse> {
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
