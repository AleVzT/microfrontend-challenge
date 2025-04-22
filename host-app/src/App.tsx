import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RemoteContainer from './containers/RemoteContainer';
import LanguageSwitcher from './components/LanguageSwitcher';
import { GlobalStyle } from './styles/GlobalStyle';

const App = () => {
  const { t } = useTranslation();
  const [remote, setRemote] = useState('');

  return (
    <>
      <GlobalStyle />
      <LanguageSwitcher />

      <header className="app__header">
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
      </header>

      <div className="app__buttons">
        <button onClick={() => setRemote('rick')}>{t('rickButton')}</button>
        <button onClick={() => setRemote('potter')}>{t('potterButton')}</button>
      </div>

      {remote === 'rick' && <RemoteContainer remoteName="rickApp" moduleName="App" />}
      {remote === 'potter' && <RemoteContainer remoteName="potterApp" moduleName="App" />}
    </>
  );
};

export default App;
