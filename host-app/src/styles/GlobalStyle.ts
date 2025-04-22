import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: #f5f5f5;
    color: #333;
  }

  .app__header {
    padding: 2rem;
    text-align: center;
  }

  .app__buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;
  }

  .language__switcher {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;
