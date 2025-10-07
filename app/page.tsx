'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Button,
  Input,
  ScrollShadow,
  Chip,
} from '@heroui/react';
import { Sparkles, Send, Bot, ArrowUp, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useChatBot } from '@/app/hooks/useChatBot';
import { getInitialSuggestions } from './suggestionsUtils';
import { AIResponse } from './components/AIResponse';
import { AISuggestion, AISuggestions } from '@/components/ui/kibo-ui/ai/suggestion';


interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatBotPage() {
  const router = useRouter();
  const {
    messages,
    isLoading,
    isConnected,
    error,
    dynamicSuggestions,
    isLoadingSuggestions,
    user,
    sendMessage,
    checkConnection,
    addWelcomeMessage,
    getSuggestionsFromBot,
    setState,
    assistantResponse
  } = useChatBot();

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Obtener sugerencias basadas en la conversación
  const getCurrentSuggestions = (): string[] => {
    // Si solo hay un mensaje (mensaje de bienvenida), usar sugerencias iniciales
    if (messages.length === 1) {
      return getInitialSuggestions();
    }
    
    // Si hay sugerencias dinámicas del webhook, usarlas
    if (dynamicSuggestions.length > 0) {
      return dynamicSuggestions;
    }
    
    // Si no hay sugerencias dinámicas y ya hay conversación, no mostrar sugerencias
    return [];
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();

  }, [messages]);



  // Agregar mensaje de bienvenida al cargar
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: "¡Hola! Soy **Keysi**, tu asistente de IA. ¿En qué puedo ayudarte hoy? 😊",
        role: 'assistant',
        timestamp: new Date(),
      };
      setState((prev: any) => ({ ...prev, messages: [welcomeMessage] }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSuggestionClick = (suggestion: string) => {

    sendMessage(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() && !isLoading) {
      // Si hay conexión, usar el sendMessage del hook
      if (isConnected) {
        sendMessage(inputValue);
      } else {
        // Si no hay conexión, simular respuesta local
        handleOfflineMessage(inputValue);
      }
      setInputValue('');
    }
  };

  const handleOfflineMessage = (message: string) => {
    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString() + '_user',
      content: message,
      role: 'user',
      timestamp: new Date(),
    };

    setState(prev => ({ ...prev, messages: [...prev.messages, userMessage] }));

    // Simular respuesta del asistente
    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now().toString() + '_assistant',
        content: `Gracias por tu mensaje: "${message}". 

Para obtener respuestas completas y acceso a todas las funciones, te recomiendo **iniciar sesión** usando el botón en la esquina superior derecha.

Con una cuenta podrás acceder a:
- Respuestas personalizadas
- Historial de conversaciones
- Funciones avanzadas
- Y mucho más`,
        role: 'assistant',
        timestamp: new Date(),
      };
      setState(prev => ({ ...prev, messages: [...prev.messages, assistantMessage] }));
    }, 1000);
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 flex flex-col">
      {/* Header con botón de login */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-500" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Keysi</h1>
            </div>
          </div>

        </div>
      </div>

      {/* Área de mensajes - Scroll interno */}
      <div className="flex-1 bg-white overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] lg:max-w-[70%] ${
                message.role === 'user' 
                  ? 'bg-blue-500 text-white rounded-2xl rounded-br-md' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl rounded-bl-md'
              } px-4 py-3`}>
                {message.role === 'assistant' ? (
                  <AIResponse 
                    content={message.content} 
                    className="text-sm"
                  />
                ) : (
                  <p className="text-sm leading-relaxed">{message.content}</p>
                )}
                <p className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          

          {isLoading && assistantResponse.length == 0 && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3 max-w-[80%] lg:max-w-[70%]">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>

                </div>
              </div>
            </div>
          )}
          {isLoading && assistantResponse.length > 0 && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3 max-w-[80%] lg:max-w-[70%]">
                <div className="flex items-center gap-2">

                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    <AIResponse 
                    content={assistantResponse} 
                    className="text-sm"
                    />
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Sugerencias en el área de mensajes - Solo al inicio */}
        {messages.length === 1 && (() => {
          const suggestions = getCurrentSuggestions();
          if (suggestions.length > 0) {
            return (
              <div className="max-w-4xl mx-auto px-4 pb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">
                  Sugerencias rápidas:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
                  {suggestions.map((suggestion: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-pointer transition-all duration-200 border border-gray-200 dark:border-gray-600 rounded-lg p-3 text-left shadow-sm hover:shadow-md"
                    >
                      <div className="text-sm leading-relaxed">
                        {suggestion}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })()}
      </div>

      {/* Sugerencias fijas arriba del input - Solo cuando hay conversación */}
      {messages.length > 1 && (() => {
        const suggestions = getCurrentSuggestions();
        const hasSuggestions = suggestions.length > 0 || isLoadingSuggestions;
        
        if (hasSuggestions) {
          return (
            <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2">
              <div className="max-w-4xl mx-auto">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Sugerencias rápidas:
                </p>
                {isLoadingSuggestions ? (
                  // Loading general para sugerencias
                  <div className="flex justify-center items-center py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Generando sugerencias...
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 ">

                  <AISuggestions>
                    {suggestions.map((suggestion) => (
                      <AISuggestion
                        key={suggestion}
                        onClick={handleSuggestionClick}
                        suggestion={suggestion}
                      />
                    ))}
                  </AISuggestions>

                    {/* {suggestions.map((suggestion: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-pointer transition-all duration-200 border border-gray-200 dark:border-gray-600 rounded-lg p-3 text-left shadow-sm hover:shadow-md"
                      >
                        <div className="text-sm leading-relaxed">
                          {suggestion}
                        </div>
                      </button>
                    ))} */}
                  </div>
                )}
              </div>
            </div>
          );
        }
        return null;
      })()}

      {/* Input fijo en la parte inferior */}
      <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              placeholder="Escribe tu mensaje aquí..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1"
              size="lg"
              classNames={{
                input: "text-sm",
                inputWrapper: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 focus-within:border-blue-500"
              }}
            />
            <Button
              type="submit"
              isIconOnly
              size="lg"
              color="primary"
              disabled={!inputValue.trim()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>
      </div>
      
    </div>
  );
}
