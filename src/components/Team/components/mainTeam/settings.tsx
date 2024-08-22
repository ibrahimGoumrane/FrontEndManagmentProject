import { FaListUl } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import TeamMembers from "./teamMembers";
import TeamSettings from "./teamSettings";
import { useTeam } from "../../../../utils/Contexte/TeamContext/teamContexte";
import { useUser } from "../../../../utils/Contexte/UserContext/userContexte";
import { useNavigate } from "react-router-dom";
import ModalUnstyled from "../../../ProjectComponent/components/modal";
import { PopUpType } from "../../../../models/utils";

export default function Settings() {
  const { team, deleteTeam, removeMember } = useTeam();
  const { user } = useUser();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showTeamSettings, setShowTeamSettings] = useState(false);
  const [showConfirmLeave, setShowConfirmLeave] = useState(false);
  function handleClick() {
    setShowSettings((showSettings) => !showSettings);
  }
  function handleTeamSettings() {
    setShowSettings(false);
    setShowTeamSettings(true);
  }
  function handleMembers() {
    setShowSettings(false);
    setShowMembers(true);
  }
  function handleLeave() {
    setShowSettings(false);
    setShowConfirmLeave(true);
  }
  async function handleConfirmLeave() {
    if (team?.ownerId === user?.id) {
      await deleteTeam();
      return navigate("/home");
    }
    if (!user?.id) return navigate("*");
    else await removeMember(+user?.id);
    navigate("/home");
  }
  console.log(showConfirmLeave);
  return (
    <>
      <div className="relative">
        <div
          className="text-xl p-3   rounded-md flex items-center justify-center text-white bg-indigo-600  font-semibold relative cursor-pointer"
          onClick={handleClick}
        >
          {!showSettings ? <FaListUl /> : <IoMdClose />}
        </div>
        {showSettings && (
          <div className="absolute top-0 right-[120%] bg-white text-slate-900 text-sm font-semibold border border-gray-300 p-2 rounded-md shadow-md z-50">
            <div className="flex flex-col space-y-2">
              <button
                className="text-center font-semibold min-w-32 hover:bg-indigo-200 text-white bg-indigo-400 rounded-md p-4"
                onClick={handleTeamSettings}
              >
                Settings
              </button>
              <button
                className="text-center font-semibold min-w-32 hover:bg-green-300 text-white bg-green-400 rounded-md p-4"
                onClick={handleMembers}
              >
                Members
              </button>
              <button
                className="text-center font-semibold min-w-32 hover:bg-red-600 bg-red-400 rounded-md p-4 text-white"
                onClick={handleLeave}
              >
                Leave
              </button>
            </div>
          </div>
        )}
        {showConfirmLeave && (
          <ModalUnstyled
            mainData="you are sure you wanna leave"
            secondData="leaving means u will  not be able to access the project again and all ur permissions will be lost "
            onApproval={handleConfirmLeave}
            onDisapproval={() => {
              setShowConfirmLeave(false);
            }}
            type={PopUpType.Failed}
          />
        )}
      </div>
      <TeamMembers setShowMembers={setShowMembers} showMembers={showMembers} />
      <TeamSettings
        setShowTeamSettings={setShowTeamSettings}
        showTeamSettings={showTeamSettings}
      />
    </>
  );
}
