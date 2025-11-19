import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient: Client | null = null;

export function getStompClient(): Client {
  if (!stompClient) {
    stompClient = new Client({
      webSocketFactory: () => new SockJS("https://localhost:8080/ws"),
      reconnectDelay: 5000, // auto reconnect
      debug: () => {}, // disable logs
    });

    stompClient.activate();
  }
  return stompClient;
}