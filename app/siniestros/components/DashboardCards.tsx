import { Card, CardHeader, CardBody } from "@heroui/react";

export function DashboardCards({ dashboardData }: { dashboardData: any }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[
        { title: "Total de Tickets", value: dashboardData.totalTickets },
        { title: "Tickets Nuevos", value: dashboardData.ticketsNuevos },
        { title: "Tickets Abiertos", value: dashboardData.ticketsAbiertos },
        { title: "Tickets Cerrados", value: dashboardData.ticketsCerrados },
      ].map(({ title, value }, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <p className="text-sm font-medium">{title}</p>
          </CardHeader>
          <CardBody>
            <div className="text-2xl font-bold">{value}</div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
