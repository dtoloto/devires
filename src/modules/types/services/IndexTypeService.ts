import { injectable, inject } from 'tsyringe';
import Type from '../infra/typeorm/entities/Type';

import ITypesRepository from '../repositories/ITypeRepository';

interface IResponse {
  types: Type[];
}

@injectable()
class IndexTypeService {
  constructor(
    @inject('TypesRepository')
    private typesRepository: ITypesRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const types = await this.typesRepository.findAll();

    return { types };
  }
}

export default IndexTypeService;
