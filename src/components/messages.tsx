import { useParams } from "react-router-dom";
import { Message } from "./message";
import { getRoomMessages } from "../http/get-room-messages";
import { useSuspenseQuery } from "@tanstack/react-query";

export function Messages() {
  const { id } = useParams();

  if (!id) {
    throw new Error(
      "Messages components must be rendered inside a room route."
    );
  }

  const { data } = useSuspenseQuery({
    queryKey: ["messages", id],
    queryFn: () => getRoomMessages({ id }),
  });

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {data.messages.map((message) => (
        <Message
          key={message.id}
          text={message.text}
          amountOfReactions={message.amountOfReactions}
          answered={message.answered}
        />
      ))}
    </ol>
  );
}
