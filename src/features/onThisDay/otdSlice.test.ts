import { configureStore } from '@reduxjs/toolkit';
import reducer, { compareNewsByYear, fetchOnThisDayNews, initialState } from './otdSlice';

const fetchOnThisDayMock: jest.Mock = require('./otdAPI').fetchOnThisDay;

jest.mock('./otdAPI', () => ({
  fetchOnThisDay: jest.fn(),
}));

const successData = { selected: [{ text: 'hello', year: 1 }, { text: 'world', year: 4 }, { text: 'foobar', year: 2 }] };

describe('onThisDaySlice', () => {

  describe('fetchOnThisDayNews reducer', () => {
    test('should return initial state', () => {
      expect(reducer(undefined, { type: undefined })).toEqual(initialState);
    });

    describe('when fetch succeeds', () => {
      beforeEach(() => {
        fetchOnThisDayMock.mockReturnValueOnce(successData);
      });

      test('should dispatch success', async () => {
        const store = configureStore({
          reducer: {
            otd: reducer
          }
        })
        await store.dispatch(fetchOnThisDayNews());
        const state = store.getState();

        // order should be different, and is described in the following expectation
        expect(state.otd.value).not.toEqual(successData.selected);
        expect(state.otd).toEqual({ error: undefined, status: 'received', value: successData.selected.sort(compareNewsByYear) });
      });
    });
  });
});
