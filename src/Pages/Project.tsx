import { useParams } from "react-router-dom";
import MainNav from "../components/MainDashBoard/Navigation";
import ProjectKanBan from "../components/ProjectKanban/mainProjectData";
import { ProjectProvider } from "../utils/Contexte/ProjectContext/Projectcontexteprovider";
const ProjectDashBoard = () => {
  const { id: projectId } = useParams<{ id: string }>();
  return (
    <ProjectProvider projectId={projectId || ""}>
      <main className="flex-col flex max-w-[100vw] max-h-[100vh] overflow-hidden">
        <MainNav />
        <ProjectKanBan />
      </main>
    </ProjectProvider>
  );
};

export default ProjectDashBoard;
