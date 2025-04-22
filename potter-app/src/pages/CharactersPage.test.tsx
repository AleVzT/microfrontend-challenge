import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { CharactersPage } from './CharactersPage';
import { useCharacters } from '../hooks/useCharacters';


vi.mock('../hooks/useCharacters', () => ({
  useCharacters: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockedUseCharacters = useCharacters as unknown as ReturnType<typeof vi.fn>;

describe('CharactersPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading message', () => {
    mockedUseCharacters.mockReturnValue({
      loading: true,
      error: null,
      characters: [],
    });

    render(<CharactersPage />);
    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('should show error message', () => {
    mockedUseCharacters.mockReturnValue({
      loading: false,
      error: 'Some error',
      characters: [],
    });

    render(<CharactersPage />);
    expect(screen.getByText('error')).toBeInTheDocument();
  });

  it('should render characters', () => {
    mockedUseCharacters.mockReturnValue({
      loading: false,
      error: null,
      characters: [
        {
          id: '1',
          name: 'Harry Potter',
          image: 'https://someimageurl.com',
          house: 'Gryffindor',
          actor: 'Daniel Radcliffe',
          alive: true,
          patronus: 'Stag',
          wizard: true,
          hogwartsStudent: true,
          hogwartsStaff: false,
          wand: {
            wood: 'Holly',
            core: 'Phoenix feather',
            length: 11,
          },
        },
      ],
    });

    render(<CharactersPage />);
    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
    expect(screen.getByText('Daniel Radcliffe')).toBeInTheDocument();
    expect(screen.getByText('Gryffindor')).toBeInTheDocument();
  });
});
