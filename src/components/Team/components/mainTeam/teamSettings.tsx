import { useEffect, useState } from "react";
import { useTeam } from "../../../../utils/Contexte/TeamContext/teamContexte";
import { IoClose } from "react-icons/io5";
import { useUser } from "../../../../utils/Contexte/UserContext/userContexte";
import { useNavigate } from "react-router-dom";
import { PopUpType } from "../../../../models/utils";
import PopUp from "../../../utils/popUp";

interface TeamSettingsProps {
  showTeamSettings: boolean;
  setShowTeamSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TeamSettings({
  showTeamSettings,
  setShowTeamSettings,
}: TeamSettingsProps) {
  const { team, teamImg, teamMembers, deleteTeam } = useTeam();
  const navigate = useNavigate();
  const { user } = useUser();
  const [teamOwner, setTeamOwner] = useState<string>("No owner found");
  const [error, setError] = useState<string>("");
  useEffect(() => {
    if (!team?.ownerId) return;
    const owner = teamMembers.find((member) => +member.id === +team?.ownerId);
    setTeamOwner(owner?.name ?? "No owner found");
  }, [team?.ownerId, teamMembers]);
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowTeamSettings(false);
    }
  };
  const handleTeamDelete = async () => {
    try {
      if (team) {
        await deleteTeam();
        navigate("/home");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };
  return (
    <div
      className={
        "bg-black/40 fixed inset-0 z-50 flex items-center justify-center  " +
        (showTeamSettings ? "" : "hidden")
      }
      onClick={handleClose}
    >
      {error && (
        <PopUp
          type={PopUpType.Failed}
          message={error}
          setSuccess={() => setError("")}
        />
      )}
      <div className=" min-h-screen  flex items-center justify-center flex-col  max-w-screen-lg sm:mx-8 xl:mx-auto text-center">
        <div className="space-y-5 col-span-8 overflow-hidden rounded-xl min-w-[40vw] sm:bg-gray-100 sm:px-16 sm:shadow min-h-[80vh] shadow-slate-900 shadow-inner">
          <div className="flex items-center justify-between w-full border-b">
            <h1 className=" py-6 text-4xl text-left font-semibold ">
              Team Settings
            </h1>
            <div
              className="font-bold text-2xl p-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-300 cursor-pointer "
              onClick={() => setShowTeamSettings(false)}
            >
              <IoClose />
            </div>
          </div>
          <div className="pt-4 flex items-center justify-center ">
            <p className="overflow-hidden">
              <img
                src={teamImg}
                alt="teamImg"
                className="w-32 h-32 rounded-full"
              />
            </p>
          </div>
          <div className="pt-4 ">
            <h1 className="py-2 text-2xl font-semibold text-purple-500">
              Team Name
            </h1>
            <p className="font-bold text-lg italic text-slate-600">
              {team?.name}
            </p>
          </div>
          <hr className="mt-4 mb-8" />
          <h1 className="py-2 text-2xl font-semibold text-purple-500">
            Team Owner
          </h1>
          <p className="font-bold text-lg italic text-slate-600">{teamOwner}</p>
          <hr className="mt-4 mb-8" />
          {user?.id === team?.ownerId && (
            <div className="mb-10">
              <h1 className="py-2 text-2xl font-semibold text-purple-500">
                Delete Team
              </h1>
              <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Proceed with caution
              </p>
              <p className=" my-3 font-bold text-lg italic text-slate-600">
                Deleting this team will remove all team members and all team
                related data. This action cannot be undone.
              </p>
              <button
                className="ml-auto text-md  font-semibold text-rose-600 underline decoration-2"
                onClick={handleTeamDelete}
              >
                Continue with deletion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
