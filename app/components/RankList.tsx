import { Skeleton } from '@heroui/react';
import RankCard from './RankCard';
import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

interface RankItem {
  Nombre_Promotoria: string;
  Nombre_Agente: string;
  Recno: number;
  Monto: number;
  Fecha_Ingreso: string;
  Estado_Nombre: string;
  RutaFoto?: string;
}

interface RankListProps {
  data: RankItem[];
  loading: boolean;
}

const RankList: React.FC<RankListProps> = ({ data, loading }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Función para manejar el scroll al hacer clic en los botones
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Distancia de desplazamiento en píxeles
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Botón izquierdo */}
      <button
        className="
    // Oculta en pantallas 
    < md absolute left-0 top-1/2 z-10 
    hidden -translate-y-1/2
    rounded-full bg-gray-700   p-2 text-white shadow-md transition hover:bg-gray-900 md:block
  "
        onClick={() => scroll('left')}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      {/* Contenedor del scroll horizontal */}
      <div
        ref={scrollContainerRef}
        className="scrollbar-visible flex flex-nowrap gap-6 overflow-x-auto scroll-smooth p-4"
      >
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-80 w-64 flex-shrink-0 rounded-lg"
              />
            ))
          : data.map((item, index) => (
              <RankCard
                key={index}
                nombrePromotoria={item.Nombre_Promotoria}
                nombreAgente={item.Nombre_Agente}
                recno={item.Recno}
                monto={item.Monto}
                fechaIngreso={item.Fecha_Ingreso}
                estado={item.Estado_Nombre}
                rutaFoto={item.RutaFoto}
                rankIndex={index}
              />
            ))}
      </div>

      {/* Botón derecho */}
      <button
        className="
    // Oculta en pantallas 
    < md absolute right-0 top-1/2 z-10 
    hidden -translate-y-1/2
    rounded-full bg-gray-700   p-2 text-white shadow-md transition hover:bg-gray-900 md:block
  "
        onClick={() => scroll('right')}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default RankList;
