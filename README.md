# Keysi - Asistente de IA

Aplicación web de chat con asistente de IA construida con Next.js 14, React y TypeScript.

## 🚀 Características

- **Chat en tiempo real**: Interfaz de chat interactiva con streaming de respuestas
- **Sugerencias dinámicas**: Sugerencias contextuales generadas por IA
- **Renderizado de Markdown**: Soporte completo para Markdown en las respuestas
- **Azure Service Bus**: Integración con Azure Service Bus para mensajería
- **Responsive**: Diseño adaptable a dispositivos móviles y desktop

## 📋 Requisitos Previos

- Node.js >= 18
- npm o yarn
- Cuenta de Azure con Service Bus configurado

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/grupokc/keysi_web.git
cd keysi_web
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:

Crear archivo `.env.local` con:
```env
AZURE_SERVICE_BUS_CONNECTION_STRING=your_connection_string_here
CHAT_BASE_URL=https://apipy.kcapis.net/chatbase
CHAT_URL_AUTH=your_auth_token_here
```

4. Ejecutar en desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Estructura del Proyecto

```
keysi_web/
├── app/
│   ├── keysi/               # Página principal del chat
│   │   ├── components/      # Componentes del chat
│   │   ├── page.tsx        # Componente principal
│   │   └── suggestions.json # Sugerencias iniciales
│   ├── hooks/              # Custom hooks
│   │   ├── useChatBot.ts   # Hook principal del chat
│   │   ├── useLocalStorage.js
│   │   └── useSystemType.ts
│   ├── config/
│   │   └── systems.js      # Configuración del sistema
│   ├── components/ui/      # Componentes UI reutilizables
│   └── layout.tsx          # Layout principal
├── lib/
│   ├── azure-service-bus.ts # Cliente de Azure Service Bus
│   └── utils.ts            # Utilidades
└── components/ui/kibo-ui/  # Componentes UI especializados
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 🔑 Configuración

### Azure Service Bus

La aplicación utiliza Azure Service Bus para la mensajería. Asegúrate de:

1. Tener una cuenta de Azure activa
2. Crear un namespace de Service Bus
3. Obtener la cadena de conexión
4. Configurar las colas necesarias

### Variables de Entorno

| Variable | Descripción |
|----------|-------------|
| `AZURE_SERVICE_BUS_CONNECTION_STRING` | Cadena de conexión de Azure Service Bus |
| `CHAT_BASE_URL` | URL base del servicio de chat |
| `CHAT_URL_AUTH` | Token de autenticación para el chat |

## 📦 Dependencias Principales

- **Next.js 14** - Framework de React
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **@azure/service-bus** - Cliente de Azure Service Bus
- **@heroui/react** - Componentes UI
- **react-markdown** - Renderizado de Markdown
- **axios** - Cliente HTTP
- **luxon** - Manejo de fechas

## 🎨 Personalización

### Temas

La aplicación soporta modo claro y oscuro. Los estilos se configuran en:
- `app/ui/global.css` - Estilos globales
- `tailwind.config.ts` - Configuración de Tailwind

### Sugerencias

Las sugerencias iniciales se configuran en:
- `app/keysi/suggestions.json`

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conectar el repositorio a Vercel
2. Configurar las variables de entorno
3. Desplegar

### Docker

```bash
docker build -t keysi-web .
docker run -p 3000:3000 keysi-web
```

## 📝 Licencia

Propiedad de Grupo KC

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Grupo KC - [https://grupokc.com.mx](https://grupokc.com.mx)

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
