export const policyValues = {
  Id_Cia: "",
  Vigencia_Inicio: "",
  Vigencia_Fin: "",
  Id_Ramo: "",
  Id_Promotoria: "",
  Id_Poliza_Tipo: "",
  Numero_Pagos: ""
}

export const policyFields = [
  {
    id: 1,
    label: "Cia:",
    name: "Id_Cia",
    inputType: "combo",
    comboName: "Cias"
  },
  {
    id: 2,
    label: "CURP:",
    name: "CURP",
    inputType: "file"
  },
  {
    id: 3,
    label: "Vigencia fin:",
    name: "Vigencia_Fin",
    inputType: "date"
  },
  {
    id: 4,
    label: "Ramo:",
    name: "Id_Ramo",
    inputType: "combo",
    comboName: "Ramos"
  },
  {
    id: 5,
    label: "Promotoria:",
    name: "Id_Promotoria",
    inputType: "combo",
    comboName: "Promotorias"
  },
  {
    id: 6,
    label: "Poliza Tipo:",
    name: "Id_Poliza_Tipo",
    inputType: "combo",
    comboName: "Polizas_Tipos"
  },
  {
    id: 7,
    label: "Numero de Pagos:",
    name: "Numero_Pagos",
    inputType: "text"
  }
]
