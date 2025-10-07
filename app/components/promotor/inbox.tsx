'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Chip,
  Divider,
  Skeleton,
} from '@heroui/react';
import useGetData from '@/app/hooks/useGetData';
import Indicadores from '@/app/components/promotor/indicadores';
import AgentesMetricaCard from './AgentesMetricasCard';
import MesaMetricaCard from './MesaMetricasCard';
import PersistenciaPromotoria from '@/app/components/promotor/persistencia';
import TicketDashboard from '../kc/dashboard/ticket-dashboard';

interface User {
  RutaFoto?: string;
  Nombre_Promotoria?: string;
  Nombre_Categoria?: string;
  Id_Agente?: number;
  Id_Promotoria?: number;
  Id_Tipo?: number;
  Id_Categoria?: number;
}

const PromotorInbox: React.FC = () => {
  const { push } = useRouter();
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);
  const [idPromotoria, setIdPromotoria] = useState<number>(0);

  const { data: dMetricas } = useGetData({
    ClassName: 'Metricas_X_Promotoria_IP',
    Action: 'Get',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIdPromotoria(JSON.parse(storedUser).Id_Promotoria);
    }
    setLoading(false);
  }, []);

  const navigateToReports = () => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    push('/reportes/');
  };

  return (
    <div className="min-h-screen w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Tarjeta Principal */}
      <Card className="rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 shadow-lg">
        <CardHeader className="flex flex-col items-center justify-between p-6 sm:flex-row">
          {/* Información del usuario */}
          <div className="flex items-center gap-6">
            {/* Avatar con borde sutil */}
            {loading ? (
              <Skeleton className="h-16 w-16 rounded-full" />
            ) : user?.RutaFoto ? (
              <Avatar
                src={user.RutaFoto}
                alt="Perfil"
                size="lg"
                className="border-2 border-gray-300 shadow-sm"
              />
            ) : (
              <Avatar size="lg" className="border-2 border-gray-300 shadow-sm">
                {user?.Nombre_Promotoria?.[0] || 'P'}
              </Avatar>
            )}

            {/* Nombre y categoría */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900">
                {user?.Nombre_Promotoria || 'Promotor'}
              </h2>
              {user?.Nombre_Categoria && (
                <Chip
                  variant="solid"
                  color="primary"
                  className="mt-1 text-sm font-medium"
                >
                  {user.Nombre_Categoria}
                </Chip>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="mt-4 flex space-x-4 sm:mt-0">
            <Button
              onPress={navigateToReports}
              variant="solid"
              color="primary"
              className="px-5 py-2"
            >
              📊 Reportes
            </Button>
            <Link href="/perfil">
              <Button variant="ghost" color="primary" className="px-5 py-2">
                👤 Perfil
              </Button>
            </Link>
          </div>
        </CardHeader>
      </Card>

      {/* Sección de Indicadores */}
      <Card className="mt-10">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">
            Indicadores Promotoría
          </h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <Indicadores />
        </CardBody>
      </Card>

      {/* Sección de métricas */}
      <Card className="mt-10">
        <CardHeader>

        </CardHeader>
        <Divider />
        <CardBody>
          {/* <TicketDashboard user={user}/> */}
          <div className="mt-6 flex gap-6 ">
            {dMetricas?.length > 0 && (
              <>
                {/* Tarjeta de Agentes */}
                <div className="rounded-xl border border-gray-200 shadow-md w-1/3 ">
                    <AgentesMetricaCard />
                </div>

                {/* Tarjeta de Mesa */}
                <div className="rounded-xl border border-gray-200 shadow-md w-2/3 ">
                    <MesaMetricaCard Id_Promotoria={idPromotoria} />
                </div>
              </>
            )}
          </div>
        </CardBody>
      </Card>
      

      {/* Sección de Persistencia */}
      <Card className="mt-10">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Persistencia</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <PersistenciaPromotoria />
        </CardBody>
      </Card>
    </div>
  );
};

export default PromotorInbox;
