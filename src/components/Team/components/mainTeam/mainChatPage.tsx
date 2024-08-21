import { useState, useEffect, useRef } from "react";
import MessageForm from "./messageForm";
import TeamMessage from "./teamMessage";
import { TChat } from "../../../../models/chat.ts";
import { getTeamChat } from "../../../../network/chatApi.ts";
import DayShower from "./dayShower.tsx";
import { useUser } from "../../../../utils/Contexte/UserContext/userContexte.ts";
import { useTeam } from "../../../../utils/Contexte/TeamContext/teamContexte.ts";

import Settings from "./settings.tsx";

interface Props {
  teamId: string;
}
export default function MainChatPage({ teamId }: Props) {
  const { socket } = useUser();
  const { teamImg, team } = useTeam();
  const [teamChat, setTeamChat] = useState<TChat[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousDate = useRef<Date | null>(null); // Keep track of the last displayed message date
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
        className="flex flex-col h-full overflow-x-auto mb-6 relative"
        ref={containerRef}
      >
        <div className="flex w-50 items-center justify-between min-h-16 px-10 py-1 bg-slate-100 rounded-t-lg  absolute top-0 left-0 w-full text-slate-900 text-sm font-semibold">
          <div className="flex items-center justify-center gap-6 ">
            <span className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden ">
              <img src={teamImg} alt="team Img" className="h-full w-full" />
            </span>
            <span className="font-bold text-lg text-slate-900 italic">
              {team?.name}
            </span>
          </div>
          <Settings />
        </div>
        <div className="flex flex-col h-full ">
          <div className="grid grid-cols-12 gap-y-2 mt-16">
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
