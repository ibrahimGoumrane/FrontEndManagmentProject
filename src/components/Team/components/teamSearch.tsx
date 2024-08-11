import { useState } from "react";
import { TeamData } from "../../../models/Teams";
import { searchTeam } from "../../../network/TeamApi";
import { Button } from "@mui/material";
import TeamContainer from "./teamContainer";
import { getTeamDataById } from "../../../network/TeamApi";
import PopUp from "../../utils/popUp";
import { PopUpType } from "../../../models/utils";
import { useNavigate } from "react-router-dom";

const fixedInputClass =
  "rounded-md appearance-none  relative block w-full px-3 py-2  rounded h-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";
function TeamSearch() {
  const [query, setQuery] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const [teams, setTeams] = useState<TeamData[]>([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showError, setShowError] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }
  function handleJoinRequest() {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
    setTimeout(() => {
      setShowSuccess(true);
    }, 1000);
    setTimeout(() => {
      navigate("/home/");
    }, 3000);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSpinner(true); // Show spinner when the search starts

    async function lookForTeams() {
      try {
        const FoundedTeams = await searchTeam(query);
        const teamData = await Promise.all(
          FoundedTeams.map((team) => getTeamDataById(+team.id))
        );
        setTeams(teamData || []);
        setShowSpinner(false);
        if (teamData.length === 0) {
          setShowError(true);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        setTeams([]);
      }
    }

    lookForTeams();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2  mx-auto mt-2 border-2 border-slate-900/50 p-2 flex-1 flex flex-col"
    >
      {showSuccess && (
        <PopUp
          type={PopUpType.Success}
          message="Your Request has been submited You will be informed by email the result of your request."
          setSuccess={setShowSuccess}
          duration={4000}
        />
      )}
      <div className="mb-5 w-full h-16 flex items-center justify-center  ">
        <input
          id="teamSearch"
          type="text"
          placeholder="Start by typing the team name"
          onChange={handleChange}
          value={query}
          className={`${fixedInputClass} `}
        />
        <Button
          sx={{
            bgcolor: "#0f172a",
            "&:hover": {
              bgcolor: "#1e293b",
            },
          }}
          type="submit"
          variant="contained"
        >
          Search
        </Button>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto ">
        {!showSuccess && (
          <TeamContainer
            showSpinner={showSpinner}
            teams={teams}
            query={query}
            handleJoinRequest={handleJoinRequest}
            showError={showError}
          />
        )}
      </div>
    </form>
  );
}
export default TeamSearch;
