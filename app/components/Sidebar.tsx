'use client';

import { Menu, Megaphone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { navbarTabs, specialTabs, dxnTabs } from '../utils/schemas/NavbarSchema';
import { Skeleton } from '@heroui/react';
import { getCookie } from 'cookies-next';
import {
  Card,
  CardBody,
  Button,
  Listbox,
  ListboxItem,
  Divider,
} from '@heroui/react';
import { usePathname } from 'next/navigation';
import { useSystemType } from '@/app/hooks/useSystemType';
import { SYSTEMS_CONFIG } from '@/app/config/systems.js';
import { useAppVersionStore, type AppVersionState } from '@/app/store/appVersionStore';

export default function Sidebar({
  setSelectedView,
  setIsMobileMenuOpen,
  isTicketsPage,
  views,
}: {
  setSelectedView: (view: string) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  isTicketsPage: boolean;
  views: any[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setLocalIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userKC, setUserKC] = useState<any>(null);
  const [userType, setUserType] = useState<'a' | 'p' | 's'>('a');
  const [isAgenteIp, setIsAgenteIp] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [impersonationMode, setImpersonationMode] = useState(
    getCookie('impersonation_mode') || '',
  );
  const systemType = useSystemType();
  const appVersion = useAppVersionStore((state: AppVersionState) => state.version);

  // Obtener la configuración del sistema con valores por defecto
  const systemLogo = systemType === 'ss' ? SYSTEMS_CONFIG.ss.sidebarLogo : SYSTEMS_CONFIG.titan.sidebarLogo;
  const systemName = systemType === 'ss' ? SYSTEMS_CONFIG.ss.name : SYSTEMS_CONFIG.titan.name;

  useEffect(() => {
    const updateUserData = () => {
      const mode = getCookie('impersonation_mode') || '';
      setImpersonationMode(mode);

      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const storedUserKC = JSON.parse(localStorage.getItem('userKC') || '{}');

      const activeUser = mode
        ? storedUser
        : Object.keys(storedUserKC).length > 0
        ? storedUserKC
        : storedUser;

      setUser(activeUser);
      setUserKC(storedUserKC);

      // Determinar tipo de usuario
      if (activeUser?.Id_Tipo === 1) {
        setUserType('s');
      } else {
        setUserType(activeUser?.Id_Categoria === 10 ? 'p' : 'a');
      }

      // Verificar si es agente IP
      setIsAgenteIp(
        activeUser?.Id_Agente_Tipo == 2 && activeUser?.Id_Tipo == 2,
      );

      setIsLoaded(true);
    };

    updateUserData();

    // Escuchar cambios en cookies y localStorage para actualización automática
    const interval = setInterval(() => {
      const mode = getCookie('impersonation_mode') || '';
      if (mode !== impersonationMode) {
        updateUserData();
      }
    }, 500); // Revisar cada 500ms si hay cambios en impersonation

    return () => clearInterval(interval);
  }, [impersonationMode]);



  function handleNavigation(view: string) {
    const absolutePath = view.startsWith('/') ? view : `/${view}`;
    setSelectedView(absolutePath);
    router.push(absolutePath);
    setIsMobileMenuOpen(false);
    setLocalIsMobileMenuOpen(false);
  }

  function NavItem({
    onClick,
    icon,
    children,
  }: {
    onClick: () => void;
    icon: string;
    children: React.ReactNode;
  }) {
    return (
      <button
        onClick={onClick}
        className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-[#1F1F23] dark:hover:text-white"
      >
        <i className={`${icon} mr-3 h-4 w-4`} />
        {children}
      </button>
    );
  }

  // Determinar qué tabs usar
  const shouldHideTabs = [4, 3, 7].includes(user?.Id_Tipo);

  const getActiveTabs = () => {
    if (shouldHideTabs) return [];
    if (user?.Id_Tipo === 1) return specialTabs;
    // Verificar si es usuario DXN (Id_Tipo: 2 y Id_Categoria: 3)
    if (user?.Id_Tipo === 2 && user?.Id_Categoria === 3) return dxnTabs;
    // Para otros usuarios
    return navbarTabs.filter((tab) =>
      user?.Id_Categoria === 10 ? tab.id.startsWith('p') : tab.id.startsWith('a')
    );
  };

  const activeTabs = getActiveTabs();

  function handleFilterClick(workflowId: number | null) {
    const filters =
      workflowId === null
        ? []
        : [
            {
              itemId: 'Id_Ticket_WorkFlow',
              property: 'Id_Ticket_WorkFlow',
              type: 'int',
              sign: 'in',
              value: workflowId,
            },
          ];

    // Guardar filtros en localStorage (opcional, si deseas persistencia)
    localStorage.setItem('selectedFilters', JSON.stringify(filters));

    // Obtener el iframe correctamente
    const iframe = document.getElementById(
      'iframe-mesa-ayuda',
    ) as HTMLIFrameElement;

    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'APPLY_FILTERS', filters }, '*');
    }
  }

  return (
    <>
      {/* Botón para abrir/cerrar Sidebar en móviles */}
      <button
        type="button"
        className="fixed left-4 top-4 z-[70] rounded-lg bg-white p-2 shadow-md dark:bg-[#0F0F12] lg:hidden"
        onClick={() => {
          setLocalIsMobileMenuOpen(!isMobileMenuOpen);
          setIsMobileMenuOpen(!isMobileMenuOpen);
        }}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Sidebar */}
      <nav
        className={`
          fixed left-0 top-0 z-[70]
          flex flex-1 flex-col overflow-y-auto border-r border-gray-200 bg-white
          transition-transform duration-200 ease-in-out
          dark:border-[#1F1F23] dark:bg-[#0F0F12]
          lg:static lg:w-64 lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-[#1F1F23]">
          <div className="flex items-center gap-3">
            <Image
              src={systemLogo}
              alt={systemName}
              width={32}
              height={32}
              className="flex-shrink-0"
            />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {systemName}
            </span>
          </div>
        </div>

        {/* Menú de navegación */}
        {pathname !== "/anuncios" && (
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-6">
              {!shouldHideTabs && (
                <div>
                  <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                   Modulos
                  </div>
                  <div className="space-y-1">
                    {!isLoaded ? (
                      <>
                        <Skeleton className="h-8 w-full rounded-lg" />
                        <Skeleton className="h-8 w-full rounded-lg" />
                        <Skeleton className="h-8 w-full rounded-lg" />
                      </>
                    ) : (
                      activeTabs.map((tab) => (
                        <NavItem
                          key={tab.id}
                          onClick={() => handleNavigation(tab.path)}
                          icon={tab.icon}
                        >
                          {tab.name}
                        </NavItem>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Menú de filtros dinámico cuando estamos en /tickets o /siniestros */}
        {(pathname === '/tickets' || pathname === '/siniestros') && (
          <div className="border-t border-gray-200 px-4 py-6 dark:border-[#1F1F23]">
            <Card className="shadow-md">
              <CardBody>
                <h2 className="mb-3 text-base font-semibold text-gray-800 dark:text-white">
                  🎛️ Filtros
                </h2>

                <Listbox
                  aria-label="Selecciona un filtro"
                  role="listbox"
                  items={[
                    { key: 'all', label: '🧹 Limpiar Filtros' },
                    ...views.map((view) => ({
                      key: view.Id_Ticket_Workflow,
                      label: `📌 ${view.Nombre}`,
                    })),
                  ]}
                  onAction={(key) =>
                    handleFilterClick(key === 'all' ? null : Number(key))
                  }
                  emptyContent="🚫 No hay filtros disponibles"
                  className="w-full rounded-md border dark:border-gray-600"
                  
                >
                  {(item) => (
                    <ListboxItem
                      key={item.key}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {item.label}
                    </ListboxItem>
                  )}
                </Listbox>
              </CardBody>
            </Card>
          </div>
        )}



        {/* Versión */}
        <div className="border-t border-gray-200 px-4 py-4 dark:border-[#1F1F23]">
          <Skeleton isLoaded={isLoaded} className="h-6 w-full rounded-lg">
            <NavItem onClick={() => {}} icon="fas fa-rocket">
              Versión {appVersion}
            </NavItem>
          </Skeleton>
        </div>
      </nav>

      {/* Overlay para cerrar el Sidebar en móviles */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[65] bg-black bg-opacity-50 lg:hidden"
          onClick={() => {
            setLocalIsMobileMenuOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}

    </>
  );
}
