import { uuid } from 'uuidv4';

import ITypeRepository from '@modules/types/repositories/ITypeRepository';
import ICreateTypeDTO from '@modules/types/dtos/ICreateTypeDTO';

import Type from '../../infra/typeorm/entities/Type';

class TypesRespository implements ITypeRepository {
  public types: Type[] = [];

  public async findAll(): Promise<Type[]> {
    return this.types;
  }

  public async findById(id: string): Promise<Type | undefined> {
    const findType = this.types.find(type => type.id === id);
    return findType;
  }

  public async findByName(name: string): Promise<Type | undefined> {
    const findType = this.types.find(type => type.name === name);
    return findType;
  }

  public async create(typeData: ICreateTypeDTO): Promise<Type> {
    const type = new Type();

    Object.assign(type, { id: uuid() }, typeData);

    this.types.push(type);

    return type;
  }

  public async save(type: Type): Promise<Type> {
    const findIndex = this.types.findIndex(findType => findType.id === type.id);

    this.types[findIndex] = type;

    return type;
  }
}

export default TypesRespository;
