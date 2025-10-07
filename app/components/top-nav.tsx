'use client';

import { useEffect, useState, useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import Image from 'next/image';
import Profile from './profile';
import { usePathname } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { Skeleton, Breadcrumbs, BreadcrumbItem, Button } from '@heroui/react';
import { Megaphone, Sparkles } from 'lucide-react';
import { useComunicadosContext } from "@/app/context/ComunicadosContext";
import dynamic from "next/dynamic";

const ComunicadosModal = dynamic(() => import("@/app/components/ComunicadosModal"), { ssr: false });

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function TopNav() {
  const pathname = usePathname(); // Obtener la ruta actual
  const [impersonationMode, setImpersonationMode] = useState(
    getCookie('impersonation_mode') || '',
  );
  const [userData, setUserData] = useState<{
    nombrePersona?: string;
    rutaFoto?: string;
    Id_Agente?: number;
  }>({
    nombrePersona: 'Cargando...',
    rutaFoto: '/img/default-avatar.png',
    Id_Agente: undefined,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { 
    showComunicados, 
    setShowComunicados, 
    closeComunicados,
    hasComunicados, 
    hasUnreadComunicados, 
    loading: loadingComunicados,
    forceRefresh
  } = useComunicadosContext();

  useEffect(() => {
    const updateUserData = () => {
      const mode = getCookie('impersonation_mode') || '';
      setImpersonationMode(mode);

      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const storedUserKC = JSON.parse(localStorage.getItem('userKC') || '{}');

      // Si estamos en modo impersonation, usamos `user`, si no, usamos `userKC`
      const activeUser = !!mode
        ? storedUser
        : Object.keys(storedUserKC).length > 0
        ? storedUserKC
        : storedUser;

      setUserData({
        nombrePersona: activeUser?.Nombre_Persona || 'Usuario',
        rutaFoto: activeUser?.RutaFoto || '/img/default-avatar.png',
        Id_Agente: activeUser?.Id_Agente,
      });

      setIsLoaded(true);
    };

    updateUserData();

    // Monitorear cambios en impersonation_mode y localStorage en tiempo real
    const interval = setInterval(() => {
      const mode = getCookie('impersonation_mode') || '';
      if (mode !== impersonationMode) {
        updateUserData();
      }
    }, 500); // Revisar cada 500ms si hay cambios

    window.addEventListener('storage', updateUserData);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', updateUserData);
    };
  }, [impersonationMode]);

  // Efecto para actualizar comunicados cuando el usuario regresa a la pestaña
  useEffect(() => {
    console.log(pathname)
    if(pathname.includes('keysi')) {
      setIsConnected(true);
    }else{
      setIsConnected(false);
    }
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Forzar actualización cuando el usuario regresa a la pestaña
        forceRefresh();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };

  }, [forceRefresh, pathname]);



  // Función para convertir cadenas a Title Case (Primera letra de cada palabra en mayúscula)
  const toTitleCase = (str: string): string => {
    return str
      .split('-') // Separar palabras por guiones
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalizar cada palabra
      .join(' ');
  };

  // Función para generar breadcrumbs dinámicos en Title Case
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (!pathname) return [];

    const segments = pathname.split('/').filter((segment) => segment); // Eliminar segmentos vacíos

    return segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join('/')}`; // Generar la URL acumulativa
      return {
        label: toTitleCase(segment), // Convertir a Title Case
        href,
      };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="flex h-full items-center justify-between border-b border-gray-200 bg-white px-3 dark:border-[#1F1F23] dark:bg-[#0F0F12] sm:px-6">
      {/* Breadcrumbs dinámicos */}
      <div className="hidden items-center truncate text-sm font-medium sm:flex">
        <Breadcrumbs isDisabled>
          <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
          {breadcrumbs.map((item) => (
            <BreadcrumbItem key={item.href} href={item.href}>
              {item.label}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      </div>

      {/* Perfil del usuario con Skeleton */}
      <div className="ml-auto flex items-center gap-2 sm:ml-0 sm:gap-4">

        
        {/* Botón de Chat AI - Habilitado para todos los usuarios */}

        {isConnected ? (
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs text-green-600 dark:text-gray-400">
              Conectado
            </span>
          </div>
        ) :null}

        <Button
          isIconOnly
          size="sm"
          variant="light"
          aria-label="Chat AI"
          className={`${isConnected ? '  text-green-600' : 'text-gray-600'} dark:text-gray-300 dark:hover:text-white`}
          onPress={() => window.location.href = '/keysi'}
        >
          <Sparkles size={20} strokeWidth={2} />
        </Button>

        {/* Botón de Anuncios - Solo mostrar si hay comunicados */}
        {!loadingComunicados && hasComunicados && (
          <Button
            isIconOnly
            size="sm"
            variant="light"
            aria-label="Ver anuncios"
            onPress={() => setShowComunicados(true)}
            className={`relative ${
              hasUnreadComunicados 
                ? "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            }`}
            style={{
              animation: hasUnreadComunicados ? 'blink 1.5s ease-in-out infinite alternate' : 'none'
            }}
          >
            <Megaphone size={20} strokeWidth={2} />
            {hasUnreadComunicados && (
              <style jsx>{`
                @keyframes blink {
                  0% {
                    background-color: rgba(59, 130, 246, 0.1);
                    box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
                  }
                  100% {
                    background-color: rgba(59, 130, 246, 0.3);
                    box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
                  }
                }
              `}</style>
            )}
          </Button>
        )}


        
        <DropdownMenu onOpenChange={(open) => setIsOpen(open)} open={isOpen}>
          <DropdownMenuTrigger className="focus:outline-none">
            <Skeleton className="rounded-full" isLoaded={isLoaded}>
              <Image
                key={userData.rutaFoto}
                src={userData.rutaFoto || '/img/default-avatar.png'}
                alt={userData.nombrePersona || 'Usuario'}
                width={28}
                height={28}
                className="cursor-pointer rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:h-8 sm:w-8"
              />
            </Skeleton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] rounded-lg border-border bg-background shadow-lg sm:w-80"
          >
            <Profile onClose={() => setIsOpen(false)} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Componente de comunicados (carrusel) */}
      <ComunicadosModal open={showComunicados} onClose={closeComunicados} />
    </nav>
  );
}
