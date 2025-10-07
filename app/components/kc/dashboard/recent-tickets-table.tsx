"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  getKeyValue,
} from "@heroui/react"
import { executeForCRUD } from "@/app/services/frontBack"

interface TicketData {
  Id_Ticket: string
  Asunto: string
  Nombre_Ticket_Estatus: string
  Fecha_Creacion: string
}

interface RecentTicketsTableProps {
  Id_Agente?: number // Parámetro opcional para filtrar por agente
  Id_Promotoria?: number // Parámetro opcional para filtrar por promotoria
}

export function RecentTicketsTable({ Id_Agente, Id_Promotoria }: RecentTicketsTableProps) {
  const [loading, setLoading] = useState(true)
  const [tickets, setTickets] = useState<TicketData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const requestData: Record<string, any> = {
          ClassName: "Mesa_De_Ayuda_Dashboard_Tickets",
          Action: "Report",
          url: "URL_NETAPI"
        }

        // 🔹 Agregar `Id_Promotoria` si está presente, de lo contrario usar `Id_Agente`
        if (Id_Promotoria) {
          requestData["Id_Promotoria"] = Id_Promotoria
        } else if (Id_Agente) {
          requestData["Id_Agente"] = Id_Agente
        }

        const response = await executeForCRUD(requestData)

        if (response.success && Array.isArray(response.data)) {
          // 🔹 Transformamos los datos para la tabla
          const formattedData = response.data.map((item: any) => ({
            Id_Ticket: item.Id_Ticket.toString(),
            Asunto: item.Asunto || "Sin Asunto",
            Nombre_Ticket_Estatus: item.Nombre_Ticket_Estatus || "Desconocido",
            Fecha_Creacion: new Date(item.Fecha_Creacion).toLocaleDateString(),
          }))

          setTickets(formattedData)
        }
      } catch (error) {
        console.error("Error fetching recent tickets:", error)
      }

      setLoading(false)
    }

    fetchData()
  }, [Id_Agente, Id_Promotoria]) 

  return (
    <Table aria-label="Tickets recientes">
      <TableHeader>
        <TableColumn key="Id_Ticket">ID</TableColumn>
        <TableColumn key="Asunto">Título</TableColumn>
        <TableColumn key="Nombre_Ticket_Estatus">Estado</TableColumn>
        <TableColumn key="Fecha_Creacion">Fecha</TableColumn>
      </TableHeader>
      <TableBody items={tickets} isLoading={loading} loadingContent={<Spinner label="Cargando..." />}>
        {(item) => (
          <TableRow key={item.Id_Ticket}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
