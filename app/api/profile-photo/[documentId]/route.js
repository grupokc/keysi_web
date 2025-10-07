import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { documentId } = params;

    if (!documentId) {
      return NextResponse.json(
        { error: 'ID de documento requerido' },
        { status: 400 }
      );
    }

    // Construir la URL del archivo en el servidor de Grupo KC
    // Asumiendo que los avatares se guardan en una ruta específica
    const avatarUrl = `https://fb.grupokc.com.mx/api/Nf_File/GetFile?ClassName=Avatar&Id_Documento=${documentId}`;
    
    // Redirigir al archivo real en el servidor
    return NextResponse.redirect(avatarUrl);

  } catch (error) {
    console.error('Error al obtener la foto:', error);
    // En caso de error, redirigir a la imagen por defecto
    return NextResponse.redirect('https://pegasus.grupokc.com.mx/img/iconUsuario.png');
  }
} 