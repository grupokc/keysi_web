'use client';

import { useEffect, useState } from 'react';
import { executeForCRUD } from '@/app/services/frontBack';
import { Card, CardHeader, CardBody, Spinner } from '@heroui/react';
import { Tabs, Tab } from '@heroui/react';
import { TicketStatusChart } from './ticket-status-chart';
import { TicketCategoryChart } from './ticket-category-chart';
import { TicketPromotoriaChart } from './ticket-promotoria-chart';
import { RecentTicketsTable } from './recent-tickets-table';

interface User {
  Id_Agente?: number;
  Id_Promotoria?: number;
  Id_Tipo?: number;
  Id_Categoria?: number;
}

interface TicketDashboardProps {
  user?: User;
  idAgente?: number;
}

export default function TicketDashboard({ user, idAgente }: TicketDashboardProps) {
  const agente = idAgente ?? user?.Id_Agente;
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalTickets: 0,
    ticketsNuevos: 0,
    ticketsAbiertos: 0,
    ticketsCerrados: 0,
  });

 // 🔹 Determinar qué filtro usar (Id_Agente o Id_Promotoria)
 const getFilterParams = () => {
  if (idAgente !== undefined) {
    return { Id_Agente: idAgente }; // Si se pasa `idAgente`, se usa directamente.
  }
  if (user?.Id_Tipo === 2 && user?.Id_Categoria === 10) {
    return { Id_Promotoria: user.Id_Promotoria };
  }
  if (user?.Id_Tipo === 1) {
    return {}; // No enviamos ningún filtro
  }
  return { Id_Agente: user?.Id_Agente }; // Caso por defecto
};

useEffect(() => {
  if (agente === undefined && !user) return; // 🚀 Ahora permite la ejecución si `idAgente` está definido.

  const fetchData = async () => {
    setLoading(true);
    try {
      const requestData: Record<string, any> = {
        ClassName: 'Mesa_De_Ayuda_Dashboard',
        Action: 'Get',
        url: "URL_NETAPI",
        ...getFilterParams(), // 🔹 Se añade el filtro dinámico
      };

      const response = await executeForCRUD(requestData);

      if (response.success && response.data.length > 0) {
        const data = response.data[0];
        setDashboardData({
          totalTickets: data.Total_Tickets || 0,
          ticketsNuevos: data.Tickets_Nuevos || 0,
          ticketsAbiertos: data.Tickets_Abiertos || 0,
          ticketsCerrados: data.Tickets_Cerrados || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }

    setLoading(false);
  };

  fetchData();
}, [agente, user?.Id_Promotoria, user?.Id_Tipo, user?.Id_Categoria]);
  

  return (
    <Tabs aria-label="overview">
           <Tab key="overview" title="Reporte del año">
        {loading ? (
          <div className="flex justify-center py-6">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium">Total de Tickets</p>
              </CardHeader>
              <CardBody>
                <div className="text-2xl font-bold">
                  {dashboardData.totalTickets}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData.totalTickets > 0
                    ? `100% de los tickets`
                    : 'No hay tickets registrados'}
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium">Tickets Nuevos</p>
              </CardHeader>
              <CardBody>
                <div className="text-2xl font-bold">
                  {dashboardData.ticketsNuevos}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData.totalTickets > 0
                    ? `${(
                        (dashboardData.ticketsNuevos /
                          dashboardData.totalTickets) *
                        100
                      ).toFixed(1)}% del total`
                    : 'No hay tickets nuevos'}
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium">Tickets Abiertos</p>
              </CardHeader>
              <CardBody>
                <div className="text-2xl font-bold">
                  {dashboardData.ticketsAbiertos}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData.totalTickets > 0
                    ? `${(
                        (dashboardData.ticketsAbiertos /
                          dashboardData.totalTickets) *
                        100
                      ).toFixed(1)}% aún abiertos`
                    : 'No hay tickets abiertos'}
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium">Tickets Cerrados</p>
              </CardHeader>
              <CardBody>
                <div className="text-2xl font-bold">
                  {dashboardData.ticketsCerrados}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData.totalTickets > 0
                    ? `${(
                        (dashboardData.ticketsCerrados /
                          dashboardData.totalTickets) *
                        100
                      ).toFixed(1)}% cerrados hasta la fecha`
                    : 'No hay tickets cerrados'}
                </p>
              </CardBody>
            </Card>
          </div>
        )}
        <div className="grid gap-4 pt-5 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <p>Estado de Tickets</p>
            </CardHeader>
            <CardBody className="pl-2">
              <TicketStatusChart {...getFilterParams()} />
            </CardBody>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <p>Distribución por Ramo</p>
            </CardHeader>
            <CardBody>
              <TicketCategoryChart {...getFilterParams()} />
            </CardBody>
          </Card>
        </div>
        <div className="grid gap-4 pt-5 md:grid-cols-2 lg:grid-cols-7">
          {user?.Id_Tipo === 1 ? ( // 🔹 Si `Id_Tipo === 1`, mostramos `TicketPromotoriaChart` y RecentTicketsTable ocupa 3 columnas
            <>
              <Card className="col-span-4">
                <CardHeader>
                  <p>Tickets por promotoria</p>
                </CardHeader>
                <CardBody className="pl-2">
                  <TicketPromotoriaChart />
                </CardBody>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <p>Tickets Recientes</p>
                </CardHeader>
                <CardBody className="overflow-auto">
                  <RecentTicketsTable {...getFilterParams()} />
                </CardBody>
              </Card>
            </>
          ) : (
            // 🔹 Si `Id_Tipo !== 1`, `RecentTicketsTable` ocupa TODO el ancho disponible
            <Card className="col-span-full">
              <CardHeader>
                <p>Tickets Recientes</p>
              </CardHeader>
              <CardBody className="overflow-auto">
                <RecentTicketsTable {...getFilterParams()} />
              </CardBody>
            </Card>
          )}
        </div>
      </Tab>
    </Tabs>
  );
}
