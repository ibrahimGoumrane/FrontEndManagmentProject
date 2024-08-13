import { getProject } from "../../../../models/Projects";
import Spinner from "../../../utils/spinner";
import PorjectItem from "./item";

interface ProjectProps {
  projects: getProject[];
  showSpinner: boolean;
  query: string;
  showError: boolean;
  handleJoinRequest: () => void;
}

function ProjectContainer({
  projects,
  showSpinner,
  showError,
  query,
  handleJoinRequest,
}: ProjectProps) {
  return (
    <div className="flex-col max-h-[60vh] min-h-[60vh] py-5 overflow-auto overflow-x-hidden">
      <ul className="flex-1 flex flex-col space-y-8">
        {showSpinner && (
          <div className="text-center w-full flex items-center justify-center flex-1">
            <Spinner />
          </div>
        )}
        {!showSpinner &&
          query !== "" &&
          projects.length !== 0 &&
          projects.map((project, index) => (
            <PorjectItem
              key={index}
              project={project}
              handleJoinRequest={handleJoinRequest}
            />
          ))}
        {showError && (
          <li className="text-red-500 text-sm font-semibold text-center">
            No Project found with this name
          </li>
        )}
      </ul>
    </div>
  );
}
export default ProjectContainer;
