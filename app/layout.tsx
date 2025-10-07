'use client';

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { ViewTransitions } from 'next-view-transitions';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserKCContextProvider } from '@/app/context/userKCContext';
import { ComunicadosProvider } from '@/app/context/ComunicadosContext';
import { executeForCRUD } from './services/frontBack';
import Sidebar from './components/Sidebar';
import TopNav from '@/app/components/top-nav';
import Head from 'next/head';
import { useSystemType } from './hooks/useSystemType';
import { SYSTEMS_CONFIG } from './config/systems.js';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<string>(pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTicketsPage, setIsTicketsPage] = useState(false);
  const [views, setViews] = useState([]);
  const systemType = useSystemType();

  // Obtener la configuración del sistema actual
  const currentSystem = systemType === 'ss' ? SYSTEMS_CONFIG.ss : SYSTEMS_CONFIG.titan;

  // Sincronizar selectedView con la URL actual
  useEffect(() => {
    setSelectedView(pathname);
    setIsTicketsPage(pathname.startsWith('/tickets'));
  }, [pathname]);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 1024);
    checkScreenSize(); // Verificar al inicio
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Actualizar el título y favicon dinámicamente
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Actualizar favicon
      const link = (document.querySelector("link[rel*='icon']") || document.createElement('link')) as HTMLLinkElement;
      link.type = 'image/png';
      link.rel = 'icon';
      link.href = currentSystem.favicon;
      document.head.appendChild(link);

      // Actualizar título
      document.title = currentSystem.name;
    }
  }, [systemType, currentSystem]);

   // Cargar vistas dinámicamente si estamos en "/tickets" o "/siniestros"
   useEffect(() => {
    const loadViews = async () => {
      const isSiniestrosPage = pathname === '/siniestros';
      if (isTicketsPage || isSiniestrosPage) {
        try {
          const result = await executeForCRUD({
            className: "Ticket_WorkFlows",
            action: "Get",
            Id_Mesa: isSiniestrosPage ? 6 : 1,
          });

          if (result?.success && Array.isArray(result.data)) {
            setViews(result.data);
          } else {
            console.warn("No se encontraron vistas:", result);
            setViews([]);
          }
        } catch (error) {
          console.error("Error al cargar vistas:", error);
        }
      }
    };

    loadViews();
  }, [isTicketsPage, pathname]);

  return (
      <html lang="es" suppressHydrationWarning>
        <head>
          {/* Eliminar el favicon estático y título aquí, ya que los manejamos dinámicamente */}
        </head>
        <Script
          src="https://kit.fontawesome.com/f3445e5574.js"
          crossOrigin="anonymous"
        />

        <body className={`${inter.className} antialiased`}>
          
          <main className="mt-16 min-h-0 flex-grow overflow-auto p-6 dark:bg-[#0F0F12]">
              {children}
          </main>

        </body>
      </html>
  );
}
