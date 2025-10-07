import { ServiceBusClient, ServiceBusSender, ServiceBusMessage } from '@azure/service-bus';
import { SYSTEMS_CONFIG } from '@/app/config/systems';

// Azure Service Bus configuration
const connectionString = SYSTEMS_CONFIG.AZURE_SERVICE_BUS_CONNECTION_STRING;

if (!connectionString) {
  throw new Error('AZURE_SERVICE_BUS_CONNECTION_STRING environment variable is not set');
}

// Create a Service Bus client
const serviceBusClient = new ServiceBusClient(connectionString);

/**
 * Send a message to an Azure Service Bus queue
 * @param queueName - Name of the queue to send the message to
 * @param messageBody - The message content to send
 * @param properties - Optional message properties
 */
export async function sendMessageToQueue(
  queueName: string,
  messageBody: any,
  properties?: {
    messageId?: string;
    sessionId?: string;
    correlationId?: string;
    label?: string;
    timeToLive?: number;
    scheduledEnqueueTime?: Date;
    [key: string]: any;
  }
): Promise<void> {
  

    if (!serviceBusClient) {
      console.log('Service Bus client not initialized. Initializing...');
      // return initializeServiceBus();
    }
    // return serviceBusClient;

  const sender: ServiceBusSender = serviceBusClient.createSender(queueName);
  try {
    const message: ServiceBusMessage = {
      body: typeof messageBody === 'string' ? messageBody : JSON.stringify(messageBody),
      ...properties
    };
    await sender.sendMessages(message)

  } catch (error) {
    console.error('Error sending message to queue:', error);
    throw error;
  } finally {
    await sender.close();
  }
}

/**
 * Send multiple messages to an Azure Service Bus queue in batch
 * @param queueName - Name of the queue to send messages to
 * @param messages - Array of messages to send
 */
export async function sendBatchMessagesToQueue(
  queueName: string,
  messages: Array<{
    body: any;
    properties?: {
      messageId?: string;
      sessionId?: string;
      correlationId?: string;
      label?: string;
      timeToLive?: number;
      scheduledEnqueueTime?: Date;
      [key: string]: any;
    };
  }>
): Promise<void> {
  const sender: ServiceBusSender = serviceBusClient.createSender(queueName);

  try {
    const serviceBusMessages: ServiceBusMessage[] = messages.map(msg => ({
      body: typeof msg.body === 'string' ? msg.body : JSON.stringify(msg.body),
      contentType: 'application/json',
      ...msg.properties
    }));

    await sender.sendMessages(serviceBusMessages);
    console.log(`${messages.length} messages sent to queue: ${queueName}`);
  } catch (error) {
    console.error('Error sending batch messages to queue:', error);
    throw error;
  } finally {
    await sender.close();
  }
}

/**
 * Send a scheduled message to an Azure Service Bus queue
 * @param queueName - Name of the queue to send the message to
 * @param messageBody - The message content to send
 * @param scheduledTime - When the message should be delivered
 * @param properties - Optional message properties
 */
export async function sendScheduledMessage(
  queueName: string,
  messageBody: any,
  scheduledTime: Date,
  properties?: {
    messageId?: string;
    sessionId?: string;
    correlationId?: string;
    label?: string;
    timeToLive?: number;
    [key: string]: any;
  }
): Promise<void> {
  return sendMessageToQueue(queueName, messageBody, {
    ...properties,
    scheduledEnqueueTime: scheduledTime
  });
}

/**
 * Close the Service Bus client connection
 */
export async function closeServiceBusClient(): Promise<void> {
  await serviceBusClient.close();
}

// Export the client for advanced usage
export { serviceBusClient };
