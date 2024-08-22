import { FaListUl } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import TeamMembers from "./teamMembers";
import TeamSettings from "./teamSettings";

export default function Settings() {
  const [showSettings, setShowSettings] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showTeamSettings, setShowTeamSettings] = useState(false);
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
  }
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
      </div>
      <TeamMembers setShowMembers={setShowMembers} showMembers={showMembers} />
      <TeamSettings
        setShowTeamSettings={setShowTeamSettings}
        showTeamSettings={showTeamSettings}
      />
    </>
  );
}
