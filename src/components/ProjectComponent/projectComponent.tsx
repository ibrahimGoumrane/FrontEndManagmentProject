import { Project } from "../../models/Projects";
import ProjectCard from "./components/projectCard";
interface ProjectContainerProps {
  projects: Project[] | null;
}

export default function ProjectContainer({ projects }: ProjectContainerProps) {
  return (
    <div className="h-[30vh] flex items-center justify-start w-[90%] mx-auto overflow-y-hidden overflow-x-auto project-container">
      {projects?.length && projects.length > 0 ? (
        projects.slice(0, 4).map((project, index) => (
          <div
            key={index}
            className="min-w-[250px] flex-shrink-0 mr-4 hover:shadow-xl hover:shadow-gray-300 shadow-none duration-300"
          >
            <ProjectCard project={project} />
          </div>
        ))
      ) : (
        <div className="gap-10 flex-col flex items-center justify-center font-serif w-full text-center">
          <div className="text-sm font-light">Start by creating a project</div>
        </div>
      )}
    </div>
  );
}
