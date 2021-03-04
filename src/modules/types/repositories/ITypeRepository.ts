import Type from '../infra/typeorm/entities/Type';
import ICreateTypeDTO from '../dtos/ICreateTypeDTO';

export default interface ITypesRepository {
  findAll(): Promise<Type[]>;
  findById(id: string): Promise<Type | undefined>;
  findByName(name: string): Promise<Type | undefined>;
  create(data: ICreateTypeDTO): Promise<Type>;
  save(type: Type): Promise<Type>;
}
