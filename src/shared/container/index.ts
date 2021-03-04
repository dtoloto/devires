import { container } from 'tsyringe';

import '@modules/users/providers';

import ITypeRepository from '@modules/types/repositories/ITypeRepository';
import TypeRepository from '@modules/types/infra/typeorm/repositories/TypeRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

container.registerSingleton<ITypeRepository>('TypeRepository', TypeRepository);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
