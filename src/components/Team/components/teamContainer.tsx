import { useEffect, useState } from "react";
import { Team, TeamData } from "../../../models/Teams";
import { getTeamDataById } from "../../../network/TeamApi";
import Spinner from "../../utils/spinner";
import TeamItem from "./teamItem";
interface teamProps {
  teams: Team[];
  setShowSpinner: React.Dispatch<React.SetStateAction<boolean>>;
  showSpinner: boolean;
  query: string;
}

function TeamContainer({
  teams,
  showSpinner,
  setShowSpinner,
  query,
}: teamProps) {
  const [ShownTeams, setShownTeams] = useState<TeamData[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      const teamData = await Promise.all(
        teams.map((team) => getTeamDataById(+team.id))
      );
      console.log(teamData);
      setShownTeams(teamData);
      setShowSpinner(false);
      console.log(teamData);
      if (teamData.length === 0) {
        setShowError(true);
      }
    }
    fetchData();
  }, [teams]);
  return (
    <div className="flex-col max-h-[60vh] py-5">
      <ul className="flex-1 flex flex-col space-y-8">
        {showSpinner ? (
          <div className="text-center w-full flex items-center justify-center flex-1">
            <Spinner />
          </div>
        ) : query !== "" ? (
          ShownTeams.length !== 0 ? (
            ShownTeams.map((team) => <TeamItem team={team} />)
          ) : showError ? (
            <li className="text-red-500 text-sm font-semibold text-center">
              No teams found with this name
            </li>
          ) : (
            <li></li>
          )
        ) : (
          <li></li>
        )}
      </ul>
    </div>
  );
}
export default TeamContainer;
