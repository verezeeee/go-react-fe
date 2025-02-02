interface GetRoomMessagesRequest {
  id: string;
}

export async function getRoomMessages({ id }: GetRoomMessagesRequest) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/api/rooms/${id}/messages`
  );

  const data: Array<{
    id: string;
    room_id: string;
    message: string;
    reaction_count: number;
    answered: boolean;
  }> = await response.json();

  return {
    messages: data.map((item) => {
      return {
        id: item.id,
        text: item.message,
        amountOfReactions: item.reaction_count,
        answered: item.answered,
      };
    }),
  };
}
