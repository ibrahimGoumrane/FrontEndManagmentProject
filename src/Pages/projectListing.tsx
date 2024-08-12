import { useCallback, useState } from "react";
import ProjectListing from "../components/ProjectComponent/components/projectListings";
import ProjectCreationModal from "../components/ProjectTaskTeamForms/Project/ProjectCreation";
import { Project } from "../models/Projects";
import { useUser } from "../utils/Contexte/UserContext/userContexte";
import Header from "../components/MainNav/Header";

export default function ProjectData() {
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
    <div className="w-screen h-screen overflow-hidden ">
      <Header
        itemLinks={HeaderNavigation}
        setItemLinks={setHeaderNavigation}
        TogglePojectCreation={TogglePojectCreation}
      />
      <ProjectListing />
    </div>
  );
}
