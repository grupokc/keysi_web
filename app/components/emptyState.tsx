import React from 'react';
import { Spinner } from '@nextui-org/react';

interface EmptyStateProps {
  isLoading: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spinner size="lg" label="Cargando..." />
      </div>
    );
  }

  return <div>No hay datos disponibles</div>;
};

export default EmptyState;
