
import React from 'react';
import { Button } from '@nextui-org/react';

interface PaginationControlsProps {
  page: number;
  pages: number;
  setPage: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ page, pages, setPage }) => (
  <div className="flex justify-end gap-2">
    <Button
      disabled={page <= 1}
      size="sm"
      onPress={() => setPage(page - 1)}
    >
      Anterior
    </Button>
    <Button
      disabled={page >= pages}
      size="sm"
      onPress={() => setPage(page + 1)}
    >
      Siguiente
    </Button>
  </div>
);

export default PaginationControls;
