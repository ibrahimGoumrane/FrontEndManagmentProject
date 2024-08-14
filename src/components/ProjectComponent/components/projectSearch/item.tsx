import { getProject } from "../../../../models/Projects";
import { requestJoingProject } from "../../../../network/ProjectApi";
import { formatDateTime } from "../../../../utils/utility";
interface ItemProps {
  project: getProject;
  handleJoinRequest: () => void;
}

const PorjectItem = ({ project, handleJoinRequest }: ItemProps) => {
  const requestToJoinProject = () => {
    async function requesting() {
      handleJoinRequest();
      await requestJoingProject(project.id.toString());
    }
    requesting();
  };
  return (
    <li
      key={project.id}
      className="w-full mx-auto  bg-slate-900 text-white min-h-16 flex items-center justify-between rounded-xl pl-2 font-semibold italic  text-sm "
    >
      <span>{project.name}</span>
      <div>
        <button
          className="text-xs text-bold px-2 py-2 text-nowrap bg-white text-slate-900 rounded-md cursor-pointer hover:bg-slate-100"
          onClick={requestToJoinProject}
        >
          Request To Join
        </button>
      </div>
      <div className="flex flex-col items-start justify-start pr-2">
        <div className="text-xs font-extralight flex flex-col  ">
          <span>CreatedSince : {formatDateTime(project.createdAt)}</span>
          <span>Description : {project.description}</span>
          <span>Owner : {project.ManagerName}</span>
        </div>
      </div>
    </li>
  );
};
export default PorjectItem;
