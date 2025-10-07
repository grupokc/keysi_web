"use client";
import { useState, useEffect } from "react";
import { useDisclosure, Button, Card, CardHeader, CardBody, CardFooter, Spinner, Tabs, Tab } from "@heroui/react";
import { useUserPhone } from "@/app/hooks/useUserPhone";
import UserTable from "@/app/components/perfil/UserTable";
import AssistantsTable from "@/app/components/perfil/AssistantsTable";
import PhoneModal from "@/app/components/perfil/PhoneModal";
import AssistantModal from "@/app/components/perfil/AssistantModal";
import TuAgenteTable from "@/app/components/perfil/TuAgenteTable";

export default function Perfil() {
  const [cargando, setCargando] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTab, setSelectedTab] = useState("perfil");
  const {
    user,
    relatedUsers = [],
    loading,
    savePhoneNumber,
    saveAssistant,
    selectedPhone,
    setSelectedPhone
  } = useUserPhone();

  const [userToEdit, setUserToEdit] = useState(null);
  const [phoneInput, setPhoneInput] = useState("");
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);
  const [assistantData, setAssistantData] = useState({
    RFC: "",
    Nombre_Razon_Social: "",
    Email1: "",
    Telefono1: "",
  });

  const handleOpenModal = (userObj) => {
    setUserToEdit({
      ...userObj,
      Nombre: userObj.Nombre || userObj.Nombre_Persona || "Usuario" // Asegura que siempre haya un nombre
    });

    const phoneNumber = userObj.Id_Usuario === user.Id_Usuario ? selectedPhone : userObj.Numero_WhatsApp;

    setPhoneInput(phoneNumber || "");
    onOpen();
  };

  const handleOpenAssistantModal = () => {
    setAssistantData({
      RFC: "",
      Nombre_Razon_Social: "",
      Email1: "",
      Telefono1: "",
    });
    setIsAssistantModalOpen(true);
  };

  useEffect(() => {
    if (user?.Id_Usuario > 0) {
      setCargando(false)
    }
  }, [user])

  return (
    cargando ? (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" color="primary" label="Cargando perfil..." />
      </div>
    ) : (
      <div className="flex w-full flex-col items-center">
        <Card shadow="md" radius="lg" className="w-full max-w-screen-lg bg-white px-6 py-4">
          <Tabs 
            selectedKey={selectedTab} 
            onSelectionChange={(key) => setSelectedTab(String(key))}
            className="w-full"
          >
            <Tab key="perfil" title="Perfil">
              <CardBody className="overflow-x-auto p-4">
                {user ? (
                  <div className="w-full">
                    <UserTable user={user} selectedPhone={selectedPhone} handleOpenModal={handleOpenModal} loading={loading} />
                    <AssistantsTable relatedUsers={relatedUsers} handleOpenModal={handleOpenModal} loading={loading} />
                  </div>
                ) : (
                  <p className="text-center text-gray-500 text-lg">No hay información disponible.</p>
                )}
              </CardBody>
              {/* Footer */}
              <CardFooter className="flex flex-col items-center text-center text-sm text-gray-600 bg-gray-100 rounded-lg gap-2 py-4">
                <p>Si estos datos no están bien, envía un correo a:</p>
                <a href="mailto:mesa.ip@grupokc.com.mx" className="text-blue-600 font-semibold">
                  mesa.ip@grupokc.com.mx
                </a>
                <p>indicando los datos correctos.</p>
              </CardFooter>
            </Tab>

            <Tab key="nueva-seccion" title="Perfil TuAgente">
              <CardBody className="overflow-x-auto p-4">
                <TuAgenteTable user={user} loading={loading} />
              </CardBody>
            </Tab>
          </Tabs>
        </Card>

        {/* Modales */}
        <PhoneModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          phoneInput={phoneInput}
          setPhoneInput={setPhoneInput}
          userToEdit={userToEdit}
          savePhoneNumber={savePhoneNumber}
          setSelectedPhone={setSelectedPhone}
          loading={loading}
        />
        <AssistantModal
          isOpen={isAssistantModalOpen}
          setIsOpen={setIsAssistantModalOpen}
          assistantData={assistantData}
          setAssistantData={setAssistantData}
          saveAssistant={saveAssistant}
        />
      </div>
    )
  );
}