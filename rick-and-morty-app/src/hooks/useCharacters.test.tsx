import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCharacters } from './useCharacters';

const mockCharacters = {
  results: Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Character ${i + 1}`,
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth' },
    location: { name: 'Earth' },
    image: `https://example.com/${i + 1}.png`,
  })),
};

describe('useCharacters', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('debería obtener y retornar los personajes correctamente', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCharacters),
    } as Partial<Response>) as typeof fetch;

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.characters.length).toBe(20);
    expect(result.current.error).toBeNull();
  });

  it('debería manejar error si el response no es ok', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    } as Partial<Response>) as typeof fetch;

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.characters).toEqual([]);
    expect(result.current.error).toBe('Error al cargar los personajes');
  });

  it('debería manejar excepciones si fetch falla', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.characters).toEqual([]);
    expect(result.current.error).toBe('Network error');
  });
});

