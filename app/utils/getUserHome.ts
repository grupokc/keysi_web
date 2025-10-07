export const getUserHome = (userData: any): string => {
  if (!userData) return '/auth';

  // Agente DXN
  if (userData.Id_Tipo === 2 && userData.Id_Categoria === 3) {
    return '/tickets';
  }
  // Agente IP
  else if (userData.Id_Tipo === 2 && userData.Id_Agente_Tipo === 2) {
    return userData.Id_Categoria !== 10 ? '/inbox/agentes' : '/inbox/promotores';
  }
  // Super Admin
  else if (userData.Id_Tipo === 1) {
    return '/inbox/kc';
  }
  // Otros agentes
  else if (userData.Id_Tipo === 2 && userData.Id_Agente_Tipo === 1) {
    return '/tickets';
  }
  // Otros tipos específicos
  else if ([4, 3, 7].includes(userData.Id_Tipo)) {
    return '/tickets';
  }

  return '/auth';
};
