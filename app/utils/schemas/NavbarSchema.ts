export interface NavbarTab {
  id: string;
  Id_Categoria?: number;
  name: string;
  icon: string; // Clases de FontAwesome
  path: string; // Ruta de navegación
}

export const navbarTabs: NavbarTab[] = [
  {
    id: 'a1',
    Id_Categoria: 8,
    name: 'Inicio',
    icon: 'fas fa-home',
    path: 'inbox/agentes',
  },
  {
    id: 'a2',
    Id_Categoria: 8,
    name: 'Reportes',
    icon: 'fas fa-star',
    path: 'reportes',
  },
  {
    id: 'a3',
    Id_Categoria: 8,
    name: 'Persistencia',
    icon: 'fas fa-business-time',
    path: 'persistencia',
  },
  {
    id: 'a4',
    Id_Categoria: 8,
    name: 'Estado de Cuenta',
    icon: 'fas fa-file',
    path: 'edocta',
  },
  {
    id: 'a5',
    Id_Categoria: 8,
    name: 'Emisión y Servicios',
    icon: 'fas fa-bullhorn',
    path: 'tickets',
  },
  {
    id: 'a6',
    Id_Categoria: 8,
    name: 'Siniestros',
    icon: 'fas fa-bullhorn',
    path: 'siniestros',
  },
  {
    id: 'a7',
    Id_Categoria: 8,
    name: 'Bonos de MetLife ',
    icon: 'fas fa-flag-checkered',
    path: 'bonos/metlife',
  },
  {
    id: 'a8',
    Id_Categoria: 10,
    name: 'Bonos de KC',
    icon: 'fas fa-flag-checkered',
    path: 'bonos/kc',
  },
  {
    id: 'a9',
    Id_Categoria: 8,
    name: 'Perfil',
    icon: 'fas fa-users',
    path: 'perfil',
  },
  {
    id: 'a10',
    Id_Categoria: 8,
    name: 'Cotizador Autos',
    icon: 'fas fa-car',
    path: 'cotizador_autos',
  },

  {
    id: 'p1',
    Id_Categoria: 10,
    name: 'Mis Indicadores',
    icon: 'fas fa-home',
    path: 'inbox/agentes',
  },
  {
    id: 'p3',
    Id_Categoria: 10,
    name: 'Mi Promotoria',
    icon: 'fas fa-building',
    path: 'inbox/promotores',
  },
  {
    id: 'p4',
    Id_Categoria: 10,
    name: 'Mis Agentes',
    icon: 'fas fa-users',
    path: 'promotores/agentes',
  },
  {
    id: 'p2',
    Id_Categoria: 10,
    name: 'Bonos de MetLife',
    icon: 'fas fa-flag-checkered',
    path: 'bonos/metlife',
  },

  {
    id: 'p6',
    Id_Categoria: 10,
    name: 'Emisión y Servicios',
    icon: 'fas fa-bullhorn',
    path: 'tickets',
  },
  {
    id: 'p7',
    Id_Categoria: 10,
    name: 'Siniestros',
    icon: 'fas fa-bullhorn',
    path: 'siniestros',
  },

  {
    id: 'p9',
    Id_Categoria: 10,
    name: 'Cotizador Autos',
    icon: 'fas fa-car',
    path: 'cotizador_autos',
  },
  {
    id: 'p5',
    Id_Categoria: 10,
    name: 'Estado de Cuenta',
    icon: 'fas fa-file',
    path: 'edocta',
  },
  {
    id: 'p8',
    Id_Categoria: 10,
    name: 'Perfil',
    icon: 'fas fa-users',
    path: 'perfil',
  },
];

// Menú especial para usuarios con `Id_Tipo === 1`
export const specialTabs: NavbarTab[] = [
  { id: "s1", name: "Organización", icon: "fas fa-building", path: "/inbox/kc" }, 
  { id: "s2", name: "Ranking", icon: "fas fa-chart-bar", path: "/inbox/kc/rank" },
  { id: "s3", name: "Dashboard Mesa", icon: "fas fa-columns", path: "/inbox/kc/dashboard" },
  { id: "s4", name: "Cotizador Autos", icon: "fas fa-car", path: "/inbox/cotizador_autos" }
];

// Nuevo menú para agentes DXN
export const dxnTabs: NavbarTab[] = [
  {
    id: 'dxn1',
    Id_Categoria: 3,
    name: 'Perfil',
    icon: 'fas fa-users',
    path: 'perfil',
  },
  {
    id: 'dxn2',
    Id_Categoria: 3,
    name: 'Emisión y Servicios',
    icon: 'fas fa-bullhorn',
    path: 'tickets',
  },
  {
    id: 'dxn3',
    Id_Categoria: 3,
    name: 'Siniestros',
    icon: 'fas fa-bullhorn',
    path: 'siniestros',
  },
  {
    id: 'dxn4',
    Id_Categoria: 3,
    name: 'CRM',
    icon: 'fas fa-bullhorn',
    path: 'crm',
  },
];

