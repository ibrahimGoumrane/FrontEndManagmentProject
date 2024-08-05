import { IoIosArrowDown } from "react-icons/io";
import { Task, TaskModification } from "../../../../../models/Tasks";
import TaskModifForm from "./TaskModifForm";
interface MainTaskData {
  taskState: Task;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  showTaskModif: boolean;
  ToggleShowModif: () => void;
  onSubmitSuccessfull: (task: TaskModification) => void;
}

const MainTaskData = ({
  taskState,
  setEditMode,
  showTaskModif,
  ToggleShowModif,
  onSubmitSuccessfull,
}: MainTaskData) => {
  return (
    <div className={`rounded-xl w-3/4 mt-3`}>
      <div
        className="flex justify-between items-center w-full bg-white h-30 rounded-md px-4 py-3 mb-2"
        onClick={ToggleShowModif}
      >
        <div className="text-xl  italic capitalize text-purple-400 text-left font-mono ">
          UpdateTask
        </div>
        <div
          className={`text-purple-400 font-extrabold text-2xl ${
            showTaskModif ? "rotate-0" : "-rotate-180"
          }   duration-150 transition-all`}
        >
          <IoIosArrowDown />
        </div>
      </div>
      <div
        className={
          showTaskModif
            ? "flex items-center justify-center "
            : "invisible flex items-center justify-center "
        }
      >
        <TaskModifForm
          task={taskState}
          onSubmitSuccessfull={onSubmitSuccessfull}
          onTaskModifError={() => {}}
          setEditMode={setEditMode}
        />
      </div>
    </div>
  );
};
export default MainTaskData;
