import { container } from 'tsyringe';

import '@modules/users/providers';

import ITypeRepository from '@modules/types/repositories/ITypeRepository';
import TypeRepository from '@modules/types/infra/typeorm/repositories/TypeRepository';

container.registerSingleton<ITypeRepository>('TypeRepository', TypeRepository);
