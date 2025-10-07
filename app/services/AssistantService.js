import { executeForCRUD } from "@/app/services/frontBack";

export class AssistantService {
  /** ✅ Guardar un nuevo asistente */
  static async saveAssistant(assistantInfo, user) {
    if (!assistantInfo || !user) return false;

    const params = {
      ClassName: "Asistente",
      Action: "Insert",
      RFC: assistantInfo.RFC,
      Nombre_Razon_Social: assistantInfo.Nombre_Razon_Social,
      Correo_Electronico: assistantInfo.Email1,
      Telefono: assistantInfo.Telefono1,
      Id_Agente: user.Id_Agente, // Tomado del usuario logueado
      Id_Tipo: user.Id_Tipo, // Tomado del usuario logueado
      Id_Agente_Tipo: user.Id_Tipo, // Tomado del usuario logueado
      Id_Categoria: user.Id_Categoria, // Tomado del usuario logueado
      UsuarioAdd: user.Id_Usuario, // Usuario que está creando al asistente
    };

    try {
      const response = await executeForCRUD(params);
      if (response?.success) {
        console.log("✅ Asistente guardado correctamente:", response);
        return true;
      }
    } catch (error) {
      console.error("❌ Error guardando el asistente:", error);
    }

    return false;
  }
}
