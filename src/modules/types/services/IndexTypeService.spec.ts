import AppError from '@shared/errors/AppError';

import FakeTypeRepository from '../repositories/fakes/FakeTypeRepository';
import IndexTypeService from './IndexTypeService';

let fakeTypeRepository: FakeTypeRepository;
let indexType: IndexTypeService;

describe('IndexTypes', () => {
  beforeEach(() => {
    fakeTypeRepository = new FakeTypeRepository();
    indexType = new IndexTypeService(fakeTypeRepository);
  });

  it('should be able to index all types', async () => {
    await fakeTypeRepository.create({
      name: 'Type One',
      description: 'Description Type One',
    });

    await fakeTypeRepository.create({
      name: 'Type Two',
      description: 'Description Type Two',
    });

    const { types } = await indexType.execute();

    expect(types).toHaveLength(2);
  });
});
