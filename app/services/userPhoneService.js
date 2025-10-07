"use client"
import { executeForCRUD } from "@/app/services/frontBack";

export class UserPhoneService {
  /** ✅ Obtener número de teléfono de un usuario específico */
  static async getUserPhone(userId) {
    if (!userId) return null;

    const params = {
      ClassName: "Usuarios_WhatsAppTelefonos",
      Action: "Get",
      Id_Usuario: userId,
    };

    try {
      const response = await executeForCRUD(params);
      if (response?.data?.length > 0) {
        return response.data[0]; // Retornamos solo el primer resultado
      }
    } catch (error) {
      console.error("❌ Error obteniendo número de teléfono:", error);
    }

    return null;
  }

  /** ✅ Obtener usuarios relacionados con un `Id_Agente` */
  static async getUsersByAgent(agentId, userId) {
    if (!agentId) return [];

    const params = {
      ClassName: "Usuarios_xAgente",
      Action: "Get",
      Id_Agente: agentId,
      Id_Usuario_Actual: userId, // <-- Nuevo parámetro para SP
    };

    try {
      const response = await executeForCRUD(params);
      if (response?.data?.length > 0) {
        return response.data;
      }
    } catch (error) {
      console.error("❌ Error obteniendo usuarios relacionados:", error);
    }

    return [];
  }

  /** ✅ Guardar o actualizar número de teléfono */
  static async saveUserPhone({ idTelefono, user, phoneNumber }) {
    if (!phoneNumber) return null;


    if (!idTelefono) {
      const existingPhone = await this.getUserPhone(user?.Id_Usuario);
      if (existingPhone) {
        idTelefono = existingPhone.Id_Usuario_WhatsAppTelefono;
      } else {
        console.log("⚠️ No se encontró teléfono en BD, aplicando INSERT.");
      }
    }

    // ⚠️ Asegurar que `Id_Agente` siempre tenga un valor
    const idAgente = user?.Id_Agente || null;
    if (!idAgente) console.warn("⚠️ Id_Agente es NULL. Verificar datos del usuario.");

    // Aseguramos que el nombre del usuario esté presente
    const nombre = user?.Nombre || "";

    const params = {
      ClassName: "Usuarios_WhatsAppTelefonos",
      Action: idTelefono ? "Update" : "Insert",
      Id_Usuario_WhatsAppTelefono: idTelefono || null,
      Id_Usuario_WhatsAppRol: 2,
      Id_Agente: idAgente, // ✅ Aseguramos que se envíe correctamente
      Id_Usuario: user?.Id_Usuario,
      Nombre: nombre,  // ✅ Aseguramos que el nombre se pase correctamente
      Numero_WhatsApp: phoneNumber,
      UsuarioAdd: user?.Id_Usuario,
      UsuarioUMod: user?.Id_Usuario,
      Fecha_Add: new Date().toISOString(),
    };


    try {
      const response = await executeForCRUD(params);

      if (response?.data?.length > 0) {
        return response.data[0];
      } else {
        console.warn("⚠️ El backend no devolvió datos actualizados.");
      }
    } catch (error) {
      console.error("❌ Error guardando número de teléfono:", error);
    }

    return null;
  }

  /** ✅ Verificar si han pasado más de 30 días desde `Fecha_Add` */
  static async shouldShowModal(userId) {
    if (!userId) return false;

    const userPhone = await this.getUserPhone(userId);
    if (!userPhone || !userPhone.Fecha_Add) return true; // 🔹 Si no hay fecha, mostrar modal

    const lastUpdated = new Date(userPhone.Fecha_Add);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24));

    return diffDays >= 30; // 🔹 Mostrar modal si han pasado 30 días o más
  }

/** ✅ Eliminar número de teléfono de un usuario (soft delete) */
static async deleteUserPhone(userPhone) {
  const { Id_Usuario_WhatsAppTelefono, Id_Usuario } = userPhone || {};

  if (!Id_Usuario_WhatsAppTelefono || !Id_Usuario) {
    console.warn("⚠️ Falta el ID del teléfono o del usuario para eliminar.");
    return null;
  }

  const params = {
    ClassName: "Usuarios_WhatsAppTelefonos",
    Action: "Delete",
    Id_Usuario_WhatsAppTelefono,
    UsuarioDel: Id_Usuario,  // ✅ Usuario que realiza la acción
    Id_Usuario,              // ✅ Usuario propietario del número
  };

  try {
    const response = await executeForCRUD(params);

    if (response?.data?.length > 0) {
      return response.data[0]; // ✅ Registro "eliminado" (soft delete)
    } else {
      console.warn("⚠️ El backend no devolvió datos después del delete.");
    }
  } catch (error) {
    console.error("❌ Error eliminando número de teléfono:", error);
  }

  return null;
}


}

