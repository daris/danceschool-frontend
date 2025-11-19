import {useEffect} from "react";
import {getStompClient} from "@/lib/stompClient";
import {IMessage, StompSubscription} from "@stomp/stompjs";

export function useCourseAttendanceUpdates(
  courseId: string,
  handleUpdate: (data: any) => void
) {
  useEffect(() => {
    const client = getStompClient();
    let subscription: StompSubscription | undefined;

    client.onConnect = () => {
      subscription = client.subscribe(
        `/topic/courses/${courseId}/attendances`,
        (message: IMessage) => {
          const payload = JSON.parse(message.body);
          handleUpdate(payload);
        }
      );
    };

    return () => {
      subscription?.unsubscribe();
      console.log(`Unsubscribed from /topic/courses/${courseId}/attendances`);
    };
  }, [courseId, handleUpdate]);
}