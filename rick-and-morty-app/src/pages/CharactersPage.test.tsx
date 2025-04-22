import { render, screen } from '@testing-library/react';
import { CharactersPage } from './CharactersPage';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../hooks/useCharacters', () => ({
  useCharacters: vi.fn(),
}));

import { useCharacters } from '../hooks/useCharacters';

describe('CharactersPage', () => {
  it('muestra loading cuando está cargando', () => {
    (useCharacters as jest.Mock).mockReturnValue({
      characters: [],
      loading: true,
      error: false,
    });

    render(<CharactersPage />);
    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('muestra error cuando hay un error', () => {
    (useCharacters as jest.Mock).mockReturnValue({
      characters: [],
      loading: false,
      error: true,
    });

    render(<CharactersPage />);
    expect(screen.getByText('error')).toBeInTheDocument();
  });

  it('renderiza personajes correctamente', () => {
    (useCharacters as jest.Mock).mockReturnValue({
      characters: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          gender: 'Male',
          origin: { name: 'Earth' },
          location: { name: 'Citadel of Ricks' },
          image: 'https://example.com/rick.jpg',
          episode: new Array(41),
        },
      ],
      loading: false,
      error: false,
    });

    render(<CharactersPage />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });
});
