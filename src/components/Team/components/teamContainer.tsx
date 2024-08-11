import { TeamData } from "../../../models/Teams";
import Spinner from "../../utils/spinner";
import TeamItem from "./teamItem";
interface teamProps {
  teams: TeamData[];
  showSpinner: boolean;
  query: string;
  showError: boolean;
  handleJoinRequest: () => void;
}

function TeamContainer({
  teams,
  showSpinner,
  showError,
  query,
  handleJoinRequest,
}: teamProps) {
  return (
    <div className="flex-col max-h-[60vh] py-5">
      <ul className="flex-1 flex flex-col space-y-8">
        {showSpinner && (
          <div className="text-center w-full flex items-center justify-center flex-1">
            <Spinner />
          </div>
        )}
        {!showSpinner && query !== "" &&
          teams.length !== 0 &&
          teams.map((team, index) => (
            <TeamItem
              key={index}
              team={team}
              handleJoinRequest={handleJoinRequest}
            />
          ))}
        {showError && (
          <li className="text-red-500 text-sm font-semibold text-center">
            No teams found with this name
          </li>
        )}
      </ul>
    </div>
  );
}
export default TeamContainer;
