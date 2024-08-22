import { IoClose } from "react-icons/io5";
import { useTeam } from "../../../../utils/Contexte/TeamContext/teamContexte";
import { User } from "../../../../models/Users";
import { useEffect, useState } from "react";
import { useUser } from "../../../../utils/Contexte/UserContext/userContexte";
import { MdDeleteOutline } from "react-icons/md";

interface TeamMembersProps {
  showMembers: boolean;
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TeamMembers({
  setShowMembers,
  showMembers,
}: TeamMembersProps) {
  const { teamMembers, team, removeMember } = useTeam();
  const { user } = useUser();
  const [boss, setBoss] = useState<User | null>(null);
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    if (teamMembers && team?.ownerId) {
      setBoss(
        teamMembers.find((member) => +member.id === +team?.ownerId) ?? null
      );
      setMembers(teamMembers.filter((member) => +member.id !== +team?.ownerId));
    } else {
      setBoss(null);
      setMembers(teamMembers);
    }
  }, [teamMembers, team]);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowMembers(false);
    }
  };
  return (
    <div
      className={
        "bg-black/40 fixed inset-0 z-50 flex items-center justify-center  " +
        (showMembers ? "" : "hidden")
      }
      onClick={handleClose}
    >
      <div className=" min-h-screen  flex items-center justify-center flex-col  max-w-screen-2xl overflow-hidden  sm:mx-8 xl:mx-auto text-center">
        <div className=" space-y-5 col-span-8 overflow-hidden rounded-xl  sm:bg-gray-100 sm:px-16 sm:shadow min-h-[80vh] w-[50vw] shadow-slate-900 shadow-inner">
          <div className="flex items-center justify-between w-full border-b">
            <h1 className=" py-6 text-4xl text-left font-semibold ">
              Team Members
            </h1>
            <div
              className="font-bold text-2xl p-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-300 cursor-pointer "
              onClick={() => setShowMembers(false)}
            >
              <IoClose />
            </div>
          </div>
          <div className="max-h-[67vh] overflow-x-hidden overflow-y-auto">
            <div className="grid gap-4 mb-6 lg:mb-16 ">
              <h1 className="text-lg italic font-mono text-gray-400">Boss</h1>
              {boss ? (
                <div className="items-center bg-gray-50 rounded-lg shadow flex justify-between text-left dark:bg-gray-800 dark:border-gray-700 max-h-[120px]">
                  <img
                    className="h-full w-auto rounded-lg sm:rounded-none sm:rounded-l-lg "
                    src={String(boss.profileImg)}
                    alt="Profile pic"
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href="#">{boss.name}</a>
                    </h3>
                    <span className="text-slate-900 dark:text-gray-400">
                      {boss.email}
                    </span>
                    <div>
                      <ul className="flex flex-wrap items-center justify-center my-3 gap-2 max-w-full h-auto">
                        {boss.skills && boss.skills.length > 0 ? (
                          boss.skills.map((skill) => (
                            <li
                              key={skill}
                              className="text-xs font-medium text-purple bg-white rounded-xl px-3 flex items-center justify-center py-2"
                            >
                              {skill}
                            </li>
                          ))
                        ) : (
                          <li>No skills</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div>No Team boss</div>
              )}

              <hr className=" mb-8" />
            </div>
            <div className="grid gap-8 mb-6 lg:mb-16 ">
              {members.map((member, index) => (
                <>
                  <h1 className="text-lg italic font-mono text-gray-400">
                    Members
                  </h1>
                  <div
                    key={index}
                    className="items-center bg-gray-50 rounded-lg shadow flex justify-between text-left dark:bg-gray-800 dark:border-gray-700 max-h-[120px]"
                  >
                    <img
                      className="h-full w-auto rounded-lg sm:rounded-none sm:rounded-l-lg "
                      src={String(member.profileImg)}
                      alt="Profile pic"
                    />

                    <div className="p-5">
                      <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <a href="#">{member.name}</a>
                      </h3>
                      <span className="text-slate-900 dark:text-gray-400">
                        {member.email}
                      </span>
                      <div>
                        <ul className="flex flex-wrap items-center justify-center my-3 gap-2 max-w-full h-auto">
                          {member.skills && member.skills.length > 0 ? (
                            member.skills.map((skill) => (
                              <li
                                key={skill}
                                className="text-xs font-medium text-purple bg-white rounded-xl px-3 flex items-center justify-center py-2"
                              >
                                {skill}
                              </li>
                            ))
                          ) : (
                            <li>No skills</li>
                          )}
                        </ul>
                      </div>
                    </div>

                    {user?.id === team?.ownerId && (
                      <div className="p-5">
                        <div className="flex items-center justify-center gap-5 flex-col pr-5">
                          <span
                            onClick={() => removeMember(+member.id)}
                            className="p-2 text-red-500 text-2xl  rounded-full cursor-pointer hover:bg-red-400 hover:text-white"
                          >
                            <MdDeleteOutline />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <hr className=" mb-8" />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
