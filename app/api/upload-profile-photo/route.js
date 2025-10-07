import { NextResponse } from 'next/server';
import { executeForCRUD } from '@/app/services/frontBack';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const photo = formData.get('photo');
    const userId = formData.get('userId');
    const agentId = formData.get('agentId');

    if (!photo || !userId || !agentId) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    // Convertir la imagen a base64
    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Aquí deberías guardar la imagen en tu sistema de archivos o CDN
    // Por ahora, simulamos que se guarda y se genera un ID de documento
    const documentId = `photo_${Date.now()}_${userId}`;

    // Actualizar el perfil de TuAgente con el nuevo ID de documento
    const params = {
      ClassName: "Tu_Agente_Perfiles",
      Action: "Update",
      Id_Agente: agentId,
      Id_Documento_Foto: documentId,
      UsuarioUMod: userId,
      ReturnTable: 1
    };

    const response = await executeForCRUD(params);

    if (response?.data?.length > 0) {
      return NextResponse.json({
        success: true,
        photoUrl: `/api/profile-photo/${documentId}`,
        documentId: documentId
      });
    } else {
      throw new Error('Error al actualizar el perfil');
    }

  } catch (error) {
    console.error('Error al subir la foto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 