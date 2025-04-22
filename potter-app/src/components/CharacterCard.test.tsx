import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard } from './CharacterCard';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('CharacterCard', () => {
  const mockCharacter = {
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
    wand: { wood: 'Holly', core: 'Phoenix feather', length: 11 },
  };

  test('renders character card with correct data', () => {
    render(<CharacterCard {...mockCharacter} />);

    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
    expect(screen.getByText('Gryffindor')).toBeInTheDocument();

    expect(screen.getByText((content, element) =>
      content.includes('actor') && element?.tagName?.toLowerCase() === 'strong'
    )).toBeInTheDocument();
    expect(screen.getByText('Daniel Radcliffe')).toBeInTheDocument();

    expect(screen.getByText((content, element) =>
      content.includes('role') && element?.tagName?.toLowerCase() === 'strong'
    )).toBeInTheDocument();
    expect(screen.getByText('student')).toBeInTheDocument();
    expect(screen.getByText('yes')).toBeInTheDocument();

    expect(screen.getByText((content, element) =>
      content.includes('patronus') && element?.tagName?.toLowerCase() === 'strong'
    )).toBeInTheDocument();
    expect(screen.getByText('Stag')).toBeInTheDocument();

    expect(screen.getByText((content, element) =>
      content.includes('wand') && element?.tagName?.toLowerCase() === 'strong'
    )).toBeInTheDocument();
    expect(screen.getByText('Holly / Phoenix feather / 11 inches')).toBeInTheDocument();
  });

  test('shows placeholder image if image fails to load', () => {
    render(<CharacterCard {...mockCharacter} image="invalid-url" />);

    const img = screen.getByAltText('Harry Potter');
    fireEvent.error(img);
    expect(img).toHaveAttribute("src", "/placeholder.png");
  });

  test('displays correct badge for Gryffindor house', () => {
    render(<CharacterCard {...mockCharacter} house="Gryffindor" />);

    const badge = screen.getByText('Gryffindor');
    expect(badge).toHaveStyle('background-color: #ae0001');
  });

  test('uses correct translations', () => {
    render(<CharacterCard {...mockCharacter} />);
    expect(screen.getByText((content, element) =>
      content.includes('actor') && element?.tagName?.toLowerCase() === 'strong'
    )).toBeInTheDocument();
    expect(screen.getByText((content, element) =>
      content.includes('role') && element?.tagName?.toLowerCase() === 'strong'
    )).toBeInTheDocument();
    expect(screen.getByText((content, element) =>
      content.includes('wand') && element?.tagName?.toLowerCase() === 'strong'
    )).toBeInTheDocument();
  });

  test('displays default badge color if house is unknown', () => {
    render(<CharacterCard {...mockCharacter} house="UnknownHouse" />);

    const badge = screen.getByText('UnknownHouse');
    expect(badge).toHaveStyle('background-color: #ccc');
  });
});
