'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useLocalStorage } from './useLocalStorage';
import { SYSTEMS_CONFIG } from '@/app/config/systems';
import { sendMessageToQueue } from '@/lib/azure-service-bus';
const tokens = [
  '### Hello',
  ' World',
  '\n\n',
  'This',
  ' is',
  ' a',
  ' **mark',
  'down',
  '**',
  ' response',
  ' from',
  ' an',
  ' AI',
  ' model',
  '.',
  '\n\n',
  '---',
  '\n\n',
  '## Tables',
  '\n\n',
  '| Column 1',
  ' | Column 2',
  ' | Column 3',
  ' |',
  '\n',
  '|----------|----------|----------|',
  '\n',
  '| Row 1, Col 1',
  ' | Row 1, Col 2',
  ' | Row 1, Col 3',
  ' |',
  '\n',
  '| Row 2, Col 1',
  ' | Row 2, Col 2',
  ' | Row 2, Col 3',
  ' |',
  '\n',
  '| Row 3, Col 1',
  ' | Row 3, Col 2',
  ' | Row 3, Col 3',
  ' |',
  '\n\n',
  '## Blockquotes',
  '\n\n',
  '> This',
  ' is',
  ' a',
  ' blockquote.',
  ' It',
  ' can',
  ' contain',
  ' multiple',
  ' lines',
  ' and',
  ' **formatted**',
  ' text.',
  '\n',
  '>',
  '\n',
  '> It',
  ' can',
  ' even',
  ' have',
  ' multiple',
  ' paragraphs.',
  '\n\n',
  '## Inline',
  ' Code',
  '\n\n',
  'Here',
  ' is',
  ' some',
  ' text',
  ' with',
  ' `inline',
  ' code`',
  ' in',
  ' the',
  ' middle',
  ' of',
  ' a',
  ' sentence.',
  ' You',
  ' can',
  ' also',
  ' use',
  ' `const',
  ' x',
  ' =',
  ' 42`',
  ' for',
  ' variable',
  ' declarations.',
  '\n\n',
  '## Code',
  ' Blocks',
  '\n\n',
  '```',
  'javascript',
  '\n',
  'const',
  ' greeting',
  ' = ',
  "'Hello, world!'",
  ';',
  '\n',
  'console',
  '.',
  'log',
  '(',
  'greeting',
  ')',
  ';',
  '\n',
  '```',
  '\n\n',
  '## Math',
  '\n\n',
  'It',
  ' also',
  ' supports',
  ' math',
  ' equations',
  '. ',
  ' Here',
  ' is',
  ' a',
  ' display',
  ' equation',
  ' for',
  ' the',
  ' quadratic',
  ' formula',
  ':',
  '\n\n',
  '$$',
  '\n',
  'x',
  ' = ',
  '\\frac',
  '{',
  '-b',
  ' \\pm',
  ' \\sqrt',
  '{',
  'b^2',
  ' -',
  ' 4ac',
  '}',
  '}',
  '{',
  '2a',
  '}',
  '\n',
  '$$',
  '\n\n',
  '## Links',
  ' and',
  ' Lists',
  '\n\n',
  "Here's",
  ' a',
  ' [',
  'link',
  '](',
  'https://example.com',
  ')',
  ' and',
  ' some',
  ' more',
  ' text',
  ' with',
  ' an',
  ' unordered',
  ' list',
  ':',
  '\n\n',
  '-',
  ' Item',
  ' one',
  '\n',
  '-',
  ' Item',
  ' two',
  '\n',
  '-',
  ' Item',
  ' three',
  '\n\n',
  '## Ordered',
  ' Lists',
  '\n\n',
  '1.',
  ' First',
  ' item',
  '\n',
  '2.',
  ' Second',
  ' item',
  '\n',
  '3.',
  ' Third',
  ' item',
];
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatBotState {
  messages: Message[];
  isLoading: boolean;
  isConnected: boolean;
  error: string | null;
  dynamicSuggestions: string[];
  isLoadingSuggestions: boolean;
}
// const SYSTEMS_CONFIG.CHAT_BASE_URL = "https://apipy.kcapis.net/chatbase";

export const useChatBot = () => {

  const [user, setUser] = useLocalStorage("user", null);
  const [assistantResponse, setAssistantResponse] = useState('');
  const [state, setState] = useState<ChatBotState>({
    messages: [],
    isLoading: false,
    isConnected: false,
    error: null,
    dynamicSuggestions: [],
    isLoadingSuggestions: false
  });

  // Verificar conexión basada en el usuario
  const checkConnection = useCallback(() => {
    
    const isConnected = !!(user && user.Guid_Agente);
    
    setState(prev => ({ ...prev, isConnected }));
    return isConnected;
  }, [user]);

  // Enviar mensaje al webhook
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }));

    try {
      // Verificar conexión antes de enviar

      const from = '9513ce03-0cc6-410e-9c86-0c56c3677027' //user.Guid_Agente;

      if (!from) {
        throw new Error('No se pudo obtener el GUID del agente. Por favor, inicia sesión nuevamente.');
      }

      // Generar conversationId con timestamp de CDMX
      const hoyCDMX = DateTime.now().setZone('America/Mexico_City').startOf('day');
      
      // Obtener timestamp Unix (en segundos)
      const unixTimestamp = Math.floor(hoyCDMX.toSeconds());
      const conversationId = `${unixTimestamp}_${from}`;

      //const urln8n = "/api/n8n/webhook/748c0e62-3cde-4735-a6a6-a99c487c826d";
      const queueName = "wa_message_insert";
      const requestData = {"data":{
        "conversationId": conversationId,
        "action": "sendMessage",
        "chatInput": content,
        "stream": true
      }};


      const message = {
        guid: from,
        Plataforma: "Keysi web",
        Nombre_Usuario: 'Anonimo',
        conversationId: conversationId,
        rol: "usuario",
        message: content,
        timestamp: new Date().toISOString()
      };

      await sendMessageToQueue(queueName, message);
  


      const response = await fetch(SYSTEMS_CONFIG.CHAT_BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
          "Content-Type": "application/json"
        },
        body:JSON.stringify(requestData),
      })


      if (!response.ok) {
        const errorData = await response.json()
        throw Error(errorData.message)
      }
      
      const data = response.body
      
      if (!data) {
        // error happened
        return
      }
      
      const reader = data.getReader()
      const decoder = new TextDecoder()
      let done = false
      let assistantResponse = '';
      while (!done) {
        const {value, done: doneReading} = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        assistantResponse += chunkValue;
        setAssistantResponse(assistantResponse);


      }
      // let currentContent = '';
      // let index = 0;

      // const interval = setInterval(() => {
      //   if (index < tokens.length) {
      //     currentContent += tokens[index];
      //     setContent(currentContent);
      //     index++;
      //   } else {
      //     clearInterval(interval);
      //   }
      // }, 100);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: assistantResponse,
        role: 'assistant',
        timestamp: new Date(),
        
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
        error: null
      }));


      // Obtener sugerencias dinámicas basadas en la respuesta del asistente
      setTimeout(async () => {

        const message = {
          guid: from,
          Plataforma: "Keysi web",
          Nombre_Usuario: 'Anonimo',
          conversationId: conversationId,
          rol: "asistente",
          message: assistantResponse,
          timestamp: new Date().toISOString()
        };
        await sendMessageToQueue(queueName, message);

        await getSuggestionsFromBot(assistantResponse);
      }, 1000);

    } catch (error: any) {
      console.log("Error en sendMessage:", error);


      let errorMessage = 'Lo siento, hubo un problema al procesar tu mensaje. Por favor, intenta de nuevo en unos momentos.';

      if (error.code === 'ECONNABORTED') {
        errorMessage = 'La solicitud tardó demasiado en responder. Por favor, intenta de nuevo.';

      } else if (error.response?.status === 401) {
        errorMessage = 'Error de autenticación. Por favor, inicia sesión nuevamente.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Error del servidor. Por favor, intenta más tarde.';
      } else if (error.message?.includes('GUID')) {
        errorMessage = error.message;
      }

      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: errorMessage,
        role: 'assistant',
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, errorResponse],
        isLoading: false,
        error: errorMessage
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, checkConnection]);

  // Agregar mensaje de bienvenida
  const addWelcomeMessage = useCallback(() => {
  ;
    
    if (state.messages.length === 0 && state.isConnected) {
      const welcomeMessage: Message = {
        id: '1',
        content: '¡Hola! Soy tu asistente virtual de Titan. Estoy conectado y listo para ayudarte con cualquier consulta sobre ventas, productos, bonos o reportes. ¿En qué puedo asistirte hoy?',
        role: 'assistant',
        timestamp: new Date(),
      };
      setState(prev => ({ ...prev, messages: [welcomeMessage] }));
    } else if (state.messages.length === 0 && !state.isConnected) {
      const errorMessage: Message = {
        id: '1',
        content: 'No se pudo establecer la conexión. Por favor, asegúrate de estar autenticado en el sistema.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setState(prev => ({ ...prev, messages: [errorMessage] }));
    } else {
    }
  }, [state.messages.length, state.isConnected]);

  // Limpiar mensajes
  const clearMessages = useCallback(() => {
    setState(prev => ({ ...prev, messages: [], error: null }));
  }, []);

  // Obtener el último mensaje
  const getLastMessage = useCallback(() => {
    return state.messages[state.messages.length - 1];
  }, [state.messages]);

  // Obtener sugerencias del bot basadas en la respuesta anterior
  const getSuggestionsFromBot = useCallback(async (lastAssistantMessage: string) => {
    if (!user?.Guid_Agente) return;

    // Activar loading de sugerencias
    setState(prev => ({ ...prev, isLoadingSuggestions: true }));

    try {

      
      const promptForSuggestions = `Genera 5 preguntas muy cortas (máximo 40 caracteres) sobre "${lastAssistantMessage}". Formato: • ¿Pregunta corta? • ¿Otra pregunta? Solo preguntas directas y simples.`;

      // Generar conversationId con timestamp de CDMX para sugerencias
      const hoyCDMX = DateTime.now().setZone('America/Mexico_City').startOf('day');
      const unixTimestamp = Math.floor(hoyCDMX.toSeconds());
      const conversationId = `${unixTimestamp}_${user.Guid_Agente}`;

      const requestData ={data:{
        "conversationId": conversationId,
        "action": "sendMessage",
        "chatInput": promptForSuggestions,
        "stream": false
      }};


      const response = await axios({
        method: "POST",
        url: SYSTEMS_CONFIG.CHAT_BASE_URL,
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`,
          'Content-Type': 'application/json'
        },
        data: requestData,
        timeout: 15000 // 15 segundos de timeout para sugerencias
      });


      let suggestions: string[] = [];

      if (response.data && response.data.output) {
        const suggestionsResponse = response.data.output;
        
        // Extraer las sugerencias de la respuesta del bot
        suggestions = extractSuggestionsFromResponse(suggestionsResponse);
      }

      // Actualizar el estado con las nuevas sugerencias
      if (suggestions.length > 0) {
        setState(prev => ({ ...prev, dynamicSuggestions: suggestions, isLoadingSuggestions: false }));
      } else {
        generateLocalSuggestions(lastAssistantMessage);
        setState(prev => ({ ...prev, isLoadingSuggestions: false }));
      }

    } catch (error: any) {
      // En caso de error, usar sugerencias locales
      generateLocalSuggestions(lastAssistantMessage);
      setState(prev => ({ ...prev, isLoadingSuggestions: false }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.Guid_Agente]);

  // Función para extraer sugerencias de la respuesta del bot
  const extractSuggestionsFromResponse = (response: string): string[] => {
    const suggestions: string[] = [];
    
    // Buscar patrones específicos para sugerencias
    const patterns = [
      /•\s*¿([^?]+\?)/g,
      /•\s*([^•\n]+)/g,
      /-\s*¿([^?]+\?)/g,
      /-\s*([^-\n]+)/g,
      /\d+\.\s*¿([^?]+\?)/g,
      /\d+\.\s*([^•\n]+)/g,
      /¿([^?]+\?)/g
    ];

    for (const pattern of patterns) {
      const matches = response.match(pattern);
      if (matches) {
        for (const match of matches) {
          // Limpiar la sugerencia
          let suggestion = match.replace(/^[•\-]\s*/, '').replace(/^\d+\.\s*/, '').trim();
          
          // Filtrar sugerencias válidas
          if (suggestion.length > 10 && 
              (suggestion.includes('¿') || suggestion.includes('?') || suggestion.includes('?'))) {
            // Remover emojis, caracteres especiales y formato Markdown
            suggestion = suggestion
              .replace(/[😊👍🎯💡✨]+$/, '')
              .replace(/\*\*(.*?)\*\*/g, '$1') // Remover **texto**
              .replace(/\*(.*?)\*/g, '$1')     // Remover *texto*
              .replace(/`(.*?)`/g, '$1')       // Remover `código`
              .trim();
            
            // Acortar sugerencias muy largas
            if (suggestion.length > 40) {
              suggestion = suggestion.substring(0, 40) + '...';
            }
            
            suggestions.push(suggestion);
          }
        }
      }
    }

    // Si no encontramos sugerencias con los patrones, intentar dividir por líneas
    if (suggestions.length === 0) {
      const lines = response.split('\n').filter(line => line.trim().length > 0);
      for (const line of lines) {
        const cleanLine = line.replace(/^[•\-]\s*/, '').replace(/^\d+\.\s*/, '').trim();
        if (cleanLine.length > 15 && 
            (cleanLine.includes('¿') || cleanLine.includes('?') || cleanLine.includes('?'))) {
          let finalLine = cleanLine
            .replace(/[😊👍🎯💡✨]+$/, '')
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remover **texto**
            .replace(/\*(.*?)\*/g, '$1')     // Remover *texto*
            .replace(/`(.*?)`/g, '$1')       // Remover `código`
            .trim();
          
          // Acortar sugerencias muy largas
          if (finalLine.length > 40) {
            finalLine = finalLine.substring(0, 40) + '...';
          }
          
          suggestions.push(finalLine);
        }
      }
    }

    // Limitar a 5 sugerencias, eliminar duplicados y filtrar por longitud
    const uniqueSuggestions = [...new Set(suggestions)]
      .filter(s => s.length > 8 && s.length < 50)
      .slice(0, 5);

    return uniqueSuggestions;
  };

  // Generar sugerencias locales como fallback
  const generateLocalSuggestions = useCallback((lastMessage: string) => {

    const message = lastMessage.toLowerCase();
    let suggestions: string[] = [];

    // Sugerencias para seguros de vida
    if (message.includes('vida') || message.includes('life')) {
      suggestions = [
        "¿Cuáles son las mejores estrategias para vender seguros de vida?",
        "¿Qué coberturas adicionales puedo ofrecer?",
        "¿Cómo explico los beneficios del seguro de vida?",
        "¿Cuáles son las objeciones más comunes y cómo manejarlas?",
        "¿Qué documentación necesito para el proceso?"
      ];
    }
    // Sugerencias para seguros de auto
    else if (message.includes('auto') || message.includes('car') || message.includes('coche')) {
      suggestions = [
        "¿Cuáles son las mejores opciones de cobertura para autos?",
        "¿Cómo explico las diferencias entre coberturas?",
        "¿Qué beneficios adicionales puedo ofrecer?",
        "¿Cómo manejo las objeciones de precio?",
        "¿Qué información necesito del cliente?"
      ];
    }
    // Sugerencias para seguros de salud
    else if (message.includes('salud') || message.includes('health') || message.includes('médico')) {
      suggestions = [
        "¿Cuáles son las mejores opciones de cobertura médica?",
        "¿Cómo explico los beneficios de la cobertura?",
        "¿Qué redes médicas están disponibles?",
        "¿Cómo manejo las preguntas sobre preexistencias?",
        "¿Qué documentación médica necesito?"
      ];
    }
    // Sugerencias para bonos y comisiones
    else if (message.includes('bono') || message.includes('comisión') || message.includes('incentivo')) {
      suggestions = [
        "¿Cómo funciona el sistema de bonos por volumen?",
        "¿Cuáles son los requisitos para obtener bonos?",
        "¿Qué productos tienen mejores comisiones?",
        "¿Cómo puedo maximizar mis ganancias?",
        "¿Cuándo se pagan los bonos?"
      ];
    }
    // Sugerencias para reportes
    else if (message.includes('reporte') || message.includes('report') || message.includes('estadística')) {
      suggestions = [
        "¿Cómo puedo ver mis ventas del mes?",
        "¿Qué reportes están disponibles?",
        "¿Cómo interpreto los indicadores de rendimiento?",
        "¿Puedo exportar mis datos?",
        "¿Cómo comparo mi rendimiento con otros agentes?"
      ];
    }
    // Sugerencias para prospección
    else if (message.includes('prospección') || message.includes('prospecto') || message.includes('cliente')) {
      suggestions = [
        "¿Cuáles son las mejores técnicas de prospección?",
        "¿Cómo puedo encontrar nuevos clientes?",
        "¿Qué herramientas de marketing están disponibles?",
        "¿Cómo manejo las primeras llamadas?",
        "¿Qué preguntas debo hacer en la primera reunión?"
      ];
    }
    // Sugerencias para cierre de ventas
    else if (message.includes('cierre') || message.includes('venta') || message.includes('objeción')) {
      suggestions = [
        "¿Cuáles son las mejores técnicas de cierre?",
        "¿Cómo manejo las objeciones comunes?",
        "¿Qué preguntas debo hacer para cerrar?",
        "¿Cómo puedo crear urgencia sin ser agresivo?",
        "¿Qué hacer si el cliente dice 'lo pienso'?"
      ];
    }
    // Sugerencias para seguimiento
    else if (message.includes('seguimiento') || message.includes('follow') || message.includes('post-venta')) {
      suggestions = [
        "¿Cuándo debo hacer seguimiento a un prospecto?",
        "¿Qué información debo compartir en el seguimiento?",
        "¿Cómo mantengo el interés del cliente?",
        "¿Qué herramientas de seguimiento están disponibles?",
        "¿Cómo manejo los clientes que no responden?"
      ];
    }
    // Sugerencias generales si no hay contexto específico
    else {
      suggestions = [
        "¿Puedes darme más detalles sobre eso?",
        "¿Qué otros productos recomiendas?",
        "¿Cómo puedo mejorar en esta área?",
        "¿Tienes algún consejo específico?",
        "¿Qué recursos adicionales están disponibles?"
      ];
    }

    setState(prev => {
      return { ...prev, dynamicSuggestions: suggestions, isLoadingSuggestions: false };
    });
  }, []);

  return {
    // Estado
    messages: state.messages,
    isLoading: state.isLoading,
    isConnected: state.isConnected,
    error: state.error,
    dynamicSuggestions: state.dynamicSuggestions,
    isLoadingSuggestions: state.isLoadingSuggestions,
    user,

    // Acciones
    sendMessage,
    checkConnection,
    addWelcomeMessage,
    clearMessages,
    getLastMessage,
    getSuggestionsFromBot,
    generateLocalSuggestions,
    setState,
    assistantResponse
  };
}; 