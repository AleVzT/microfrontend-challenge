import { render, screen } from '@testing-library/react';
import { vi, beforeEach } from 'vitest';
import RemoteContainer from './RemoteContainer';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { name?: string }) =>
      options?.name ? `${key}:${options.name}` : key,
  }),
}));

// Federated modules are replaced by test doubles (see vitest.config.ts aliases).
vi.mock('rickApp/App', () => ({
  default: () => <p>Rick remote loaded</p>,
}));

vi.mock('potterApp/App', () => {
  throw new Error('remote unavailable');
});

describe('RemoteContainer', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('shows a loading state, then renders the remote component', async () => {
    render(<RemoteContainer remoteName="rickApp" moduleName="App" />);

    expect(screen.getByText('remoteLoading')).toBeInTheDocument();
    expect(await screen.findByText('Rick remote loaded')).toBeInTheDocument();
  });

  it('shows an error when the remote cannot be loaded', async () => {
    render(<RemoteContainer remoteName="potterApp" moduleName="App" />);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('remoteError:potterApp/App');
    expect(console.error).toHaveBeenCalled();
  });

  it('shows an error for an unknown remote name', async () => {
    render(<RemoteContainer remoteName="unknownApp" moduleName="App" />);

    expect(await screen.findByRole('alert')).toHaveTextContent('remoteError:unknownApp/App');
  });
});
