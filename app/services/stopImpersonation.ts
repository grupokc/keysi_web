"use server";
import { cookies } from "next/headers";

export async function stopImpersonation() {
  const store = cookies();

  const originalData = store.get("original_user_data");
  if (!originalData?.value) {
    return;
  }

  // Restaurar la cookie user_data a la info del colaborador original
  store.set("user_data", originalData.value, {
    path: "/",
    // Ajusta sameSite, secure, etc. según tu necesidad
  });

  // Borrar impersonation_mode y original_user_data con la forma correcta
  store.delete({
    name: "impersonation_mode",
    path: "/"
  });

  store.delete({
    name: "original_user_data",
    path: "/"
  });
}
