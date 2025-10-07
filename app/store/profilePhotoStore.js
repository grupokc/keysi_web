import { create } from 'zustand';

export const useProfilePhotoStore = create((set, get) => ({
  // Estado
  currentPhotoUrl: null,
  selectedFile: null,
  previewUrl: null,
  uploading: false,
  user: null,

  // Función para obtener la URL de la imagen de Pegasus
  getImageUrl: (user) => {
    let url = "https://pegasus.grupokc.com.mx/img/iconUsuario.png";
    
    // Si tiene Id_Documento_Foto, usar la foto personalizada
    if (user?.Id_Documento_Foto && user?.Id_Documento_Foto !== "null") {
      url = `/api/profile-photo/${user.Id_Documento_Foto}`;
    }
    // Si no tiene Id_Documento_Foto pero tiene RutaFoto, usar la foto de Pegasus
    else if (user?.RutaFoto && user?.RutaFoto !== "null") {
      // Convertir las barras invertidas a barras normales y construir la URL
      const foto = user.RutaFoto.replace(/\\/g, "/");
      url = `https://pegasus.grupokc.com.mx/${foto}`;
    }
    
    return url;
  },

  // Acciones
  setUser: (user) => {
    const currentPhotoUrl = get().getImageUrl(user);
    set({ user, currentPhotoUrl });
  },

  setSelectedFile: (file) => set({ selectedFile: file }),

  setPreviewUrl: (url) => set({ previewUrl: url }),

  setUploading: (uploading) => set({ uploading }),

  clearSelection: () => set({ 
    selectedFile: null, 
    previewUrl: null 
  }),

  updatePhotoUrl: (newPhotoUrl) => set({ 
    currentPhotoUrl: newPhotoUrl 
  }),

  // Función para actualizar el avatar del usuario
  updateUserAvatar: (newAvatarUrl) => {
    const { user } = get();
    if (user) {
      const updatedUser = {
        ...user,
        Url_Avatar: newAvatarUrl,
        // No tocar RutaFoto, solo actualizar Url_Avatar
      };
      set({ 
        user: updatedUser, 
        currentPhotoUrl: newAvatarUrl 
      });
    }
  },

  resetToPegasus: () => {
    const { user } = get();
    if (user?.RutaFoto && user?.RutaFoto !== "null") {
      const foto = user.RutaFoto.replace(/\\/g, "/");
      const pegasusUrl = `https://pegasus.grupokc.com.mx/${foto}`;
      set({ currentPhotoUrl: pegasusUrl });
    } else {
      set({ currentPhotoUrl: "https://pegasus.grupokc.com.mx/img/iconUsuario.png" });
    }
  }
})); 