import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ItemCardComponent from '../ItemCard.component';

describe('ItemCardComponent', () => {
  it('renders correctly', () => {
    const onPressUpdate = jest.fn();
    const onPressRemove = jest.fn();
    const { getByText, getByTestId } = render(
      <ItemCardComponent
        label='Test Label'
        index='1'
        onPressUpdate={onPressUpdate}
        onPressRemove={onPressRemove}
      />
    );

    const label = getByText('Test Label');
    const removeButton = getByText('REMOVE');

    expect(label).toBeDefined();
    expect(removeButton).toBeDefined();

    fireEvent.press(removeButton);
    expect(onPressRemove).toHaveBeenCalledTimes(1);

    fireEvent.press(getByTestId('item-card'));
    expect(onPressUpdate).toHaveBeenCalledTimes(1);
  });
});

describe('Rendering', () => {
  it('should match to snapshot', () => {
    const onPressUpdate = jest.fn();
    const onPressRemove = jest.fn();
    const itemCardComponent = render(
      <ItemCardComponent
        label='Test Label'
        index='1'
        onPressUpdate={onPressUpdate}
        onPressRemove={onPressRemove}
      />
    );
    expect(itemCardComponent).toMatchSnapshot();
  });
});
