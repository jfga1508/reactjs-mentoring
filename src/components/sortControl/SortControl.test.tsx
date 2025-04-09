import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortControl from './SortControl';

// Mock the CSS import
jest.mock('./SortControl.css', () => ({}));

const mockProps = {
  selectedValue: 'releaseDate',
  onChange: jest.fn(),
};

describe('SortControl', () => {
  beforeEach(() => {
    mockProps.onChange.mockClear();
  });

  it('renders correctly with default props', () => {
    render(<SortControl {...mockProps} />);

    expect(screen.getByLabelText('Sort by:')).toBeInTheDocument();
  });
});