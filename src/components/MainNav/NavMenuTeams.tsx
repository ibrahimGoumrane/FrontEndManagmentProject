import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { Team } from "../../models/Teams";
import { deepPurple } from "@mui/material/colors";
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
  function handleClose() {
    setCreateTeam(false);
  }
  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === "T" && event.shiftKey) {
        setCreateTeam(true);
      }
    });
  }, [setCreateTeam]);

  return (
    <div>
      {createTeam === true ? (
        <TeamDialog open={createTeam} handleClose={handleClose} />
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
              <div className="w-full h-12 flex items-center justify-start ">
                <Avatar
                  alt="Remy Sharp"
                  sx={{
                    bgcolor: deepPurple[500],
                    width: "20px",
                    height: "20px",
                  }}
                  component="div"
                />
              </div>
              <div className="flex items-center justify-center flex-col  ">
                <p className="text-md font-thin font-mono text-black">
                  {team.name}
                </p>
              </div>
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Header>No teams yet</Dropdown.Header>
        )}
        <Dropdown.Divider className="h-0.5 w-full bg-purple-400" />
        <Dropdown.Item>View Details</Dropdown.Item>
        <Dropdown.Item onClick={handleOpen}>Create a Team</Dropdown.Item>
      </Dropdown>
    </div>
  );
}
export default TeamMenuItem;
