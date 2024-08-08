import { Dropdown } from "flowbite-react";
import { useState } from "react";
import { Team } from "../../models/Teams";
import { MdKeyboardArrowDown } from "react-icons/md";
import TeamDialog from "../Team/components/teamDialog";

interface teamsProps {
  teams: Team[] | null;
  name: string;
}

export function TeamMenuItem({ teams, name }: teamsProps) {
  const [createTeam, setCreateTeam] = useState(false);
  function handleOpen() {
    setCreateTeam(true);
  }

  return (
    <div>
      {createTeam === true ? (
        <TeamDialog open={createTeam} setCreateTeam={setCreateTeam} />
      ) : (
        ""
      )}
      <Dropdown
        label={
          <span className="text-purple-700 text-xl font-mono font-bold inline-flex items-center justify-center gap-1 capitalize focus:border-purple-500 focus:outline-none">
            {name} <MdKeyboardArrowDown />
          </span>
        }
      >
        <Dropdown.Header className="border-b-2 border-purple-400 ">
          Your Teams
        </Dropdown.Header>
        <Dropdown.Divider />
        {teams?.length !== 0 ? (
          teams?.slice(0, 3).map((team, index) => (
            <Dropdown.Item key={index} id={`${team.id}`}>
              T1 :
              <p className=" ml-2 text-sm font-thin font-mono text-black">
                {team.name}
              </p>
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Header>No teams yet</Dropdown.Header>
        )}
        <Dropdown.Divider className="h-0.5 w-full bg-purple-400" />
        <Dropdown.Item onClick={handleOpen}>Create a Team</Dropdown.Item>
        <Dropdown.Item>Join a Team</Dropdown.Item>
        <Dropdown.Item>Your Teams</Dropdown.Item>
      </Dropdown>
    </div>
  );
}
export default TeamMenuItem;
