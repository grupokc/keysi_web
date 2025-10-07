export interface RegistroInfoResponse {
  success: boolean;
  data: {
    Esta_Confirmado: number;
    Nombre_Estado: string;
    Nombre: string;
    Id_VC_Registro: number;
    
  }[];
}

export interface SedeData {
  Id_VC_Fecha_X_Sede: number;
  Id_VC_Sede: number;
  Id_VC_Registro: number;
  Nombre_Estado: string;
  Nombre_Ciudad: string;
  Nombre_Hospital: string;
  Fecha: string;
  Direccion: string;
  Limite: number;
}

export interface Hospital {
  Id_VC_Sede: number;
  Nombre_Hospital: string;
  Nombre_Estado: string;
  sedes: SedeData[];
}

export interface SedesResponse {
  success: boolean;
  data: SedeData[];
}

export interface RegistroInfo {
  registro: string;
  Id_VC_Registro: number;
  nombre: string; 
  Nombre_Estado: string;
  Nombre_Ciudad: string;
  Nombre_Hospital: string;
  Fecha: string;
}

// Define cómo se verán los datos del usuario para PasoSeis
export interface DatosUsuario {
  registro: string;
  nombre: string; 
  Id_VC_Registro: number | undefined;
  Id_VC_Sede: number | undefined; 
  Id_VC_Fecha_X_Sede: number | undefined; 
}

export interface Registro {
  Id_VC_Registro: string;
  Registro: number;
  Nombre: string;
  Nombre_Estado: string;
  Esta_Confirmado: number; 
  Id_Usuario_Add: number;
  Fecha_Add: string;
  Id_Usuario_Modificacion: string;
  Fecha_Modificacion: string;
  Registro_Activo: boolean;
  [key: string]: any;
}

export interface Sede {
  Id_VC_Sede: number;
  Nombre_Estado: string;
  Nombre_Ciudad: string;
  Nombre_Hospital: string;
  Fecha: string;
  Limite: number;
  Direccion: string;
}

export interface Confirmacion {
  Id_VC_Confirmacion: number;
  Folio_Confirmacion: string;
  Id_VC_Registro: number;
  Id_VC_Sede: number;
  Id_Usuario_Add: string; 
  Fecha_Add: string;
  Id_Usuario_Modificacion: number; 
  Fecha_Modificacion: string;
  Registro_Activo: boolean;
  
}

export interface PasoDosProps {
  alSiguiente: () => void;
  alAnterior: () => void;
  onDatosCompletados: (datos: {
    sede: SedeData | null;
    registro: string;
    nombre: string;
    Id_VC_Registro: number;
  }) => void;
}

export interface ExportToolbarProps {
  registros: Registro[];
}

export interface RegistroConfirmadoErrorProps {
  params: { registro: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface FechasXSedesProps {
  Id_VC_Sede: number;
  Nombre_Estado: string;
  Nombre_Hospital: string;
  Fecha: string;
  Direccion: string;
}

export interface ModalFechasProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    Id_VC_Fecha_X_Sede: number;
  Id_VC_Sede: number;
    Nombre_Estado: string;
    Nombre_Hospital: string;
    Fecha: string;
    Fecha_Texto: string; 
    Horario: string;
    Numero_De_Dosis: number;
  };
}

export interface ModalEditarEmailProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    Id_VC_Registro: number;
    Registro: number;
  Nombre: string;
    Email: string;
  };
}

export interface ModalImportarMetasProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface UseFileHandlerProps {
  handleRefresh: () => void;
  onClose: () => void;
}

export interface CommonControlProps {
  name: string;
  label: string;
  value?: any;
  onChange?: (event: any) => void;
  isLoading?: boolean;
}

export interface DataGridUIConfig {
  initialVisibleColumns: string[];
  showSearch: boolean;
  showColumnsDropdown: boolean;
  showAddNewButton: boolean;
  title?: string;
  detailUrl?: string;
  clickableRows?: boolean;
  urlField: string;
}

export interface DataGridProps {
  gridViewID: string;
  className: string;
  sort: string;
  page: number;
  limit: number;
  qs: string;
  db: string;
  uiConfig: DataGridUIConfig;
}

export interface BonoRango {
  PCA: number;
  DIRECTO: number;
  AUTOMATICO: number;
  Prima_Limite_Inferior: number;
  Prima_Limite_Superior: number;
  Bono: number;
  Puedes_Ganar: number;
  Bono_2: number;
  Puedes_Ganar_2: number;
  Falta: number;
  En_Rango: number;
}

export interface User {
  Guid?: string;
  Guid_Agente?: string;
  Login?: string;
  RutaFoto?: string;
}

export interface UserContextProps {
  user: User;
  dataCodigoRecuperacion: any;
  logIn: (args: any) => Promise<void>;
  changePassword: (args: any) => Promise<void>;
  sendResetCode: (login: string) => Promise<void>;
  logOut: () => void;
  cambiarAgente: (args: any) => Promise<void>;
  userError: any;
}
