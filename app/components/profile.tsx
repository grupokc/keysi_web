'use client';
import { useEffect, useState } from 'react';
import { LogOut, MoveUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import ExitImpersonationButton from './kc/ExitImpersonationButton';

interface MenuItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
}

interface ProfileProps {
  name: string;
  role: string;
  avatar: string;
}

export default function Profile({ onClose }: { onClose: () => void }) {
  const [userKC] = useLocalStorage('userKC', {});
  const [user] = useLocalStorage('user', {});
  const router = useRouter();

  // Estado para verificar si el usuario está en modo impersonación
  const [impersonating, setImpersonating] = useState(false);

  // Determinar si mostramos los datos de userKC o user según el modo suplantación
  const activeUser = impersonating
    ? user
    : Object.keys(userKC).length > 0
    ? userKC
    : user;

  // Estado inicial del perfil
  const [profile, setProfile] = useState<ProfileProps>({
    name: 'Usuario Desconocido',
    role: 'Sin Rol',
    avatar: '/img/default-avatar.png',
  });

  // Actualizar el perfil y verificar si estamos en suplantación
  useEffect(() => {
    // Verificar modo suplantación
    const mode = getCookie('impersonation_mode') || '';
    setImpersonating(!!mode);

    // Actualizar el perfil según el usuario activo
    setProfile({
      name: activeUser?.Nombre_Persona || 'Usuario Desconocido',
      role: [4, 3, 7].includes(activeUser?.Id_Tipo)
      ? activeUser?.Nombre_Tipo_Usuario
      : activeUser?.Nombre_Categoria ||
        activeUser?.Nombre_Empleado_Puesto ||
        'Sin Rol',
      avatar: activeUser?.RutaFoto || '/img/default-avatar.png',
    });
  }, [userKC, user, impersonating]);

  const handleLogout = () => {
    deleteCookie('titan_guid');
    deleteCookie('user_data');

    localStorage.removeItem('userKC');
    localStorage.removeItem('user');
    localStorage.removeItem('promotor');
    localStorage.removeItem('person');

    onClose();
    router.push('/auth');
  };

  const menuItems: MenuItem[] = [];

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="relative px-6 pb-6 pt-12">
          <div className="mb-8 flex items-center gap-4">
            <div className="relative shrink-0">
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={72}
                height={72}
                className="rounded-full object-cover ring-4 ring-white dark:ring-zinc-900"
              />
              <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
            </div>

            {/* Información del perfil */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {profile.name}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">{profile.role}</p>
            </div>
          </div>
          <div className="my-6 h-px bg-zinc-200 dark:bg-zinc-800" />
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-lg 
                                    p-2 transition-colors 
                                    duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {item.label}
                  </span>
                </div>
                {item.external && <MoveUpRight className="h-4 w-4" />}
              </Link>
            ))}

            {/* Si está en modo impersonación, muestra el botón de salir */}
            {impersonating ? (
              <ExitImpersonationButton onClose={onClose} />
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-between rounded-lg 
                                p-2 transition-colors 
                                duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              >
                <div className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Cerrar Sesión
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
