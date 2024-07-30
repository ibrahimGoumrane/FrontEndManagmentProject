import { useUser } from "../../utils/Contexte/UserContext/userContexte";
import NavMenuProject from "./NavMenuProject";
import NavMenuTeams from "./NavMenuTeams";
import NavMenuWork from "./NavMenuWork";

export interface NavItemProps {
  name: string;
  TogglePojectCreation: () => void;
}

const NavItemComplex = ({ name , TogglePojectCreation}: NavItemProps) => {
  const { activeTasks, teams } = useUser();

  return (
    <>
      {name === "tasks" && <NavMenuWork tasks={activeTasks} name={name} />}
      {name === "projects" && (
        <NavMenuProject name={name} TogglePojectCreation={TogglePojectCreation} />
      )}
      {name === "teams" && <NavMenuTeams teams={teams} name={name} />}
    </>
  );
};

export default NavItemComplex;
