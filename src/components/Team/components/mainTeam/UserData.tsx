import { useUser } from "../../../../utils/Contexte/UserContext/userContexte";

export default function UserData() {
  const { user, skills, profilePic } = useUser();
  return (
    <div className="flex flex-col items-center bg-purple-300/60 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
      <div className="h-20 w-20 rounded-full border overflow-hidden">
        <img src={profilePic} alt="Avatar" className="h-full w-full" />
      </div>
      <div className="text-sm font-semibold mt-2">{user?.name}</div>
      <div className="text-xs text-gray-500">{user?.email}</div>
      <div className="flex flex-row items-center mt-3">
        <div className="leading-none ml-1 text-xs  gap-2 grid grid-cols-3">
          {skills?.map((skill, index) => {
            return (
              <li
                key={index}
                className="text-center text-purple-900 bg-slate-100 p-2 rounded-md list-none"
              >
                {skill}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
}
