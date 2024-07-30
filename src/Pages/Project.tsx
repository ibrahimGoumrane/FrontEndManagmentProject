import { useParams } from "react-router-dom";
import MainNav from "../components/MainDashBoard/Navigation";
import ProjectKanBan from "../components/ProjectKanban/main";
import { ProjectProvider } from "../utils/Contexte/ProjectContext/Projectcontexteprovider";
const ProjectDashBoard = () => {
  const { id: projectId } = useParams<{ id: string }>();
  return (
    <ProjectProvider projectId={projectId || ""}>
      <MainNav />
      <ProjectKanBan />
    </ProjectProvider>
  );
};

export default ProjectDashBoard;
