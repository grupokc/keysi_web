'use client';

import React, { useState } from 'react';
import { useServiceBus } from '@/app/hooks/useServiceBus';

export default function ServiceBusExample() {
  const { sendMessage, sendBatchMessages, sendScheduledMessage, isLoading, error } = useServiceBus();
  const [queueName, setQueueName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleSendSingleMessage = async () => {
    if (!queueName || !messageText) {
      alert('Por favor ingresa el nombre de la cola y el mensaje');
      return;
    }

    try {
      await sendMessage(queueName, {
        body: {
          text: messageText,
          timestamp: new Date().toISOString(),
          source: 'Titan App'
        },
        properties: {
          messageId: `msg-${Date.now()}`,
          label: 'TitanMessage',
          correlationId: `corr-${Date.now()}`
        }
      });
      setResult('Mensaje enviado exitosamente');
      setMessageText('');
    } catch (err) {
      console.error('Error sending message:', err);
      setResult('Error al enviar el mensaje');
    }
  };

  const handleSendBatchMessages = async () => {
    if (!queueName) {
      alert('Por favor ingresa el nombre de la cola');
      return;
    }

    const messages = [
      {
        body: { text: 'Mensaje 1 del lote', timestamp: new Date().toISOString() },
        properties: { messageId: `batch-1-${Date.now()}`, label: 'BatchMessage' }
      },
      {
        body: { text: 'Mensaje 2 del lote', timestamp: new Date().toISOString() },
        properties: { messageId: `batch-2-${Date.now()}`, label: 'BatchMessage' }
      },
      {
        body: { text: 'Mensaje 3 del lote', timestamp: new Date().toISOString() },
        properties: { messageId: `batch-3-${Date.now()}`, label: 'BatchMessage' }
      }
    ];

    try {
      await sendBatchMessages(queueName, messages);
      setResult('Lote de mensajes enviado exitosamente');
    } catch (err) {
      console.error('Error sending batch messages:', err);
      setResult('Error al enviar el lote de mensajes');
    }
  };

  const handleSendScheduledMessage = async () => {
    if (!queueName || !messageText) {
      alert('Por favor ingresa el nombre de la cola y el mensaje');
      return;
    }

    // Programar mensaje para 1 minuto en el futuro
    const scheduledTime = new Date(Date.now() + 60000);

    try {
      await sendScheduledMessage(queueName, {
        body: {
          text: messageText,
          timestamp: new Date().toISOString(),
          source: 'Titan App - Scheduled'
        },
        properties: {
          messageId: `scheduled-${Date.now()}`,
          label: 'ScheduledMessage'
        }
      }, scheduledTime);
      setResult(`Mensaje programado para ${scheduledTime.toLocaleString()}`);
      setMessageText('');
    } catch (err) {
      console.error('Error sending scheduled message:', err);
      setResult('Error al enviar el mensaje programado');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Azure Service Bus - Envío de Mensajes
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="queueName" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de la Cola
          </label>
          <input
            id="queueName"
            type="text"
            value={queueName}
            onChange={(e) => setQueueName(e.target.value)}
            placeholder="Ej: mi-cola-de-mensajes"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="messageText" className="block text-sm font-medium text-gray-700 mb-2">
            Mensaje
          </label>
          <textarea
            id="messageText"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSendSingleMessage}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
          </button>

          <button
            onClick={handleSendBatchMessages}
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Enviando...' : 'Enviar Lote'}
          </button>

          <button
            onClick={handleSendScheduledMessage}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Programando...' : 'Programar Mensaje'}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <strong>Resultado:</strong> {result}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Instrucciones:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>Enviar Mensaje:</strong> Envía un mensaje individual a la cola</li>
          <li>• <strong>Enviar Lote:</strong> Envía 3 mensajes de ejemplo en un lote</li>
          <li>• <strong>Programar Mensaje:</strong> Programa un mensaje para ser entregado en 1 minuto</li>
        </ul>
      </div>
    </div>
  );
}
