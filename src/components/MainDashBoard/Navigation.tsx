import { useState } from "react";
import Header from "../MainNav/Header";
import SecondNav from "../SecondNav/SecondNav";
import ProjectCreationModal from "../ProjectTaskTeamForms/Project/ProjectCreation";
import { Project } from "../../models/Projects";
import { useCallback } from "react";
import { useUser } from "../../utils/Contexte/UserContext/userContexte";

const MainNav = () => {
  const [HeaderNavigation, setHeaderNavigation] = useState([
    {
      name: "tasks",
      active: false,
      href: "/",
      type: "complexe",
    },
    {
      name: "projects",
      active: false,
      href: "/about",
      type: "complexe",
    },
    {
      name: "teams",
      active: false,
      href: "/services",
      type: "complexe",
    },
  ]);
  const { updateProjects, projects } = useUser();
  const [showProjectCreation, setShowProjectCreation] = useState(false);

  const TogglePojectCreation = useCallback(() => {
    setShowProjectCreation(!showProjectCreation);
  }, [showProjectCreation]);
  const onCreatedSuccessfully = (project: Project) => {
    if (projects) updateProjects([...projects, project]);
    else updateProjects([project]);
    TogglePojectCreation();
  };

  if (showProjectCreation) {
    return (
      <div className="fixed top-0 -left-20 h-screen w-[110vw] bg-purple-400/60  flex items-start pt-10 justify-center z-20 mx-0 ">
        <div className="bg-white rounded flex items-start justify-start">
          <ProjectCreationModal
            onCreatedSuccessfully={onCreatedSuccessfully}
            onCancelCreation={TogglePojectCreation}
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <Header
        itemLinks={HeaderNavigation}
        setItemLinks={setHeaderNavigation}
        TogglePojectCreation={TogglePojectCreation}
      />
      <SecondNav TogglePojectCreation={TogglePojectCreation} />
    </>
  );
};

export default MainNav;
