import { getRepository, Repository } from 'typeorm';

import ITypeRepository from '@modules/types/repositories/ITypeRepository';
import ICreateTypeDTO from '@modules/types/dtos/ICreateTypeDTO';

import Type from '../entities/Type';

class TypeRespository implements ITypeRepository {
  private ormRepository: Repository<Type>;

  constructor() {
    this.ormRepository = getRepository(Type);
  }

  public async findById(id: string): Promise<Type | undefined> {
    const type = await this.ormRepository.findOne({ where: { id } });
    return type;
  }

  public async findByName(name: string): Promise<Type | undefined> {
    const type = await this.ormRepository.findOne({ where: { name } });
    return type;
  }

  public async findAll(): Promise<Type[]> {
    const types = await this.ormRepository.find();
    return types;
  }

  public async create(typeData: ICreateTypeDTO): Promise<Type> {
    const type = this.ormRepository.create(typeData);

    await this.ormRepository.save(type);

    return type;
  }

  public async save(type: Type): Promise<Type> {
    return this.ormRepository.save(type);
  }
}

export default TypeRespository;
