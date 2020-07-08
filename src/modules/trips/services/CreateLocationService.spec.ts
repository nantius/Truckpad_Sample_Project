import FakeLocationsRepository from '../repositories/fakes/FakeLocationsRepository';
import CreateLocationService from './CreateLocationService';

let fakeLocationsRepository: FakeLocationsRepository;
let createLocation: CreateLocationService;

describe('CreateLocation', () => {
  beforeEach(() => {
    fakeLocationsRepository = new FakeLocationsRepository();
    createLocation = new CreateLocationService(fakeLocationsRepository);
  });

  it('should be able to create a new location', async () => {
    const location = await createLocation.execute({
      latitude: '-23.5549682',
      longitude: '-46.6650893',
    });
    expect(location).toHaveProperty('uuid');
  });
});
