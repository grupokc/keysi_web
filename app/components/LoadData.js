import { Skeleton } from "@heroui/react"
import { Spinner } from "@heroui/react"

export default function LoadData() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[10vh] my-auto space-y-3">
      {/* Skeleton simula una caja de carga */}
      <Skeleton className="w-16 h-16 rounded-full" />
      
      {/* Spinner de HeroUI para carga */}
      <Spinner className="w-8 h-8 text-blue-900" />

      {/* Texto animado con pulsación */}
      <p className="text-blue-900 text-center font-bold animate-pulse">
        Cargando...
      </p>
      
      {/* Skeleton simula un texto de carga */}
      <Skeleton className="w-32 h-4 rounded-md" />
    </div>
  )
}
