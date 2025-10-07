'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Loading from '@/app/components/Loading';
import BonosItem from '@/app/components/bonos/BonosItem';
import { executeForCRUD } from '@/app/services/frontBack';
import { ChevronLeftIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { Card, CardHeader, CardBody, Button, Divider } from '@heroui/react';
import Search from '../Grid/search';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Interfaces
interface BonosProps {
  idCia: string;
}

interface Bono {
  Recno: number;
  Id_Cia: number;
  Id_Ramo: number;
  Id_Helios_Cuaderno_Bono: number;
  Anio: number;
  Nombre_Helios_Bono_Catalogo: string;
  Id_Helios_Bono_Catalogo: number;
  Nombre_Ramo: string;
  Fecha_Desde: string;
  Fecha_Hasta: string;
  Nombre_Cia: string;
  Id_Helios_Bono_Periodo: number;
  Nombre_Helios_Cuaderno_Bono: string;
  Nombre_Helios_Bono_Tipo: string;
  Id_Helios_Bono_Tipo: number;
  Cumplimiento_Banda: number;
  Cumplimiento_Requisitos: number;
  Con_Tabla: number;
}

interface Cia {
  Nombre_Cia: string;
  Id_Cia: number;
}

interface User {
  Guid_Agente: string;
}

const Bonos: React.FC<BonosProps> = ({ idCia }) => {
  const router = useRouter();
  const [cia, setCia] = useState<Cia>({ Nombre_Cia: '', Id_Cia: 0 });
  const [dataToPrint, setDataToPrint] = useState<Bono[]>([]);
  const [data, setData] = useState<Bono[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [filterValue, setFilterValue] = useState<string>('');
  const [showNoBonosModal, setShowNoBonosModal] = useState(false);

  // Filtrar data según el año
  const filterData = (anio: number = 2025) => {
    setDataToPrint(data.filter((e) => e.Anio === anio));
  };

  // Función para limpiar la búsqueda
  const handleClearSearch = () => {
    setFilterValue('');
  };

  useEffect(() => {
    setCia({
      Nombre_Cia: idCia === '1' ? 'MetLife' : 'Grupo KC',
      Id_Cia: parseInt(idCia, 10),
    });

    const init = async () => {
      try {
        const lastUser: User | null = JSON.parse(
          window.localStorage.getItem('user') || 'null',
        );

        if (lastUser) {
          setUser(lastUser);
          const response = await executeForCRUD({
            className: 'Titan_Bonos_Resultados',
            action: 'Get',
            Guid_Agente: lastUser.Guid_Agente,
          });
          console.log('Titan_Bonos_Resultados response:', response);
          setData(response.data || []);
          setDataToPrint(response.data || []);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    init();
  }, [idCia]);

  useEffect(() => {
    filterData(2025);
  }, [data]);

  // 🔍 Filtrar los bonos en base a la búsqueda
  const filteredBonos = dataToPrint.filter((bono) =>
    bono.Nombre_Helios_Bono_Catalogo.toLowerCase().includes(
      filterValue.toLowerCase(),
    ),
  );

  // Mostrar modal si no hay bonos para la compañía seleccionada
  useEffect(() => {
    if (cia.Id_Cia > 0 && data.length > 0) {
      const hayBonos = data.some((e) => e.Id_Cia === cia.Id_Cia);
      setShowNoBonosModal(!hayBonos);
    } else {
      setShowNoBonosModal(false);
    }
  }, [cia, data]);

  return (
    <>
      {showNoBonosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-2">Lo sentimos</h2>
            <p className="mb-6">No cuentas con bonos disponibles.</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
              onClick={() => {
                setShowNoBonosModal(false);
                if (user && user.Guid_Agente && user.Guid_Agente.includes('PROM')) {
                  router.push('/inbox/promotores');
                } else {
                  router.push('/inbox/agentes');
                }
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {cia.Id_Cia > 0 && data.length > 0 ? (
        <div className=" mx-auto h-full w-full max-w-7xl bg-cover bg-fixed bg-center px-4 pb-10 sm:px-6">
          {/* Header fijo con logo separado */}
          <div className="sticky top-0 z-40 bg-white shadow-md">
            {/* Logo separado y centrado arriba */}
            <div className={`flex items-center justify-center ${cia.Id_Cia === 9 ? 'h-28' : 'h-16'}`}>
              <Image
                src={
                  cia.Id_Cia === 9
                    ? 'https://cdngrupokc.azureedge.net/web/img/logos/GrupoKCLogo300.png'
                    : 'https://cdngrupokc.azureedge.net/web/img/logos/MetLife.png'
                }
                width={cia.Id_Cia === 9 ? 120 : 190}
                height={cia.Id_Cia === 9 ? 120 : 50}
                alt="Grupo KC"
                className=""
              />
            </div>

            {/* Toolbar con botones y búsqueda */}
            <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
              {/* Botón de Salir */}
              <Button
                color="primary"
                startContent={<ChevronLeftIcon className="h-5 w-5" />}
                onPress={() => router.push('/inbox/agentes')}
                className="w-auto"
              >
                Salir de bonos
              </Button>

              {/* Search dentro de la toolbar */}
              <div className="flex flex-1 justify-center px-4">
                <Search
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}
                  onClear={handleClearSearch}
                />
              </div>

              {/* Botón de Año */}
              <Button
                color="primary"
                startContent={<ChevronDownIcon className="h-5 w-5" />}
                onPress={() => filterData(2025)}
                className="w-auto"
              >
                2025
              </Button>
            </div>
          </div>

          {/* Secciones de Bonos */}
          <div className="mt-10 space-y-8">
            {/* Vida - Carrusel */}
            <Card className="w-full">
              <CardHeader className="rounded-t-lg bg-blue-100 p-4 text-black">
                <h2 className="text-xl font-semibold">Vida</h2>
              </CardHeader>
              <Divider />
              <CardBody className="overflow-hidden">
                <div className="scrollbar-show w-full overflow-x-auto">
                  <div className="flex flex-nowrap gap-6 px-4">
                    {filteredBonos
                      .filter(
                        (e) =>
                          e.Id_Cia === cia.Id_Cia &&
                          e.Id_Ramo === 1 &&
                          e.Id_Helios_Cuaderno_Bono !== 17,
                      )
                      .map((bono) => (
                        <div
                          key={bono.Recno}
                          className="w-[320px] snap-center p-2"
                        >
                          <BonosItem {...bono} />
                        </div>
                      ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Gastos Médicos - Carrusel */}
            <Card className="w-full">
              <CardHeader className="rounded-t-lg bg-green-100 p-4 text-black">
                <h2 className="text-xl font-semibold">Gastos Médicos</h2>
              </CardHeader>
              <Divider />
              <CardBody className="overflow-hidden">
                <div className="scrollbar-show w-full overflow-x-auto">
                  <div className="flex flex-nowrap gap-6 px-4">
                    {filteredBonos
                      .filter(
                        (e) =>
                          e.Id_Cia === cia.Id_Cia &&
                          e.Id_Ramo === 5 &&
                          e.Id_Helios_Cuaderno_Bono !== 17,
                      )
                      .map((bono) => (
                        <div
                          key={bono.Recno}
                          className="w-[320px] snap-center p-2"
                        >
                          <BonosItem {...bono} />
                        </div>
                      ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Bonos;
