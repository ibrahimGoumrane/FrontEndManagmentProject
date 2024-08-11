import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import MessageForm from "./messageForm";
import TeamMessage from "./teamMessage";
import { TChat } from "../../../../models/chat.ts";
import { getTeamChat } from "../../../../network/chatApi.ts";
import DayShower from "./dayShower.tsx";
import { useUser } from "../../../../utils/Contexte/UserContext/userContexte.ts";

export default function MainChatPage() {
  const { socket } = useUser();
  const [teamChat, setTeamChat] = useState<TChat[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const previousDate = useRef<Date | null>(null); // Keep track of the last displayed message date
  const { id: teamId } = useParams<{ id: string }>();
  useEffect(() => {
    if (socket.current && teamId) {
      socket.current.emit("join-team", teamId);
    }
  }, [teamId]);

  useEffect(() => {
    async function getTeamchat() {
      if (teamId) {
        const Chat = await getTeamChat(teamId);
        setTeamChat(Chat);
      }
    }
    getTeamchat();
  }, [teamId]);

  useEffect(() => {
    const handleReceiveMessage = (teamMessage: TChat) => {
      setTeamChat((prev) => [...prev, teamMessage]);
    };

    const currentSocket = socket.current;

    if (currentSocket) {
      currentSocket.on("receive-team-message", handleReceiveMessage);

      // Cleanup function
      return () => {
        currentSocket.off("receive-team-message", handleReceiveMessage);
      };
    }
  }, [socket.current]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [teamChat]); // Dependency array ensures scrolling when LocalTeamInfo changes

  return (
    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-slate-200 h-full p-4">
      <div
        className="flex flex-col h-full overflow-x-auto mb-6"
        ref={containerRef}
      >
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-12 gap-y-2">
            {teamChat.map((chat, index) => {
              const chatDate = chat.createdAt ? new Date(chat.createdAt) : null;
              let showDayShower = false;

              if (chatDate && previousDate.current) {
                showDayShower =
                  chatDate.getMonth() !== previousDate.current.getMonth() ||
                  chatDate.getDate() !== previousDate.current.getDate();
              }

              // Update previousDate to the current chatDate after processing
              if (chatDate) {
                previousDate.current = chatDate;
              }

              return (
                <div key={index} className="col-span-12">
                  {showDayShower && chatDate && (
                    <div>
                      <DayShower date={chatDate} />
                    </div>
                  )}
                  <TeamMessage
                    message={chat.message}
                    sender={chat.userName}
                    senderId={chat.userId}
                    date={chat.createdAt || new Date().toISOString()}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <MessageForm />
    </div>
  );
}
