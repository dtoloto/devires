import { injectable, inject } from 'tsyringe';
import Type from '../infra/typeorm/entities/Type';

import ITypeRepository from '../repositories/ITypeRepository';

interface IResponse {
  types: Type[];
}

@injectable()
class IndexTypeService {
  constructor(
    @inject('TypeRepository')
    private typeRepository: ITypeRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const types = await this.typeRepository.findAll();

    return { types };
  }
}

export default IndexTypeService;
