import { useUser } from "../../../../utils/Contexte/UserContext/userContexte";
import { Badge } from "flowbite-react";

export default function UserData() {
  const { user, skills } = useUser();
  return (
    <div className="flex flex-col items-center bg-purple-300/60 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
      <div className="h-20 w-20 rounded-full border overflow-hidden">
        <img
          src="https://avatars3.githubusercontent.com/u/2763884?s=128"
          alt="Avatar"
          className="h-full w-full"
        />
      </div>
      <div className="text-sm font-semibold mt-2">{user?.name}</div>
      <div className="text-xs text-gray-500">{user?.email}</div>
      <div className="flex flex-row items-center mt-3">
        <div className="leading-none ml-1 text-xs  gap-2 grid grid-cols-3">
          {skills?.map((skill, index) => {
            return (
              <Badge
                key={index}
                color="indigo"
                className="text-center text-purple-900"
              >
                {skill}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}
