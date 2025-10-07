"use client"
import { useState, useContext } from "react";
import { Avatar, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { uploadAvatar } from "../../lib/utils";
import { useProfilePhotoStore } from "../../store/profilePhotoStore";
import { UserContext } from "../../context/UserContext";
import React from "react";

export default function ProfilePhotoUpload({ user, onPhotoUpdate, loading }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Usar el contexto del usuario
  const { updateUserAvatar } = useContext(UserContext);
  
  // Usar el store de Zustand
  const {
    selectedFile,
    previewUrl,
    uploading,
    setSelectedFile,
    setPreviewUrl,
    setUploading,
    clearSelection,
    updateUserAvatar: updateStoreAvatar
  } = useProfilePhotoStore();



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (selectedFile && user?.Id_Usuario) {
      setUploading(true);
      
      try {
        await uploadAvatar(
          selectedFile, 
          user.Id_Usuario,
          (avatarUrl) => {
            // Callback de éxito con la nueva URL del avatar
            if (avatarUrl) {
              // Actualizar el contexto del usuario con la nueva URL
              updateUserAvatar(avatarUrl);
              // También actualizar el store de Zustand
              updateStoreAvatar(avatarUrl);
            }
            onPhotoUpdate(selectedFile.name);
            setIsModalOpen(false);
            clearSelection();
          },
          (error) => {
            // Callback de error
            console.error('Error uploading avatar:', error);
          }
        );
      } catch (error) {
        console.error('Error in handleSave:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearSelection();
  };

  // Función para obtener la URL del avatar actual
  const getCurrentAvatarUrl = () => {
    // Si el usuario tiene una URL de avatar personalizada, usarla
    if (user?.Url_Avatar && user.Url_Avatar !== "https://pegasus.grupokc.com.mx/img/iconUsuario.png") {
      return user.Url_Avatar;
    }
    // Si tiene RutaFoto de Pegasus, usarla
    if (user?.RutaFoto && user.RutaFoto !== 'null') {
      const foto = user.RutaFoto.replace(/\\/g, "/");
      return `https://pegasus.grupokc.com.mx/${foto}`;
    }
    // Imagen por defecto
    return "https://pegasus.grupokc.com.mx/img/iconUsuario.png";
  };

  return (
    <>
      {/* Vista principal - Solo imagen actual */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Foto de Perfil</h3>
        
        {/* Solo mostrar la imagen actual */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex flex-col items-center gap-3">
            <Avatar
              src={getCurrentAvatarUrl()}
              size="xl"
              className="w-24 h-24"
              showFallback
              name={user?.Nombre_Persona || user?.Nombre || "Usuario"}
            />
            <div className="text-center">
              <h4 className="text-sm font-bold text-gray-900">Tu Foto Actual</h4>
              <p className="text-xs text-gray-500">De Pegasus</p>
            </div>
          </div>
        </div>
        
        {/* Botón para abrir modal */}
        <div className="flex justify-center">
          <Button
            color="primary"
            onPress={() => setIsModalOpen(true)}
            disabled={loading || uploading}
            className="px-6"
          >
            {uploading ? "Subiendo..." : "Cambiar Foto de Perfil"}
          </Button>
        </div>
      </div>

      {/* Modal con comparativa completa */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-gray-900">Cambiar Foto de Perfil</h3>
            <p className="text-sm text-gray-600">Compara tu foto actual con la nueva que vas a cargar</p>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-8">
              {/* Comparativa de imágenes */}
              <div className="flex items-center justify-center gap-8">
                {/* Foto Actual */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <Avatar
                      src={getCurrentAvatarUrl()}
                      size="xl"
                      className="w-24 h-24"
                      showFallback
                      name={user?.Nombre_Persona || user?.Nombre || "Usuario"}
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-bold text-gray-900">Foto Actual</h4>
                    <p className="text-xs text-gray-500">De Pegasus</p>
                  </div>
                </div>

                {/* Flecha de cambio */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-600">Cambiar a</span>
                </div>

                {/* Nueva Foto */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <Avatar
                      src={previewUrl || getCurrentAvatarUrl()}
                      size="xl"
                      className="w-24 h-24 border-2 border-blue-200"
                      showFallback
                      name={user?.Nombre_Persona || user?.Nombre || "Usuario"}
                    />
                    {/* Icono de cámara para indicar que se puede cargar */}
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-bold text-gray-900">Nueva Foto</h4>
                    <p className="text-xs text-gray-500">
                      {selectedFile ? selectedFile.name : "Sin seleccionar"}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Campo de carga de archivo */}
              <div className="border-t pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Seleccionar nueva imagen
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">
                    <strong>Formatos permitidos:</strong> JPG, PNG, GIF<br/>
                    <strong>Tamaño máximo:</strong> 5MB<br/>
                    <strong>Recomendado:</strong> Imagen cuadrada de 256x256 píxeles
                  </p>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleCancel}>
              Cancelar
            </Button>
            <Button color="primary" onPress={handleSave} disabled={!selectedFile || uploading} isLoading={uploading}>
              {uploading ? "Subiendo..." : "Guardar Nueva Foto"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
} 