import { useEffect, useState } from 'react';
import { Character } from '../types/character';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        if (!response.ok) {
          throw new Error('Error al cargar los personajes');
        }
        const data = await response.json();
        setCharacters(data.slice(0, 20));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return { characters, loading, error };
};
