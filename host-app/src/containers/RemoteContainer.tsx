import { useEffect, useState } from 'react';

interface Props {
  remoteName: string;
  moduleName: string;
}

const RemoteContainer = ({ remoteName, moduleName }: Props) => {
  const [Component, setComponent] = useState<React.FC | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        let module = null;
        if(remoteName === 'rickApp') {
          // @ts-expect-error: Dynamic import for remote module may not have type definitions
          module = await import('rickApp/App');
        }
        if(remoteName === 'potterApp') {
          // @ts-expect-error: Dynamic import for remote module may not have type definitions
          module = await import('potterApp/App');
        }

        if (!module || !module.default) {
          throw new Error(`El módulo ${remoteName}/${moduleName} no tiene una exportación por defecto.`);
        }
        setComponent(() => module.default);
      } catch (err) {
        console.error('Error al importar el módulo remoto:', err);
        setError(`No se pudo cargar ${remoteName}/${moduleName}`);
      }
    };

    loadComponent();
  }, [remoteName, moduleName]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!Component) return <p>Cargando módulo remoto...</p>;

  return <Component />;
};

export default RemoteContainer;

