import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieForm from './MovieForm';

describe('MovieForm Component', () => {
  const onSubmit = jest.fn();

  it('renders the form with input fields', () => {
    render(<MovieForm onSubmit={onSubmit} />);
    expect(screen.getByLabelText('TITLE')).toBeInTheDocument();
    expect(screen.getByLabelText('RELEASE DATE')).toBeInTheDocument();
    expect(screen.getByLabelText('MOVIE URL')).toBeInTheDocument();
    expect(screen.getByLabelText('RATING')).toBeInTheDocument();
    expect(screen.getByLabelText('GENRE')).toBeInTheDocument();
    expect(screen.getByLabelText('RUNTIME')).toBeInTheDocument();
  });

  it('calls onSubmit with form data when the submit button is clicked', () => {
    render(<MovieForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('TITLE'), { target: { value: 'Test Movie' } });
    fireEvent.change(screen.getByLabelText('RELEASE DATE'), { target: { value: '2024-01-01' } });
    fireEvent.change(screen.getByLabelText('MOVIE URL'), { target: { value: 'http://example.com' } });
    fireEvent.change(screen.getByLabelText('RATING'), { target: { value: '8.0' } });
    fireEvent.click(screen.getByText('Crime').querySelector('input[type="checkbox"]') as Element);
    fireEvent.change(screen.getByLabelText('RUNTIME'), { target: { value: '120' } });

    fireEvent.click(screen.getByText('SUBMIT'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Test Movie',
      releaseDate: '2024-01-01',
      movieUrl: 'http://example.com',
      rating: '8.0',
      genre: ['Crime'],
      runtime: '120',
    }));
  });

  it('clears the form when the reset button is clicked', () => {
    render(<MovieForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('TITLE'), { target: { value: 'Test Movie' } });
    fireEvent.click(screen.getByText('RESET'));

    expect((screen.getByLabelText('TITLE') as HTMLInputElement).value).toBe('');
  });
});