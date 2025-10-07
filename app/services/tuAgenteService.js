"use client"
import { executeForCRUD } from "@/app/services/frontBack";

export class TuAgenteService {
  /** Obtener información de TuAgente */
  static async getTuAgente(agentId) {
    if (!agentId) return null;

    const params = {
      ClassName: "Tu_Agente_Perfiles",
      Action: "Get",
      Id_Agente: agentId
    };

    try {
      const response = await executeForCRUD(params);
      if (response?.data?.length > 0) {
        return response.data[0];
      }
    } catch (error) {
      console.error("Error obteniendo información de TuAgente:", error);
    }

    return null;
  }

  /** Guardar o actualizar información de TuAgente */
  static async saveTuAgente({ idTuAgente, agentId, userId, data }) {
    if (!data || !agentId || !userId) return null;

    const params = {
      ClassName: "Tu_Agente_Perfiles",
      Action: idTuAgente ? "Update" : "Insert",
      Id_Tu_Agente_Perfil: idTuAgente || null,
      Id_Agente: agentId,
      Synopsis: data.synopsis || null,
      Alias: data.alias || null,
      Url_Facebook: data.urlFacebook || null,
      Url_Instagram: data.urlInstagram || null,
      Url_LinkedIn: data.urlLinkedIn || null,
      Url_Twiter: data.urlTwitter || null,
      Id_Documento_Foto: data.idDocumentoFoto || null,
      ...(idTuAgente ? {
        UsuarioUMod: userId,
        ReturnTable: 1
      } : {
        UsuarioAdd: userId
      })
    };

    try {
      const response = await executeForCRUD(params);
      if (response?.data?.length > 0) {
        return response.data[0];
      }
    } catch (error) {
      console.error("Error guardando información de TuAgente:", error);
    }

    return null;
  }

  /** Eliminar información de TuAgente */
  static async deleteTuAgente({ idTuAgente, userId }) {
    if (!idTuAgente || !userId) {
      console.warn("Falta el ID de TuAgente o del usuario para eliminar.");
      return null;
    }

    const params = {
      ClassName: "Tu_Agente_Perfiles",
      Action: "Delete",
      Id_Tu_Agente_Perfil: idTuAgente,
      UsuarioDel: userId
    };

    try {
      const response = await executeForCRUD(params);
      if (response?.data?.length > 0) {
        return response.data[0];
      }
    } catch (error) {
      console.error("Error eliminando información de TuAgente:", error);
    }

    return null;
  }
} 