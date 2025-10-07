import { useState, useCallback } from 'react';

interface MessageOptions {
  messageId?: string;
  sessionId?: string;
  correlationId?: string;
  label?: string;
  timeToLive?: number;
  scheduledEnqueueTime?: Date;
  [key: string]: any;
}

interface ServiceBusMessage {
  body: any;
  properties?: MessageOptions;
}

interface UseServiceBusReturn {
  sendMessage: (queueName: string, message: ServiceBusMessage) => Promise<void>;
  sendBatchMessages: (queueName: string, messages: ServiceBusMessage[]) => Promise<void>;
  sendScheduledMessage: (queueName: string, message: ServiceBusMessage, scheduledTime: Date) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useServiceBus(): UseServiceBusReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (queueName: string, message: ServiceBusMessage) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          queueName,
          message,
          type: 'single'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const result = await response.json();
      console.log('Message sent successfully:', result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendBatchMessages = useCallback(async (queueName: string, messages: ServiceBusMessage[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          queueName,
          messages,
          type: 'batch'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send batch messages');
      }

      const result = await response.json();
      console.log('Batch messages sent successfully:', result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendScheduledMessage = useCallback(async (
    queueName: string, 
    message: ServiceBusMessage, 
    scheduledTime: Date
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          queueName,
          message,
          scheduledTime: scheduledTime.toISOString(),
          type: 'scheduled'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send scheduled message');
      }

      const result = await response.json();
      console.log('Scheduled message sent successfully:', result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sendMessage,
    sendBatchMessages,
    sendScheduledMessage,
    isLoading,
    error
  };
}
