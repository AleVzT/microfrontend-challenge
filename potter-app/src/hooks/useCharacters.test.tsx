import { renderHook, waitFor } from '@testing-library/react';
import { useCharacters } from '../hooks/useCharacters';
import { vi } from 'vitest';

describe('useCharacters', () => {
  const mockData = Array.from({ length: 30 }, (_, i) => ({
    id: i.toString(),
    name: `Character ${i}`,
    image: '',
    house: '',
    actor: '',
    alive: true,
    patronus: '',
    wizard: true,
    hogwartsStudent: false,
    hogwartsStaff: false,
    wand: {}
  }));

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should fetch and return characters', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const { result } = renderHook(() => useCharacters());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.characters.length).toBe(20);
  });

  it('should handle fetch error', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false
    });

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Error al cargar los personajes');
    expect(result.current.characters).toEqual([]);
  });

  it('should catch network error', async () => {
    (fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.characters).toEqual([]);
  });
});
