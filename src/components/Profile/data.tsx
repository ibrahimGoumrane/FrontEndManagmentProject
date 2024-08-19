import { useUser } from "../../utils/Contexte/UserContext/userContexte";

const Data = () => {
  const { teams, activeTasks, projects } = useUser();

  return (
    <div className="w-full lg:w-4/12 px-4 lg:order-1 flex items-center justify-center xl:justify-start">
      <div className="flex justify-center py-4 lg:pt-4 pt-8">
        <div className="mr-4 p-3 text-center">
          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
            {teams?.length}
          </span>
          <span className="text-sm text-blueGray-400">Teams</span>
        </div>
        <div className="mr-4 p-3 text-center">
          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
            {activeTasks?.created.length}
          </span>
          <span className="text-sm text-blueGray-400">Created Task's</span>
        </div>
        <div className="mr-4 p-3 text-center">
          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
            {activeTasks?.assigned.length}
          </span>
          <span className="text-sm text-blueGray-400">Asigned Task's</span>
        </div>
        <div className="lg:mr-4 p-3 text-center">
          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
            {projects?.length}
          </span>
          <span className="text-sm text-blueGray-400  ">Projects</span>
        </div>
      </div>
    </div>
  );
};

export default Data;
