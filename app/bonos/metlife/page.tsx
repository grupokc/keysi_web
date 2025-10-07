'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import WarningModal from '@/app/components/WarningModal';

export default function BonosPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleConfirm = (): void => {
    setShowModal(false);
    // TODO: INSERTAR EN LA BD FECHA Y HORA DE ACEPTACION
    router.push('/bonos/metlife/lista');
  };

  const handleModalClose = (): void => {
    setShowModal(false);
    router.push('/inbox/agentes');
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <>
      {showModal && (
        <WarningModal
          isOpen={showModal}
          onClose={handleModalClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
