'use client';

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { useEffect } from 'react';
import { useSystemType } from './hooks/useSystemType';
import { SYSTEMS_CONFIG } from './config/systems.js';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const systemType = useSystemType();

  // Obtener la configuración del sistema actual
  const currentSystem = systemType === 'ss' ? SYSTEMS_CONFIG.ss : SYSTEMS_CONFIG.titan;

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
      document.title = "Keysi Web" ;
    }
  }, [systemType, currentSystem]);

  return (
      <html lang="es" suppressHydrationWarning>
        <head>
          {/* Favicon y título manejados dinámicamente */}
        </head>

        <body className={`${inter.className} antialiased`}>
          <main className="min-h-screen flex-grow overflow-auto p-6 bg-white dark:bg-[#0F0F12]">
              {children}
          </main>
        </body>
      </html>
  );
}
