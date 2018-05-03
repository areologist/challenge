import LocationSearch from '../location-search';

jest.mock('../geocode');
jest.mock('../logger');

const mockDb = {};

describe('LocationSearch', () => {
  let sut;

  beforeEach(() => sut = new LocationSearch(mockDb))

  it('is', async () => {
    // const res = await sut.search('test query');
    expect(null).toBeNull();
  });
});
