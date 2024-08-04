import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectKanBan from "../components/ProjectKanban/mainProjectData";
import { ProjectProvider } from "../utils/Contexte/ProjectContext/Projectcontexteprovider";
import { useUser } from "../utils/Contexte/UserContext/userContexte";
import { Project } from "../models/Projects";
import ProjectCreationModal from "../components/ProjectTaskTeamForms/Project/ProjectCreation";
import Header from "../components/MainNav/Header";

const ProjectDashBoard = () => {
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
  const { id: projectId } = useParams<{ id: string }>();

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
    <ProjectProvider projectId={projectId || ""}>
      <main className="flex-col flex max-w-[100vw] max-h-[100vh] overflow-hidden">
        <Header
          itemLinks={HeaderNavigation}
          setItemLinks={setHeaderNavigation}
          TogglePojectCreation={TogglePojectCreation}
        />
        <ProjectKanBan TogglePojectCreation={TogglePojectCreation} />
      </main>
    </ProjectProvider>
  );
};

export default ProjectDashBoard;
