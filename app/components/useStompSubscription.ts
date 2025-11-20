import { useEffect, useRef } from "react";
import { Client, StompSubscription, IMessage } from "@stomp/stompjs";
import { getStompClient } from "@/lib/stompClient";

type MessageHandler<T = any> = (message: T) => void;

/**
 * Reusable hook to subscribe to a STOMP topic.
 *
 * @param topic - The STOMP topic to subscribe to
 * @param onMessage - Callback invoked on each message
 */
export const useStompSubscription = <T = any>(
  topic: string,
  onMessage: MessageHandler<T>
) => {
  const subscriptionRef = useRef<StompSubscription | null>(null);

  useEffect(() => {
    const client: Client = getStompClient();

    const subscribe = () => {
      if (!client || !client.connected) return;

      subscriptionRef.current = client.subscribe(topic, (msg: IMessage) => {
        try {
          const body: T = JSON.parse(msg.body);
          onMessage(body);
        } catch (err) {
          console.error("Failed to parse STOMP message", err);
        }
      });
    };

    if (client.connected) {
      subscribe();
    } else {
      client.onConnect = subscribe;
    }

    return () => {
      subscriptionRef.current?.unsubscribe();
      subscriptionRef.current = null;
      console.log(`Unsubscribed from ${topic}`);
    };
  }, [topic, onMessage]);
};