"use client"
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/app/context/UserContext";
import { UserPhoneService } from "@/app/services/userPhoneService";

export function useUserPhone() {
  const { user, setUser } = useContext(UserContext);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [relatedUsers, setRelatedUsers] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState("");
  const [idTelefono, setIdTelefono] = useState(null);
  const [loading, setLoading] = useState(false);

  /** Obtener teléfonos del usuario y sus asistentes */
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.Id_Usuario || !user?.Id_Agente) return;

      setLoading(true);
      try {
        // 1. Obtener teléfono del usuario logueado
        const userPhone = await UserPhoneService.getUserPhone(user.Id_Usuario);

        // 2. Obtener usuarios relacionados (deberían incluir correo)
        const agentUsers = await UserPhoneService.getUsersByAgent(user.Id_Agente, user.Id_Usuario);

        // 3. Obtener teléfonos de los usuarios relacionados
        const relatedPhones = await Promise.all(
          agentUsers.map(async (u) => {
            const phone = await UserPhoneService.getUserPhone(u.Id_Usuario);
            return {
              Id_Usuario: u.Id_Usuario,
              Numero_WhatsApp: phone?.Numero_WhatsApp_Sin_Prefijo || null, // 🔹 Usamos la versión sin prefijo
              Email: u.Email || "Sin correo"
            };
          })
        );

        // 🔹 4. Fusionar los usuarios con sus respectivos teléfonos y correos
        const usersWithPhones = agentUsers.map((user) => ({
          ...user,
          Numero_WhatsApp: relatedPhones.find((p) => p.Id_Usuario === user.Id_Usuario)?.Numero_WhatsApp || null,
          Email: relatedPhones.find((p) => p.Id_Usuario === user.Id_Usuario)?.Email || "Sin correo"
        }));

        setRelatedUsers(usersWithPhones);

        // 🔹 5. Guardar todos los teléfonos en el estado
        const allPhones = userPhone ? [userPhone, ...relatedPhones.filter((p) => p.Numero_WhatsApp)] : relatedPhones;
        setPhoneNumbers(allPhones);

        // 🔹 6. Si el usuario tiene teléfono, actualizar `selectedPhone` y el contexto (`user`)
        if (userPhone && userPhone.Numero_WhatsApp_Sin_Prefijo) { // 🔹 Usamos la versión sin prefijo
          setIdTelefono(userPhone.Id_Usuario_WhatsAppTelefono);
          setSelectedPhone(userPhone.Numero_WhatsApp_Sin_Prefijo);

          if (userPhone.Numero_WhatsApp_Sin_Prefijo !== user?.Telefono) {
            setUser((prev) => ({ ...prev, Telefono: userPhone.Numero_WhatsApp_Sin_Prefijo }));
          }
        } else {
          console.warn("⚠️ Usuario principal no tiene teléfono registrado en la BD.");
        }
      } catch (error) {
        console.error("❌ Error obteniendo teléfonos y usuarios relacionados:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [user?.Id_Usuario, user?.Id_Agente, setUser]);

  /** Guardar o actualizar número de teléfono */
  const savePhoneNumber = async ({ idTelefono, user, phoneNumber }) => {
    setLoading(true);

    // 🔹 Asegurar que solo enviamos 10 dígitos al backend (sin prefijo)
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "").slice(-10);

    const updatedData = await UserPhoneService.saveUserPhone({
      idTelefono,
      user,
      phoneNumber: cleanedPhoneNumber, // 🔹 Solo 10 dígitos, el SP agregará `521`
    });

    if (updatedData) {
      setIdTelefono(updatedData.Id_Usuario_WhatsAppTelefono);
      setSelectedPhone(updatedData.Numero_WhatsApp_Sin_Prefijo); // 🔹 Usamos el número sin prefijo

      // ✅ Forzar actualización del estado global del usuario
      setUser((prevUser) => ({
        ...prevUser,
        Telefono: updatedData.Numero_WhatsApp_Sin_Prefijo,
      }));
    } else {
      console.warn("⚠️ No se recibió actualización del teléfono.");
    }

    setLoading(false);
    return updatedData;
  };

  return {
    phoneNumbers,
    relatedUsers,
    selectedPhone,
    setSelectedPhone,
    savePhoneNumber,
    loading,
    user,
  };
}
