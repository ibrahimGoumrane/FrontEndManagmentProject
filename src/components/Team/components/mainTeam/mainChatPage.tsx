import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MessageForm from "./messageForm";
import TeamMessage from "./teamMessage";
import { TChat } from "../../../../models/chat.ts";
import { getTeamChat } from "../../../../network/chatApi.ts";

export default function MainChatPage() {
  const [teamChat, setTeamChat] = useState<TChat[]>([]);
  const { id: teamId } = useParams<{ id: string }>();

  useEffect(() => {
    async function getTeamchat() {
      if (teamId) {
        const Chat = await getTeamChat(teamId);
        setTeamChat(Chat);
      }
    }
    getTeamchat();
  }, [teamId]);
  return (
    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-slate-200 h-full p-4">
      <div className="flex flex-col h-full overflow-x-auto mb-6">
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-12 gap-y-2">
            {teamChat.map((chat) => {
              return (
                <TeamMessage message={chat.message} sender={chat.userName} senderId={chat.userId} />
              );
            })}
          </div>
        </div>
      </div>
      <MessageForm />
    </div>
  );
}
