import { Dropdown } from "flowbite-react";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import TeamDialog from "../Team/components/teamDialog";
import TeamListing from "../Team/teamListings";
interface teamsProps {
  name: string;
}

export function TeamMenuItem({ name }: teamsProps) {
  const [createTeam, setCreateTeam] = useState(false);
  const [listTeams, setListTeams] = useState(false);
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

        <Dropdown.Divider className="h-0.5 w-full bg-purple-400" />
        <Dropdown.Item onClick={handleOpen}>Create a Team</Dropdown.Item>
        <Dropdown.Item>Join a Team</Dropdown.Item>
        <Dropdown.Item
          className="relative hover:bg-transparent "
          onMouseLeave={() => {
            setListTeams(false);
          }}
        >
          <div
            className="flex items-center justify-between w-full "
            onMouseEnter={() => {
              setListTeams(true);
            }}
          >
            List Teams
            <span className="text-md block translate-y-0.5 font-mono">
              <MdKeyboardArrowRight />
            </span>
          </div>
          {listTeams ? <TeamListing /> : ""}
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}
export default TeamMenuItem;
