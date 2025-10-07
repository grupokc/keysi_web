'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { stopImpersonation } from '@/app/services/stopImpersonation';
import { useContext } from 'react';
import { UserKCContext } from '@/app/context/userKCContext';

export default function ExitImpersonationButton({
  onClose,
}: {
  onClose: () => void;
}) {
  const router = useRouter();
  const { userKC } = useContext(UserKCContext);
  // userKC siempre es el colaborador real (tipo=1)

  const handleClick = async () => {
    // 1) Llamar al servidor para restaurar cookie user_data con el colaborador
    await stopImpersonation();

    // 2) Actualizar localStorage para que "user" refleje el colaborador.
    window.localStorage.setItem('user', JSON.stringify(userKC));

    // 3) Cerrar el menú de perfil
    onClose();

    // 4) Redirigir al home
    router.push('/inbox/kc');
  };

  return (
    <Button onPress={handleClick} size="sm" color="danger">
      Salir de suplantación
    </Button>
  );
}
