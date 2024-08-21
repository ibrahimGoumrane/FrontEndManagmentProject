import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Header/Logo";
import MainChatPage from "../components/Team/components/mainTeam/mainChatPage";
import TeamLogo from "../components/Team/components/mainTeam/teamLogo";
import UserData from "../components/Team/components/mainTeam/UserData";
import { Team, TeamData } from "../models/Teams";
import { getTeamDataById } from "../network/TeamApi";
import { useUser } from "../utils/Contexte/UserContext/userContexte";
interface props {
  teamId: string;
}
function TeamDashboard({ teamId }: props) {
  const { teams } = useUser();
  const navigate = useNavigate();

  //all team data and chats
  const [teamsData, setTeamsData] = useState<TeamData[]>([]);
  const [LocalTeamInfo, setLocalTeamInfo] = useState<Team[]>([]);

  //active team chat
  const [activeTeam, setActiveTeam] = useState<Team>();
  const [activeTeamData, setActiveTeamData] = useState<TeamData>();

  useEffect(() => {
    //check if the user in team
    if (teamId && !teams?.find((t) => +t.id === +teamId)) {
      navigate("/home/teams/search");
    }
  }, [teamId, teams]);

  useEffect(() => {
    if (teamId && LocalTeamInfo && teamsData) {
      setActiveTeam(LocalTeamInfo?.find((t) => +t.id === +teamId));
      setActiveTeamData(teamsData.find((t) => +t.id === +teamId));
    }
  }, [LocalTeamInfo, teamId, teamsData]);

  useEffect(() => {
    async function fetchTeamData() {
      if (teams) {
        const teamDataDb = await Promise.all(
          teams.map(async (userTeam) => {
            return getTeamDataById(+userTeam.id);
          })
        );
        setTeamsData(teamDataDb);

        setLocalTeamInfo(teams);
      } else {
        navigate("*");
      }
    }
    fetchTeamData();
  }, [teams]);

  return (
    teamsData &&
    LocalTeamInfo && (
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <Logo />
            </div>
            <UserData />
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold text-lg">Your Teams</span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                {LocalTeamInfo.map((t) => (
                  <TeamLogo
                    id={t.id}
                    name={t.name}
                    key={t.name}
                    active={teamId && +teamId === +t.id ? true : false}
                    navigate={navigate}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            {activeTeam && activeTeamData && <MainChatPage />}
          </div>
        </div>
      </div>
    )
  );
}
export default TeamDashboard;
