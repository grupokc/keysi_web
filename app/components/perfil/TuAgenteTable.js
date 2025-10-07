"use client"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from "@heroui/react";
import { TuAgenteService } from "@/app/services/tuAgenteService";
import { useState, useEffect } from "react";
import ProfilePhotoUpload from "./ProfilePhotoUpload";

export default function TuAgenteTable({ user, loading }) {
  const [activeField, setActiveField] = useState(null);
  const [tuAgente, setTuAgente] = useState(null);
  const [aliasModified, setAliasModified] = useState(false);
  const [formData, setFormData] = useState({
    Sinopsys: "",
    alias: "",
    urlFacebook: "",
    urlInstagram: "",
    urlLinkedIn: "",
    urlTwitter: ""
  });

  useEffect(() => {
    const fetchTuAgente = async () => {
      if (user?.Id_Agente) {
        const data = await TuAgenteService.getTuAgente(user.Id_Agente);
        if (data) {
          setTuAgente(data);
          setFormData({
            Sinopsys: data.Sinopsys || "",
            alias: data.Alias || "",
            urlFacebook: data.Url_Facebook || "",
            urlInstagram: data.Url_Instagram || "",
            urlLinkedIn: data.Url_LinkedIn || "",
            urlTwitter: data.Url_Twiter || ""
          });
        }
      }
    };
    fetchTuAgente();
  }, [user]);

  const handleSave = async (field) => {
    if (!user?.Id_Agente || !user?.Id_Usuario) return;
    
    try {
      const result = await TuAgenteService.saveTuAgente({
        idTuAgente: tuAgente?.Id_Tu_Agente_Perfil,
        agentId: user.Id_Agente,
        userId: user.Id_Usuario,
        data: {
          ...formData,
          [field]: formData[field]
        }
      });
      
      if (result) {
        setTuAgente(result);
        if (field === 'alias') {
          setAliasModified(true);
        }
        setActiveField(null);
      }
    } catch (error) {
      console.error("Error al guardar TuAgente:", error);
    }
  };

  const renderFieldModal = (field, label, type = "text") => {
    return (
      <Modal isOpen={activeField === field} onClose={() => setActiveField(null)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {tuAgente?.[field] ? `Editar ${label}` : `Agregar ${label}`}
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              {field === "synopsis" ? (
                <Textarea
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  maxLength={400}
                  placeholder={`Ingresa tu ${label.toLowerCase()}`}
                />
              ) : (
                <input
                  type={type}
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder={`https://${field.replace('url', '').toLowerCase()}.com/tu-perfil`}
                />
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setActiveField(null)}>
              Cancelar
            </Button>
            <Button color="primary" onPress={() => handleSave(field)}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Perfil de TuAgente</h2>
      
      {/* Sección de foto de perfil */}
      <div className="mb-6">
        <ProfilePhotoUpload 
          user={user} 
          onPhotoUpdate={(photoUrl) => {
            // Actualizar el estado local si es necesario
            if (tuAgente) {
              setTuAgente({
                ...tuAgente,
                Id_Documento_Foto: photoUrl ? `photo_${Date.now()}_${user.Id_Usuario}` : null
              });
            }
          }}
          loading={loading}
        />
      </div>

      <Table aria-label="Tabla de TuAgente">
        <TableHeader>
          <TableColumn>Campo</TableColumn>
          <TableColumn>Información</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Sinopsis</TableCell>
            <TableCell>{tuAgente?.Sinopsys || "N/A"}</TableCell>
            <TableCell>
              <Button
                size="sm"
                color="primary"
                onPress={() => setActiveField("Sinopsys")}
                disabled={loading}
              >
                {tuAgente?.Sinopsys ? "Editar" : "Agregar"}
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Alias</TableCell>
            <TableCell>{tuAgente?.Alias || "N/A"}</TableCell>
            <TableCell>
              {(!aliasModified && tuAgente?.Alias) && (
                <Button
                  size="sm"
                  color="primary"
                  onPress={() => setActiveField("alias")}
                  disabled={loading}
                >
                  Editar
                </Button>
              )}
              {!tuAgente?.Alias && (
                <Button
                  size="sm"
                  color="primary"
                  onPress={() => setActiveField("alias")}
                  disabled={loading}
                >
                  Agregar
                </Button>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Facebook</TableCell>
            <TableCell>
              {tuAgente?.Url_Facebook ? (
                <div className="flex flex-col gap-1">
                  <a href={tuAgente.Url_Facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Ver perfil
                  </a>
                  <span className="text-sm text-gray-500 break-all">{tuAgente.Url_Facebook}</span>
                </div>
              ) : "N/A"}
            </TableCell>
            <TableCell>
              <Button
                size="sm"
                color="primary"
                onPress={() => setActiveField("urlFacebook")}
                disabled={loading}
              >
                {tuAgente?.Url_Facebook ? "Editar" : "Agregar"}
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Instagram</TableCell>
            <TableCell>
              {tuAgente?.Url_Instagram ? (
                <div className="flex flex-col gap-1">
                  <a href={tuAgente.Url_Instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Ver perfil
                  </a>
                  <span className="text-sm text-gray-500 break-all">{tuAgente.Url_Instagram}</span>
                </div>
              ) : "N/A"}
            </TableCell>
            <TableCell>
              <Button
                size="sm"
                color="primary"
                onPress={() => setActiveField("urlInstagram")}
                disabled={loading}
              >
                {tuAgente?.Url_Instagram ? "Editar" : "Agregar"}
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>LinkedIn</TableCell>
            <TableCell>
              {tuAgente?.Url_LinkedIn ? (
                <div className="flex flex-col gap-1">
                  <a href={tuAgente.Url_LinkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Ver perfil
                  </a>
                  <span className="text-sm text-gray-500 break-all">{tuAgente.Url_LinkedIn}</span>
                </div>
              ) : "N/A"}
            </TableCell>
            <TableCell>
              <Button
                size="sm"
                color="primary"
                onPress={() => setActiveField("urlLinkedIn")}
                disabled={loading}
              >
                {tuAgente?.Url_LinkedIn ? "Editar" : "Agregar"}
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Youtube</TableCell>
            <TableCell>
              {tuAgente?.Url_Twiter ? (
                <div className="flex flex-col gap-1">
                  <a href={tuAgente.Url_Twiter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Ver perfil
                  </a>
                  <span className="text-sm text-gray-500 break-all">{tuAgente.Url_Twiter}</span>
                </div>
              ) : "N/A"}
            </TableCell>
            <TableCell>
              <Button
                size="sm"
                color="primary"
                onPress={() => setActiveField("urlTwitter")}
                disabled={loading}
              >
                {tuAgente?.Url_Twiter ? "Editar" : "Agregar"}
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Modales para cada campo */}
      {renderFieldModal("synopsis", "Sinopsis")}
      {renderFieldModal("alias", "Alias")}
      {renderFieldModal("urlFacebook", "URL de Facebook", "url")}
      {renderFieldModal("urlInstagram", "URL de Instagram", "url")}
      {renderFieldModal("urlLinkedIn", "URL de LinkedIn", "url")}
      {renderFieldModal("urlTwitter", "URL de Twitter", "url")}
    </>
  );
} 