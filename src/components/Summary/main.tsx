import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Task } from "../../models/Tasks";

import { BiCheck } from "react-icons/bi";
import { FaCalendar } from "react-icons/fa";
import { useProject } from "../../utils/Contexte/ProjectContext/projectContexte.ts";
import ActivityFeed from "./components/activityFeed.tsx";
import DataCard from "./components/dataCard.tsx";
import DataChart from "./components/dataChart.tsx";

const Summary = () => {
  const { tasks, taskStatus } = useProject();
  const [createdTasks, setCreatedTasks] = useState<Task[]>([]);
  const [updatedTasks, setupdatedTasks] = useState<Task[]>([]);
  const [dueNextWeek, setdueNextWeek] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  useEffect(() => {
    const isWithinLastWeek = (date: string): boolean => {
      const currentDate = new Date(date).getTime();
      const today = new Date();
      const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const targetDate = new Date(currentDate);
      return targetDate >= sevenDaysAgo && targetDate <= today;
    };
    const isWithiNextWeek = (date: string): boolean => {
      const currentDate = new Date(date).getTime();
      const today = new Date();
      const sevenDaysAgo = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const targetDate = new Date(currentDate);
      return targetDate >= today && targetDate <= sevenDaysAgo;
    };

    setCreatedTasks(
      tasks.filter((task) => task.createdAt && isWithinLastWeek(task.createdAt))
    );
    setupdatedTasks(
      tasks.filter((task) => task.updatedAt && isWithinLastWeek(task.updatedAt))
    );
    setdueNextWeek(
      tasks.filter((task) => task.endDate && isWithiNextWeek(task.endDate))
    );
    setDoneTasks(
      tasks.filter(
        (task) => task.statusId && +task.statusId === +taskStatus[6].id
      )
    );
  }, [tasks]);

  return (
    <div className="flex items-center justify-start max-w-[70vw] min-h-[70vh] rounded-md mx-auto  text-sm text-slate-900 font-semibold bg-white flex-col">
      <div className="flex items-center justify-start gap-10 mt-10">
        <DataCard icons={<BiCheck />} title="done" number={doneTasks.length} />

        <DataCard
          icons={<IoMdAdd />}
          title="created"
          number={createdTasks.length}
        />
        <DataCard
          icons={<MdEdit />}
          title="updated"
          number={updatedTasks.length}
        />
        <DataCard
          icons={<FaCalendar />}
          title="due"
          number={dueNextWeek.length}
          date={"next"}
        />
      </div>
      <div className="grid grid-cols-2  flex-1 w-[90%] h-full gap-5 mx-auto">
        <div className="flex items-start flex-1 justify-start flex-col border-2 border-slate-600/20  rounded-xl bg-purple-100 my-5 p-4">
          <div className="flex items-start flex-col gap-2 ">
            <span className="text-2xl font-bold">Status Overview</span>
            <span className="text-sm font-sm italic text-slate-900">
              Get an overview of your project progression
            </span>
          </div>

          <DataChart tasks={tasks} />
        </div>
        <div className="flex items-start flex-1 justify-start flex-col border-2 border-slate-600/20  rounded-xl bg-purple-100 my-5 p-4">
          <div className="flex items-start flex-col gap-2 ">
            <span className="text-2xl font-bold">Project Activity</span>
            <span className="text-sm font-sm italic text-slate-900">
              Stay up to date with what's happening across the project.
            </span>
          </div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};
export default Summary;
