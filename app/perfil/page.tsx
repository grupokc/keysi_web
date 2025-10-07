"use client"
import Perfil from "@/app/components/perfil/Perfil";
import { UserContextProvider } from "@/app/context/UserContext";

export default function InboxPage() {
  return (
    <UserContextProvider>
      <Perfil />
    </UserContextProvider>
  );
}
