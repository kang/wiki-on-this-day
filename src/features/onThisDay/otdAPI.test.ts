import { fetchOnThisDay, getOtdUrl } from './otdAPI';

let originalFetch = global.fetch;

const mockNews = [{ text: 'hello', year: 1 }];

describe('onThisDayAPI', () => {
  describe('when fetch succeeds', () => {
    beforeEach(() => {
      // @ts-ignore-next-line
      global.fetch = jest.fn(() => (
        Promise.resolve({
          json: () => Promise.resolve({ selected: mockNews }),
        })
      ));
    });

    afterEach(() => {
      global.fetch = originalFetch;
    });

    test('should dispatch success', async () => {
      const url = getOtdUrl();

      const data = await fetchOnThisDay();

      expect(data).toEqual({ selected: mockNews });
      expect(fetch).toHaveBeenCalledWith(url);
    });
  });
});
