import { useUser } from "../../../../utils/Contexte/UserContext/userContexte";

interface teamMessagesProps {
  message: string;
  senderId: string;
  sender: string;
  date: string;
}

export default function TeamMessage({
  message,
  sender,
  senderId,
  date,
}: teamMessagesProps) {
  const { user } = useUser();

  return user?.id && +user?.id !== +senderId ? (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          {sender[0].toUpperCase()}
        </div>
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl flex flex-col items-start justify-start gap-0.5 text-left">
          <div className="text-xs text-gray-300 font-bold">{sender}</div>
          <div className="italic font-semibold text-md text-slate-900">
            {message}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse gap-5">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          {sender[0].toUpperCase()}
        </div>
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl flex flex-col items-start justify-start gap-0.5 text-left">
          <div className="text-xs text-gray-300 font-bold flex justify-between px-1 w-full">
            <span>You</span>
            <span className="font-normal text-indigo-900">
              {new Date(date).getHours()} : {new Date(date).getMinutes()}
            </span>
          </div>
          <div className="italic font-semibold text-md text-slate-900">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
