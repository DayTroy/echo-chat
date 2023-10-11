import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<SearchBar setSearchQuery={() => {}} />);
    const searchInput = getByPlaceholderText('Search');
    expect(searchInput).toBeDefined();
  });

  it('calls setSearchQuery when the search input changes', () => {
    const setSearchQueryMock = jest.fn();
    const { getByPlaceholderText } = render(<SearchBar setSearchQuery={setSearchQueryMock} />);
    const searchInput = getByPlaceholderText('Search');

    fireEvent.changeText(searchInput, 'test');
    expect(setSearchQueryMock).toHaveBeenCalledWith('test');
  });
});
