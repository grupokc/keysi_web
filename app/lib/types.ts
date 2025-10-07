import { DatosUsuario, SedeData } from "./interfaces";

export type PasoUnoProps = {
  alSiguiente: () => void;
  alPasoError: () => void;
  alAnterior: () => void;
};

export type PasoSeisProps = {
  alConfirmar: (datos: {
    correo: string;
    folioConfirmacion: string;
    sedeSeleccionada: SedeData | null;
    datosUsuario: DatosUsuario;
  }) => void;
  alAnterior: () => void;
  sedeSeleccionada: SedeData | null;
  datosUsuario: DatosUsuario;
};

export type ConfirmacionProps = {
  alTerminar: () => void;
  folioConfirmacion: string;
  correo: string;
  sedeSeleccionada: SedeData | null;
  datosUsuario: DatosUsuario;
};

export type LayoutProps = {
  children: React.ReactNode;
  subtitle?: string;
  alSiguiente?: () => void;
  siguienteHabilitado?: boolean; 
  mostrarVolver?: boolean;
  alVolver?: () => void;
  siguienteTexto?: string;
};

export type ListaArchivos = File & {
  preview: string;
};

