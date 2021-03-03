import FakeTypeRepository from '../repositories/fakes/FakeTypeRepository';
import CreateTypeService from './CreateTypeService';

let fakeTypeRepository: FakeTypeRepository;
let createType: CreateTypeService;

describe('CreateTypes', () => {
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
});
