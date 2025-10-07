'use client';
import { useState, useEffect } from 'react';
import IndicadoresKC from '@/app/components/home/indicadoresKC';
import AgentCarousel from '@/app/components/home/AgentCarousel';
import { useSelectedValues } from '@/app/context/globalContext';

export default function HomePage() {
  const [user, setUser] = useState({});
  const { selectedValues } = useSelectedValues();

  useEffect(() => {
    const userCurrenly = JSON.parse(window?.localStorage?.getItem('user'));
    setUser(userCurrenly);
  }, []);

  return (
    <div className="">
      <div className="mx-auto">
        <div className="relative bg-gray-300 pb-20 pt-0 sm:px-6 lg:px-8 lg:pb-28 lg:pt-10">
          <div className="mb-20">
            <IndicadoresKC user={user} />
          </div>

          {/* Evitamos renderizar el carrusel si no hay promotoría seleccionada */}
          {selectedValues?.Id_Promotoria &&
            parseInt(selectedValues.Id_Promotoria, 10) !== 999999999 ? (
              <AgentCarousel 
                selectedPromotoria={selectedValues.Id_Promotoria} 
                promotoriaNombre={selectedValues.Nombre_Promotoria} 
              />
          ) : null}
        </div>
      </div>
    </div>
  );
}
