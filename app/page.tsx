'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useChatBot } from '@/app/hooks/useChatBot';
import { getInitialSuggestions } from './suggestionsUtils';
import { Response } from '@/components/ai-elements/response';
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import Image from 'next/image'


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
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleOfflineMessage = (message: string) => {
    sendMessage(message);
    // Agregar mensaje del usuario
    // const userMessage: Message = {
    //   id: Date.now().toString() + '_user',
    //   content: message,
    //   role: 'user',
    //   timestamp: new Date(),
    // };

    // setState(prev => ({ ...prev, messages: [...prev.messages, userMessage] }));

    // Simular respuesta del asistente
    // setTimeout(() => {
    //   const assistantMessage: Message = {
    //     id: Date.now().toString() + '_assistant',
    //     content: `Gracias por tu mensaje: "${message}". `,
    //     role: 'assistant',
    //     timestamp: new Date(),
    //   };
    //   setState(prev => ({ ...prev, messages: [...prev.messages, assistantMessage] }));
    // }, 1000);
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col">
      {/* Header mejorado - Aparece cuando hay conversación */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border-b border-gray-200/30 dark:border-gray-700/30 px-4 py-4 shadow-sm transition-all duration-500 ${
        messages.length > 1 ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r rounded-lg blur opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r p-2 rounded-lg">
                <Image
                    src="./img/keysi.png"
                    width={50}
                    height={40}
                    alt="Keysi"
                  />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Keysi
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Tu asistente inteligente</p>
            </div>
          </div>
          {isConnected && (
            <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></div>
              En línea
            </Badge>
          )}
        </div>
      </div>

      {/* Área de mensajes - Scroll interno */}
      <ScrollArea className="flex-1">
        <div className={`max-w-5xl mx-auto px-4 py-6 ${
          messages.length > 1 ? 'pt-24' : ''
        } ${
          messages.length > 1 && (dynamicSuggestions.length > 0 || isLoadingSuggestions)
            ? 'pb-48'
            : 'pb-32'
        }`}>
          {/* Pantalla de bienvenida cuando solo hay mensaje inicial */}
          <div className={`flex flex-col items-center justify-center py-12 space-y-6 transition-all duration-700 ${
            messages.length === 1
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-32 scale-90 pointer-events-none absolute'
          }`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r  rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-rp-6 rounded-full shadow-2xl">
                  <Image
                  src="./img/keysi.png"
                  width={200}
                  height={150}
                  alt="Keysi"
                />
              </div>
            </div>
            <div className="text-center space-y-2 max-w-2xl">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                ¡Hola! Soy Keysi
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Tu asistente de IA. ¿En qué puedo ayudarte hoy?
              </p>
            </div>
          </div>

          {/* Mensajes con avatares */}
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8 border-2 border-purple-200 dark:border-purple-800">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} max-w-[75%] lg:max-w-[65%]`}>
                  <div className={`group relative ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg border border-gray-200 dark:border-gray-700'
                  } rounded-2xl px-4 py-3 transition-all duration-200 hover:shadow-xl`}>
                    {message.role === 'assistant' ? (
                      <Response className="text-sm prose-sm">
                        {message.content}
                      </Response>
                    ) : (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 px-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {message.role === 'user' && (
                  <Avatar className="w-8 h-8 border-2 border-blue-200 dark:border-blue-800">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>


          {/* Loading states mejorados */}
          {isLoading && assistantResponse.length == 0 && (
            <div className="flex gap-3 justify-start animate-in slide-in-from-bottom-4 duration-500">
              <Avatar className="w-8 h-8 border-2 border-purple-200 dark:border-purple-800">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Pensando...</span>
                </div>
              </div>
            </div>
          )}
          {isLoading && assistantResponse.length > 0 && (
            <div className="flex gap-3 justify-start animate-in slide-in-from-bottom-4 duration-500">
              <Avatar className="w-8 h-8 border-2 border-purple-200 dark:border-purple-800">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start max-w-[75%] lg:max-w-[65%]">
                <div className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                  <Response parseIncompleteMarkdown className="text-sm prose-sm">
                    {assistantResponse}
                  </Response>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Sugerencias iniciales mejoradas */}
        {messages.length === 1 && (() => {
          const suggestions = getCurrentSuggestions();
          if (suggestions.length > 0) {
            return (
              <div className="max-w-5xl mx-auto px-4 pb-6">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 text-center">
                  Prueba con estas sugerencias
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {suggestions.map((suggestion: string, index: number) => (
                    <Card
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-blue-300 dark:hover:border-blue-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                    >
                      <div className="p-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {suggestion}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })()}
      </ScrollArea>

      {/* Sugerencias dinámicas durante conversación - Fijas por encima del input */}
      {messages.length > 1 && (() => {
        const suggestions = getCurrentSuggestions();
        const hasSuggestions = suggestions.length > 0 || isLoadingSuggestions;

        if (hasSuggestions) {
          return (
            <div className="fixed bottom-24 left-0 right-0 z-40 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl px-4 py-3 shadow-sm">
              <div className="max-w-5xl mx-auto">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2.5">
                  Continúa la conversación:
                </p>
                {isLoadingSuggestions ? (
                  <div className="flex items-center py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex space-x-1.5">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Generando sugerencias...
                      </span>
                    </div>
                  </div>
                ) : (
                  <Suggestions className="pb-1">
                    {suggestions.map((suggestion) => (
                      <Suggestion
                        key={suggestion}
                        onClick={handleSuggestionClick}
                        suggestion={suggestion}
                        className="shadow-sm hover:shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-300 dark:border-gray-600"
                      />
                    ))}
                  </Suggestions>
                )}
              </div>
            </div>
          );
        }
        return null;
      })()}

      {/* Input mejorado - Fijo en la parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl px-4 py-4 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 focus-within:border-blue-500 dark:focus-within:border-blue-500 transition-all duration-200 p-2">
              <Input
                placeholder="Escribe tu mensaje aquí..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isLoading}
                className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-10 w-10"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
              <p className="text-xs text-blue-600 dark:text-amber-400 mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amblueer-500 animate-pulse"></span>
                Grupo KC Agente de Seguros SAPI de C.V.  V001-2025
              </p>
          </form>
        </div>
      </div>
      
    </div>
  );
}
