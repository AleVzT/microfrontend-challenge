import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import LanguageSwitcher from './LanguageSwitcher';

const i18nMock = {
  language: 'en',
  changeLanguage: vi.fn((lng: string) => {
    i18nMock.language = lng;
  }),
};

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ i18n: i18nMock }),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    i18nMock.language = 'en';
    i18nMock.changeLanguage.mockClear();
  });

  it('shows the current language', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole('button')).toHaveTextContent('EN');
  });

  it('toggles from English to Spanish', () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByRole('button'));
    expect(i18nMock.changeLanguage).toHaveBeenCalledWith('es');
  });

  it('toggles from Spanish back to English', () => {
    i18nMock.language = 'es';
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByRole('button'));
    expect(i18nMock.changeLanguage).toHaveBeenCalledWith('en');
  });
});
