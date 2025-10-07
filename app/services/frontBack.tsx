'use server';
import axios, { AxiosError } from 'axios';
import { END_POINT, HEADERS, URL, URL_NETAPI } from "@/app/utils/constants";
import qs from 'qs';

let rr = {
  success: false,
  dataType: null,
  errorMessage: '',
  successMessage: '',
  data: [],
  dataModel: null,
  total: 0,
  dataTable: null,
  Json: null
}


// Función para ejecutar solicitudes CRUD
export const executeForCRUD = async (params: any) => {

  // const URL = 'https://fb.grupokc.com.mx/api/exe4crud'
  const url = params.url === "URL_NETAPI" ? `${URL_NETAPI}/api/Exe4CRUD` : `${URL}/api/exe4crud`;
  const config = {
    method: 'post',
    url: url,
    headers: HEADERS,
    data: JSON.stringify(params)
  };

  try {
    const response = await axios(config);
   
 
    return response.data;
  } catch (error: any) {
    rr.success = false;
    rr.errorMessage = error.message || 'Error desconocido';
    return rr;
  }
};

export const executeForGrid = async (params: any) => {
  const url = params.url || 'https://fb.kcapis.net/api/grid';

  const config = {
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  };


  try {
    const response = await axios.request(config)
    return response.data;
  } catch (error) {
    // Podrías querer manejar el error de manera diferente o re-lanzarlo
    console.error(error);
    throw error;
  }
};


//TICKETS

// Estructura de respuesta predeterminada
const defaultResponse = {
  success: false,
  dataType: null,
  errorMessage: '',
  successMessage: '',
  data: [],
  dataModel: null,
  total: 0,
  dataTable: null,
  Json: null
};

// Función para solicitar datos de grid
export const fetchGridData = async (params:any) => {
  let data = qs.stringify({
    gridViewID: params.gridViewID || '8474',
    className: params.className || 'Mesa_De_Ayuda_Sistemas',
    user: params.user || '1',
    sort: params.sort || '[{"property":"Id_Ticket","direction":"ASC"}]',
    start: params.start || '0',
    page: params.page || '1',
    limit: params.limit || '5',
    viewType: params.viewType || '',
    Id_Oficina: params.Id_Oficina || '0',
    Id_Usuario: params.Id_Usuario || '1',
    Id_Usuario_Add: params.Id_Usuario_Add || '1',
    UsuarioAdd: params.UsuarioAdd || '1',
    qs: params.qs || '[]',
    db: params.db || 'Prometeo',
    fromRecord: params.fromRecord || '1',
    toRecord: params.toRecord || '5',
    apiName: params.apiName || 'Nf_GridView',
    actionName: params.actionName || 'GetGrid',
    UsuarioUMod: params.UsuarioUMod || '1',
    UsuarioDel: params.UsuarioDel || '1'
  });

  const config = {
    method: 'post',
    url: 'https://fb.grupokc.com.mx/api/Nf_GridView/GetGrid/',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error: unknown) { // Aclarar que el tipo de error es desconocido
    if (error instanceof AxiosError) {
      // Ahora puedes acceder a propiedades específicas de AxiosError
      console.error('Fetch grid data error:', error.message);
      return { ...defaultResponse, errorMessage: error.message };
    } else {
      // Manejar cualquier otro tipo de error no específico de Axios
      console.error('An unexpected error occurred:', error);
      return { ...defaultResponse, errorMessage: 'An unexpected error occurred' };
    }
  }
}

// Función para obtener combinaciones de datos (combo)
export const GetCombo = async (className: string, qsParams = '', sort = '') => {
  let data = qs.stringify({
    action: 'combo',
    className: className,
    qs: qsParams,
    sort: sort
  });

  const config = {
    method: 'post',
    url: 'https://fb.grupokc.com.mx/api/nf_data/GetCombo',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    return {
      success: true,
      data: response.data
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Fetch combo data error:', error.message);
      return { ...defaultResponse, errorMessage: error.message };
    } else {
      console.error('An unexpected error occurred:', error);
      return { ...defaultResponse, errorMessage: 'An unexpected error occurred' };
    }
  }
};