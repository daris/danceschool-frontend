import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient: Client | null = null;

export function getStompClient(): Client {
  if (!stompClient) {
    stompClient = new Client({
      webSocketFactory: () => new SockJS(process.env.NEXT_PUBLIC_WS_URL || "/ws"),
      reconnectDelay: 5000, // auto reconnect
      debug: () => {}, // disable logs
    });

    stompClient.activate();
  }
  return stompClient;
}