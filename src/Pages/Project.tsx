import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/MainNav/Header";
import ProjectKanBan from "../components/ProjectKanban/mainProjectData";
import { ProjectProvider } from "../utils/Contexte/ProjectContext/Projectcontexteprovider";
import { useUser } from "../utils/Contexte/UserContext/userContexte";
import ProjectCreationBase from "../components/ProjectTaskTeamForms/Project/ProjectCreationBase";

const ProjectDashBoard = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects } = useUser();
  //check whether the user is allowed to access this page
  useEffect(() => {
    const exsists = projects?.findIndex(
      (project) => project.id && +project.id === +(projectId ?? "")
    );
    if (exsists === -1) {
      navigate("*");
    }
  });
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
  const [showProjectCreation, setShowProjectCreation] = useState(false);
  return (
    <ProjectProvider projectId={projectId || ""}>
      <main className="flex-col flex max-w-[100vw] max-h-[100vh] overflow-hidden">
        {showProjectCreation && (
          <ProjectCreationBase
            showProjectCreation={showProjectCreation}
            setShowProjectCreation={setShowProjectCreation}
          />
        )}
        <Header
          itemLinks={HeaderNavigation}
          setItemLinks={setHeaderNavigation}
          TogglePojectCreation={() =>
            setShowProjectCreation(!showProjectCreation)
          }
        />
        <ProjectKanBan
          TogglePojectCreation={() =>
            setShowProjectCreation(!showProjectCreation)
          }
        />
      </main>
    </ProjectProvider>
  );
};

export default ProjectDashBoard;
