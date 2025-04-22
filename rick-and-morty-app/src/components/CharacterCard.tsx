import styled from 'styled-components';
import { Character } from '../types/character';
import { useTranslation } from 'react-i18next';

const Card = styled.div`
  width: 240px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const CardImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  background-color: #f2f2f2;
`;

const CardName = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.1rem;
`;

const CardInfo = styled.div`
  font-size: 0.85rem;
  padding: 0 0.75rem 1rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const CharacterCard = ({
  name,
  image,
  status,
  species,
  gender,
  origin,
  location,
  episode,
}: Character) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardImage src={image || '/placeholder.png'} alt={name} />
      <CardName>{name}</CardName>
      <CardInfo>
        <p><strong>{t('status')}:</strong> {status}</p>
        <p><strong>{t('species')}:</strong> {species}</p>
        <p><strong>{t('gender')}:</strong> {gender}</p>
        <p><strong>{t('origin')}:</strong> {origin?.name}</p>
        <p><strong>{t('location')}:</strong> {location?.name}</p>
        <p><strong>{t('episodes')}:</strong> {episode?.length}</p>
      </CardInfo>
    </Card>
  );
};