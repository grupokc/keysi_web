import Image from "next/image";
import { Skeleton, Spinner } from '@heroui/react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] my-auto gap-6">


      {/* Texto animado */}
      <p className="text-blue-900 text-center font-bold animate-pulse">
        Cargando...
      </p>

      {/* Imagen animada de carga */}
      <figure className="flex justify-center">
        <Image width={60} height={60} src="/img/load.gif" alt="titan" />
      </figure>

      {/* Skeleton simulando carga de contenido */}
      <div className="w-full max-w-md flex flex-col gap-3">
        <Skeleton className="h-6 w-3/4 mx-auto" /> {/* Simula un título */}
        <Skeleton className="h-4 w-full" /> {/* Simula un párrafo */}
        <Skeleton className="h-4 w-5/6 mx-auto" /> {/* Simula un subtexto */}
      </div>
    </div>
  );
}
