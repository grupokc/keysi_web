"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { executeForCRUD } from "@/app/services/frontBack"
import { Spinner } from "@heroui/react"

interface ChartData {
  name: string
  nuevos: number
  abiertos: number
  cerrados: number
}

interface TicketStatusChartProps {
  Id_Agente?: number 
  Id_Promotoria?: number 
}

export function TicketStatusChart({ Id_Agente, Id_Promotoria }: TicketStatusChartProps) {
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<ChartData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const requestData: Record<string, any> = {
          ClassName: "Mesa_De_Ayuda_Dashboard_Estatus",
          Action: "Report",
          url: "URL_NETAPI",
        }

        if (Id_Promotoria) {
          requestData["Id_Promotoria"] = Id_Promotoria
        } else if (Id_Agente) {
          requestData["Id_Agente"] = Id_Agente
        }

        const response = await executeForCRUD(requestData)

        if (response.success && Array.isArray(response.data)) {
          // 🔹 Tipamos explícitamente `acc` y `item`
          const rawData = response.data.reduce((acc: Record<string, ChartData>, item: any) => {
            acc[item.Mes] = {
              name: item.Mes.charAt(0).toUpperCase() + item.Mes.slice(1), // Capitaliza el mes
              nuevos: item.Tickets_Nuevos || 0,
              abiertos: item.Tickets_Abiertos || 0,
              cerrados: item.Tickets_Cerrados || 0
            }
            return acc
          }, {} as Record<string, ChartData>)

          // Aseguramos que todos los meses estén en el gráfico
          const monthOrder = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
          ]

          const formattedData = monthOrder.map((month) => ({
            name: month,
            nuevos: rawData[month]?.nuevos || 0,
            abiertos: rawData[month]?.abiertos || 0,
            cerrados: rawData[month]?.cerrados || 0
          }))

          setChartData(formattedData)
        }
      } catch (error) {
        console.error("Error fetching ticket status chart data:", error)
      }

      setLoading(false)
    }

    fetchData()
  }, [Id_Agente,Id_Promotoria])

  return (
    <ResponsiveContainer width="100%" height={350}>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" />
        </div>
      ) : (
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="nuevos" stroke="#FFA500" dot={{ r: 4 }} />
          <Line type="monotone" dataKey="abiertos" stroke="#8884d8" dot={{ r: 4 }} />
          <Line type="monotone" dataKey="cerrados" stroke="#82ca9d" dot={{ r: 4 }} />
        </LineChart>
      )}
    </ResponsiveContainer>
  )
}
