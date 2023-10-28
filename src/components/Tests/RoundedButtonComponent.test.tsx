import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RoundedButton from '../RoundedButton.component';

describe('RoundedButton', () => {
  const onPressMock = jest.fn();

  it('renders the button with the given label', () => {
    const { getByText } = render(
      <RoundedButton label='Test Button' onPress={onPressMock} />
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls the onPress function when the button is pressed', () => {
    const { getByText } = render(
      <RoundedButton label='Test Button' onPress={onPressMock} />
    );
    const button = getByText('Test Button');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});
describe('Rendering', () => {
  it('should match to snapshot', () => {
    const onPressMock = jest.fn();
    const roundedButtonComponent = render(
      <RoundedButton label='Test Button' onPress={onPressMock} />
    );
    expect(roundedButtonComponent).toMatchSnapshot();
  });
});
