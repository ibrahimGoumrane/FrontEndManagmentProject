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
      <div className="fixed top-0 left-0 h-screen w-[100vw] bg-purple-200  flex items-center  justify-center z-20 mx-0 ">
        <div className="bg-white rounded flex items-start justify-start w-2/3">
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
