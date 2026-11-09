import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Character } from '../types/character';
import { PLACEHOLDER_IMAGE } from '../constants/placeholderImage';

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

// `$house` is a transient prop: styled-components uses it for styling
// and does not forward it to the DOM element.
const Badge = styled.span<{ $house: string }>`
  display: inline-block;
  background-color: ${({ $house }) =>
    $house === 'Gryffindor' ? '#ae0001' :
    $house === 'Slytherin' ? '#1a472a' :
    $house === 'Hufflepuff' ? '#f0c75e' :
    $house === 'Ravenclaw' ? '#222f5b' :
    '#ccc'};
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  align-self: flex-start;
`;

export const CharacterCard = ({
  name,
  image,
  house,
  actor,
  alive,
  patronus,
  wizard,
  hogwartsStudent,
  hogwartsStaff,
  wand,
}: Character) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardImage
        src={image || PLACEHOLDER_IMAGE}
        alt={name}
        onError={(e) => {
          const img = e.currentTarget;
          // Guard against an error loop if the fallback itself cannot be loaded.
          if (img.src !== PLACEHOLDER_IMAGE) img.src = PLACEHOLDER_IMAGE;
        }}
      />
      <CardName>{name}</CardName>
      <CardInfo>
        {house && <Badge $house={house}>{house}</Badge>}
        <p><strong>{t('actor')}:</strong> {actor || t('unknown')}</p>
        <p><strong>{t('status')}:</strong> {alive ? '🟢 ' + t('alive') : '⚰️ ' + t('deceased')}</p>
        <p><strong>{t('role')}:</strong> {hogwartsStudent ? t('student') : hogwartsStaff ? t('staff') : t('other')}</p>
        <p><strong>{t('isWizard')}:</strong> {wizard ? t('yes') : t('no')}</p>
        {patronus && <p><strong>{t('patronus')}:</strong> {patronus}</p>}
        {(wand?.wood || wand?.core || wand?.length) && (
          <p><strong>{t('wand')}:</strong> {wand.wood || '¿?'} / {wand.core || '¿?'} / {wand.length ? `${wand.length} ${t('inches')}` : '¿?'}</p>
        )}
      </CardInfo>
    </Card>
  );
};

