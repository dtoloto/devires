import AppError from '@shared/errors/AppError';

import FakeTypeRepository from '../repositories/fakes/FakeTypeRepository';
import CreateTypeService from './CreateTypeService';

let fakeTypeRepository: FakeTypeRepository;
let createType: CreateTypeService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeTypeRepository = new FakeTypeRepository();
    createType = new CreateTypeService(fakeTypeRepository);
  });

  it('should be able to create a new type', async () => {
    const { type } = await createType.execute({
      name: 'Type One',
      description: 'Description Type One',
    });

    expect(type).toHaveProperty('id');
  });

  // it('should not be able to create a new user with same cpf from another', async () => {
  //   await createUser.execute({
  //     email: 'johndoe@example.com',
  //     name: 'John Doe',
  //     cpf: '999.999.999-99',
  //     birthdate: new Date('2000-01-11'),
  //     rg: '99.999.999-9',
  //     rg_emitter: 'ssp-sp',
  //     gender: 'male',
  //     phone_code: '19',
  //     phone_number: '99999-9999',
  //     is_patient: false,
  //     is_doctor: false,
  //     is_lab_collaborator: false,
  //     is_clinic_collaborator: false,
  //     is_lab_admin: false,
  //     is_clinic_admin: false,
  //   });

  //   try {
  //     await createUser.execute({
  //       email: 'johndoe@example.com',
  //       name: 'John Doe',
  //       cpf: '999.999.999-99',
  //       birthdate: new Date('2000-01-11'),
  //       rg: '99.999.999-9',
  //       rg_emitter: 'ssp-sp',
  //       gender: 'male',
  //       phone_code: '19',
  //       phone_number: '99999-9999',
  //       is_patient: false,
  //       is_doctor: false,
  //       is_lab_collaborator: false,
  //       is_clinic_collaborator: false,
  //       is_lab_admin: false,
  //       is_clinic_admin: false,
  //     });
  //   } catch (err) {
  //     expect(err).toBeInstanceOf(AppError);
  //   }
  // });
});
