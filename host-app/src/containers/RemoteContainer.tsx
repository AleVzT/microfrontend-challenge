import { useEffect, useState, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  remoteName: string;
  moduleName: string;
}

type RemoteModule = { default?: ComponentType };

const RemoteContainer = ({ remoteName, moduleName }: Props) => {
  const { t } = useTranslation();
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        let module: RemoteModule | null = null;
        // Remote specifiers must be static so the federation plugin can rewrite them.
        if (remoteName === 'rickApp') {
          // @ts-expect-error: federated module, resolved at runtime by Module Federation
          module = await import('rickApp/App');
        }
        if (remoteName === 'potterApp') {
          // @ts-expect-error: federated module, resolved at runtime by Module Federation
          module = await import('potterApp/App');
        }

        const RemoteComponent = module?.default;
        if (!RemoteComponent) {
          throw new Error(`Remote module ${remoteName}/${moduleName} has no default export.`);
        }
        setComponent(() => RemoteComponent);
      } catch (err) {
        console.error('Failed to load remote module:', err);
        setError(`${remoteName}/${moduleName}`);
      }
    };

    loadComponent();
  }, [remoteName, moduleName]);

  if (error) return <p role="alert" style={{ color: 'red' }}>{t('remoteError', { name: error })}</p>;
  if (!Component) return <p>{t('remoteLoading')}</p>;

  return <Component />;
};

export default RemoteContainer;
