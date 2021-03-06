import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITypeRepository from '@modules/types/repositories/ITypeRepository';

import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  rootId: string;
  id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TypeRepository')
    private typeRepository: ITypeRepository,
  ) {}

  public async execute({ rootId, id }: IRequest): Promise<string> {
    const rootUser = await this.userRepository.findById(rootId);

    if (!rootUser) {
      throw new AppError('Invalid root user id');
    }

    const isRoot = await this.typeRepository.findById(rootUser.type_id);

    if (isRoot && isRoot.name !== 'root') {
      throw new AppError('Only root users can delete other users', 401);
    }

    await this.userRepository.delete(id);

    return 'User deleted';
  }
}

export default DeleteUserService;
