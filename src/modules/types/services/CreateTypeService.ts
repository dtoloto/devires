import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Type from '../infra/typeorm/entities/Type';

import ITypeRepository from '../repositories/ITypeRepository';

interface IRequest {
  name: string;
  description: string;
}

interface IResponse {
  type: Type;
}

@injectable()
class CreateTypeService {
  constructor(
    @inject('TypeRepository')
    private typeRepository: ITypeRepository,
  ) {}

  public async execute({ name, description }: IRequest): Promise<IResponse> {
    const type = await this.typeRepository.create({
      name,
      description,
    });

    return { type };
  }
}

export default CreateTypeService;
