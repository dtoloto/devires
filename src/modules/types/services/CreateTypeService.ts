import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Type from '../infra/typeorm/entities/Type';

import ITypesRepository from '../repositories/ITypeRepository';

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
    @inject('TypesRepository')
    private typesRepository: ITypesRepository,
  ) {}

  public async execute({ name, description }: IRequest): Promise<IResponse> {
    const type = await this.typesRepository.create({
      name,
      description,
    });

    return { type };
  }
}

export default CreateTypeService;
