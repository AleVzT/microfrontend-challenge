import { CharacterCard } from '../components/CharacterCard';
import { useCharacters } from '../hooks/useCharacters';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Wrapper = styled.div`
  &.characters {
    padding: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
`;

export const CharactersPage = () => {
  const { t } = useTranslation();
  const { characters, loading, error } = useCharacters();

  if (loading) return <p>{t('loading')}</p>;

  if (error) return <p>{t('error')}</p>;

  return (
    <Wrapper className="characters">
      {characters.map((char) => (
        <CharacterCard key={char.id} {...char} />
      ))}
    </Wrapper>
  );
};