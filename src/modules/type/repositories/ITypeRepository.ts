import Type from '../infra/typeorm/entities/Type';
import ICreateTypeDTO from '../dtos/ICreateTypeDTO';

export default interface ITypesRepository {
  findById(id: string): Promise<Type | undefined>;
  create(data: ICreateTypeDTO): Promise<Type>;
  save(type: Type): Promise<Type>;
}
