"use client";

import { Spinner, Tabs, Tab, Card, CardBody, CardHeader } from "@heroui/react";
import { TicketStatusChart } from "../components/kc/dashboard/ticket-status-chart";
import { TicketCategoryChart } from "../components/kc/dashboard/ticket-category-chart";
import { TicketPromotoriaChart } from "../components/kc/dashboard/ticket-promotoria-chart";
import { RecentTicketsTable } from "../components/kc/dashboard/recent-tickets-table";
import { useSiniestrosDashboard } from "@/app/hooks/useSiniestrosDashboard";
import NotificacionesWA from "./notificaciones_WA/notificacionesWA";
import { DashboardCards } from "./components/DashboardCards";
import { useState, useEffect } from "react";
import { Skeleton } from "@heroui/react";

export default function SiniestrosDashboard() {
  const {
    loading,
    initialLoading,
    dashboardData,
    selectedTab,
    setSelectedTab,
    user,
    isMounted,
    iframeHeight,
    isAllowed,
    isModalOpen,
    setIsModalOpen,
    hasRejectedNotifications,
    iframeRef,
    getFilterParams,
  } = useSiniestrosDashboard();

  const [iframeMessages, setIframeMessages] = useState<string[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verificar que el mensaje venga del iframe correcto
      if (event.source === iframeRef.current?.contentWindow) {
        const message = event.data;
        setIframeMessages(prev => [...prev, JSON.stringify(message)]);

        // Procesar mensaje NAVIGATE_TO_GRID
        if (message.type === "NAVIGATE_TO_GRID" && message.filters) {
          // Guardar filtros en localStorage
          localStorage.setItem('selectedFilters', JSON.stringify(message.filters));
          
          // Enviar mensaje de vuelta al iframe para aplicar los filtros
          iframeRef.current?.contentWindow?.postMessage(
            { type: 'APPLY_FILTERS', filters: message.filters },
            '*'
          );
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [iframeRef]);

  return (
    <>
      <Tabs selectedKey={selectedTab} onSelectionChange={(key) => setSelectedTab(String(key))}>
        {/* {isAllowed && (
          <Tab key="overview" title="Reporte del año">
            {loading ? (
              <div className="flex justify-center py-6">
                <Spinner size="lg" />
              </div>
            ) : (
              <>
                <DashboardCards dashboardData={dashboardData} />
                <div className="grid gap-4 pt-5 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <p>Estado de Tickets</p>
                    </CardHeader>
                    <CardBody>
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
                  {user?.Id_Tipo === 1 ? (
                    <>
                      <Card className="col-span-4">
                        <CardHeader>
                          <p>Tickets por Promotoría</p>
                        </CardHeader>
                        <CardBody>
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
              </>
            )}
          </Tab>
        )} */}
        <Tab key="details" title="Mesa">
          <Card className="h-[80vh]">
            <CardBody className="h-full">
              {initialLoading ? (
                <div className="w-full animate-pulse">
                  {/* Header con título y búsqueda */}
                  <div className="flex items-center justify-between mb-6">
                    <Skeleton className="h-6 w-44" />
                    <div className="flex gap-4 items-center">
                      <Skeleton className="h-10 w-64 rounded-lg" /> {/* Barra de búsqueda */}
                      <Skeleton className="h-10 w-32 rounded-lg" /> {/* Botón agregar */}
                    </div>
                  </div>
                  
                  {/* Card contenedor */}
                  <Card>
                    <CardBody>
                      {/* Headers de la tabla */}
                      <div className="grid grid-cols-6 gap-4 px-6 py-3 bg-gray-50 -mx-6 -mt-6">
                        <Skeleton className="h-4 w-16" /> {/* Ticket */}
                        <Skeleton className="h-4 w-32" /> {/* Agente */}
                        <Skeleton className="h-4 w-32" /> {/* Asunto */}
                        <Skeleton className="h-4 w-28" /> {/* Estado */}
                        <Skeleton className="h-4 w-32" /> {/* Asegurado */}
                        <Skeleton className="h-4 w-20" /> {/* Acciones */}
                      </div>
                      
                      {/* Filas de la tabla */}
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="grid grid-cols-6 gap-4 px-6 py-4 border-t border-gray-100 -mx-6">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-36" />
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-6 w-28 rounded-full" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-8 w-24 rounded-md" />
                        </div>
                      ))}

                      {/* Footer con paginación */}
                      <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 -mx-6 -mb-6">
                        <Skeleton className="h-4 w-32" /> {/* Total tickets */}
                        <div className="flex gap-2">
                          {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-8 w-8 rounded-md" />
                          ))}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ) : isAllowed ? (
                <iframe
                  ref={iframeRef}
                  id="iframe-mesa-ayuda"
                  src={`https://tts.grupokc.com.mx/${user.Token}/Siniestros/ticket_list`}
                  className="w-full"
                  title="Mesa de Siniestros"
                  style={{ height: iframeHeight, border: "none" }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="text-2xl font-semibold text-gray-700">
                    Acceso Restringido
                  </div>
                  <div className="text-gray-500">
                    No tienes los permisos necesarios para acceder a esta sección.
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      {isAllowed && !hasRejectedNotifications && (
        <NotificacionesWA isOpen={isModalOpen} setIsOpen={setIsModalOpen} user={user} />
      )}
    </>
  );
}
