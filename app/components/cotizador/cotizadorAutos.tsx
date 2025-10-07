'use client';

import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';

interface User {
  Guid: string;
  Guid_Agente: string;
  Id_Usuario: number;
  Nombre_Persona: string;
  Email: string;
  // ... otros campos según sea necesario
} 

export default function CotizadorAutos() {
  const [user, setUser] = useLocalStorage("user", null);

  useEffect(() => {
    // Función para cargar recursos de manera dinámica
    const load = (function () {
      function _load(tag: string) {
        return function (url: string) {
          return new Promise(function (resolve, reject) {
            const element = document.createElement(tag);
            let parentElement: HTMLElement | HTMLHeadElement = document.body;
            let attr = 'src';

            element.onload = function () {
              resolve(url);
            };
            element.onerror = function () {
              reject(url);
            };

            switch (tag) {
              case 'script':
                (element as HTMLScriptElement).async = true;
                break;
              case 'link':
                (element as HTMLLinkElement).type = 'text/css';
                (element as HTMLLinkElement).rel = 'stylesheet';
                attr = 'href';
                parentElement = document.head;
                break;
            }

            (element as any)[attr] = url;
            parentElement.appendChild(element);
          });
        };
      }

      return {
        css: _load('link'),
        js: _load('script'),
        img: _load('img')
      };
    })();

    // Cargar los recursos del widget
    Promise.all([
      load.css('https://d3r5xg4ssqz33b.cloudfront.net/main.css?v=1.2.0')
    ]).then(() => {
      Promise.all([
        load.js('https://d3r5xg4ssqz33b.cloudfront.net/main.js?v=1.2.0')
      ])
        .then(function () {
          // Configurar el widget cuando los recursos estén cargados
          document.body.addEventListener('widget:loaded', function() {
            const { eventBus, render } = (window as any).weecoverWidget.default.widget('widget1');
            
            render('ES', 'TEST', {
              agentId: user?.Guid || null, 
              primaryColor: '#08B07E',
              secondaryColor: '#08B07E',
              fontPrimary: 'Lato, sans-serif',
              fontSecondary: 'Mukta, sans-serif'
            });
          });

          // Disparar el evento widget:loaded
          const event = new Event('widget:loaded');
          document.body.dispatchEvent(event);
        })
        .catch(function (error) {
          console.error(error);
          console.error('Ha ocurrido un error al cargar el widget');
        });
    });

    // Cleanup function
    return () => {
      // Remover los scripts y estilos cuando el componente se desmonte
      const scripts = document.querySelectorAll('script[src*="d3r5xg4ssqz33b.cloudfront.net"]');
      const styles = document.querySelectorAll('link[href*="d3r5xg4ssqz33b.cloudfront.net"]');
      
      scripts.forEach(script => script.remove());
      styles.forEach(style => style.remove());
    };
  }, [user]);

  return (
    <div className="w-full h-screen">
      <div id="widget1" className="w-full h-full"></div>
    </div>
  );
}
