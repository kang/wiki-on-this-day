import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { OnThisDay } from './OnThisDay';

import * as onThisDaySlice from './otdSlice';

const renderOnThisDay = () => {
  render(
    <Provider store={store}>
      <OnThisDay />
    </Provider>
  );
}

describe('OnThisDay', () => {

  describe('render', () => {
    test('should render title', () => {
      renderOnThisDay();

      expect(screen.getByText(/On this day/i)).toBeInTheDocument();
    });
  })

  describe('user interaction', () => {
    describe('when fetch fails', () => {
      beforeEach(() => {
        const selectOnThisDaySpy = jest.spyOn(onThisDaySlice, 'selectOnThisDay');
        selectOnThisDaySpy.mockReturnValue({ status: 'failed', error: { stack: 'some error' }, value: undefined });
      });

      test('should close error modal when user clicks "x"', () => {
        renderOnThisDay();

        expect(screen.getByText(/Woops, that didn't work/i)).toBeInTheDocument();

        const button = screen.getByTestId('errorCloseButton');

        expect(button).toBeVisible();
        fireEvent.click(button);
        expect(button).not.toBeVisible();
      });
    });
  });
});
