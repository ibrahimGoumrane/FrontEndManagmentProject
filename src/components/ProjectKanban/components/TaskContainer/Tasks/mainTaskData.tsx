import { TaskModification } from "../../../../../models/Tasks";
import TaskModifForm from "./TaskModifForm";
interface MainTaskData {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmitSuccessfull: (task: TaskModification) => Promise<void>;
}

const MainTaskData = ({ setEditMode, onSubmitSuccessfull }: MainTaskData) => {
  return (
    <div className="w-[15vw]">
      <div className={"flex items-center justify-center "}>
        <TaskModifForm
          onSubmitSuccessfull={onSubmitSuccessfull}
          setEditMode={setEditMode}
        />
      </div>
    </div>
  );
};
export default MainTaskData;
