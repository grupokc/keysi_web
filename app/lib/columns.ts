import { formatCurrency } from "./utils";


const statusOptions = [
  { name: 'No', uid: 0 },
  { name: 'Sí', uid: 1 },
];

const BonosDetailColumns = [
  {
    name: 'Id_DM_Bonos_Resultados',
    uid: 'Id_DM_Bonos_Resultados',
    sortable: false,
    visible: false,
  },
  {
    name: 'Clave de Agente',
    uid: 'Clave_Agente',
    sortable: false,
    visible: true,
    isPK: true,
  },
  {
    name: 'Nombre de Agente',
    uid: 'Nombre_Agente',
    sortable: true,
    visible: true,
  },
  {
    name: 'Zona Comercial',
    uid: 'Nombre_Zona_Comercial',
    sortable: true,
    visible: true,
  },
  {
    name: 'Promotoria',
    uid: 'Nombre_Promotoria',
    sortable: true,
    visible: true,
  },
  { name: 'Gana Premio', uid: 'Gana_Premio', sortable: true, visible: true },
  {
    name: 'Premio Otorgado',
    uid: 'Premio_Otorgado',
    sortable: true,
    visible: true,
    type: 'money',
  },
  {
    name: 'Premio Coins',
    uid: 'Premio_Coins',
    sortable: true,
    visible: true,
  },
  {
    name: 'Premio Obtener',
    uid: 'Premio_Obtener',
    sortable: true,
    visible: true,
  },
  {
    name: 'Porcentaje Logrado',
    uid: 'Porcentaje_Logrado',
    sortable: true,
    visible: true,
    type: 'percentaje',
  },
  {
    name: 'Encuentro KC',
    uid: 'Encuentro_KC',
    sortable: true,
    visible: true,
  },
];

export {
  statusOptions,
  BonosDetailColumns
};
