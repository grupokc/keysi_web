'use client';

import { useEffect, useState, useRef } from 'react';
import { Skeleton, Spinner } from '@heroui/react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Chip,
  Divider,
} from '@heroui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Indicadores from '@/app/components/agente/indicadores';
import Persistencia from '@/app/components/agente/persistencia';
import Tramites from '@/app/components/agente/tramites';
import KCCoins from '@/app/components/agente/kccoins';
import Mesa from './mesa';
import Rank from './rank';
import TicketDashboard from '../kc/dashboard/ticket-dashboard';

interface User {
  id?: number;
  name?: string;
  email?: string;
  [key: string]: any;
  Id_Agente?: number;
  Id_Promotoria?: number;
  Id_Tipo?: number;
  Id_Categoria?: number;
}

const CARDS = [Persistencia, KCCoins];

export default function AgenteInbox() {
  const [user, setUser] = useState<User | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🚀 AutoPlay del carrusel + Loop infinito
  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;

    // 🔄 Función para mover el carrusel automáticamente
    const nextSlide = () => {
      if (!carousel) return;
      const scrollAmount = carousel.clientWidth;
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      // Si llega al final, regresa al inicio sin que se note
      if (
        carousel.scrollLeft + carousel.clientWidth >=
        carousel.scrollWidth - 1
      ) {
        setTimeout(() => {
          carousel.scrollTo({ left: 0, behavior: 'auto' });
        }, 500);
      }
    };

    // ⏳ Inicia autoplay
    autoplayRef.current = setInterval(nextSlide, 3000);

    // ⚡ Si el usuario toca el carrusel, se pausa y se reanuda después de 3s
    const handleUserScroll = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = setTimeout(() => {
        autoplayRef.current = setInterval(nextSlide, 3000);
      }, 5000); // 5s de espera antes de reanudar
    };

    carousel.addEventListener('scroll', handleUserScroll);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      carousel.removeEventListener('scroll', handleUserScroll);
    };
  }, []);

  // 🎮 Función para los botones de navegación
  const scrollLeft = () => {
    if (carouselRef.current) {
      if (carouselRef.current.scrollLeft <= 0) {
        // Si estás en el primer slide, regresa al último
        carouselRef.current.scrollTo({
          left: carouselRef.current.scrollWidth,
          behavior: 'instant',
        });
      }
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      if (
        carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
        carouselRef.current.scrollWidth - 1
      ) {
        // Si llegas al final, vuelve al primero
        carouselRef.current.scrollTo({ left: 0, behavior: 'instant' });
      }
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
        <Spinner className="h-8 w-8 text-blue-900" />
        <p className="text-sm text-gray-500">
          Cargando información del usuario...
        </p>
        <div className="w-full max-w-lg space-y-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[80vw]  px-2 md:px-4">


      {/* Contenedor de Indicadores */}
      <div className="relative p-2">
      <Indicadores user={user} />
      </div>

      {/* Contenedor del Carrusel CENTRADO con Botones */}
      <div className="relative flex w-full justify-center overflow-hidden rounded-lg border border-gray-300 shadow-lg">
        {/* Verificamos si hay más de 2 elementos o si estamos en móvil para activar el carrusel */}
        {CARDS.length > 2 || window.innerWidth < 768 ? (
          <>
            {/* Botón Izquierdo */}
            <button
              className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/50 p-4 text-white transition hover:bg-black/70 sm:block"
              onClick={scrollLeft}
            >
              <ChevronLeft size={36} />
            </button>
          </>
        ) : null}

        {/* Contenedor de las tarjetas con flexbox para mantener alineación */}
        <div className="w-full max-w-[95%] overflow-hidden">
          <div
            ref={carouselRef}
            className={`flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth sm:justify-start md:justify-center`}
            style={{
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Si hay exactamente dos elementos en escritorio, mostramos ambos sin scroll */}
            {CARDS.length === 2 && window.innerWidth >= 768
              ? CARDS.map((Component, index) => (
                  <div key={index} className="min-w-[45%] max-w-[45%] flex-1">
                    <Component />
                  </div>
                ))
              : // Si hay más de dos elementos o estamos en móvil, activamos el carrusel infinito
                [...CARDS, ...CARDS, ...CARDS].map((Component, index) => (
                  <div
                    key={index}
                    className="w-[90%] max-w-[600px] flex-none snap-center sm:w-[70%] md:w-[50%]"
                  >
                    <Component />
                  </div>
                ))}
          </div>
        </div>

        {/* Verificamos si hay más de 2 elementos o si estamos en móvil para activar los botones */}
        {CARDS.length > 2 || window.innerWidth < 768 ? (
          <>
            {/* Botón Derecho */}
            <button
              className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/50 p-4 text-white transition hover:bg-black/70 sm:block"
              onClick={scrollRight}
            >
              <ChevronRight size={36} />
            </button>
          </>
        ) : null}
      </div>

      {/* Sección de métricas */}
      {/* <Card className="mt-10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <h2 className="text-2xl font-bold text-gray-900">Métricas</h2>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
        <TicketDashboard idAgente={user?.Id_Agente} />
        </CardBody>
      </Card> */}

      {/* Contenedor de Indicadores */}
      <div className="">
        <Rank person={user} />
      </div>
    </div>
  );
}
