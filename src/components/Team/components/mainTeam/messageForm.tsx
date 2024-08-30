import { useState } from "react";
import { saveTeamMessage } from "../../../../network/chatApi";
import { useParams } from "react-router-dom";
import { useUser } from "../../../../utils/Contexte/UserContext/userContexte";
import { TChat } from "../../../../models/chat";

export default function MessageForm() {
  const { user, socket } = useUser();
  const { id: teamId } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (message.trim()) {
      try {
        if (!user || !teamId) return;
        const teamMessage: TChat = {
          teamId,
          userId: user?.id,
          userName: user?.name,
          profileImg:
            typeof user?.profileImg === "string" ? user?.profileImg : "",
          message,
        };
        if (socket.current) {
          socket.current.emit("send-team-message", teamMessage, teamId);
        }
        await saveTeamMessage(teamMessage);
        setMessage(""); // Clear the input after sending
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      <div>
        <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex w-full border-2 border-purple-500 rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-12 overflow-auto resize-none"
          />
        </div>
      </div>
      <div className="ml-4">
        <button
          onClick={handleSend}
          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-3 flex-shrink-0"
        >
          <span>Send</span>
          <span className="ml-2">
            <svg
              className="w-4 h-4 transform rotate-45 -mt-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
