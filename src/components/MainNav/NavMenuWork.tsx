/* eslint-disable no-unsafe-optional-chaining */
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Dropdown } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Task } from "../../models/Tasks";

interface WorkProps {
  tasks: {
    assigned?: Task[];
    created: Task[];
  } | null;
  name: string;
}

function MenuWork({ tasks, name }: WorkProps) {
  const navigate = useNavigate();
  const [activeTasks, setActiveTasks] = useState(tasks);
  const shownTasks = useMemo(() => {
    const ShownTasks = [];
    if (activeTasks?.assigned && activeTasks?.assigned?.length >= 3) {
      ShownTasks.push(...activeTasks?.assigned.slice(0, 3));
    } else if (activeTasks?.created && activeTasks?.created?.length >= 3) {
      ShownTasks.push(...activeTasks?.created.slice(0, 3));
    } else {
      if (activeTasks?.assigned) {
        ShownTasks.push(...activeTasks?.assigned);
      }
    }
    return ShownTasks;
  }, [activeTasks]);
  useEffect(() => {
    setActiveTasks(tasks);
  }, [tasks]);

  return (
    <Dropdown
      label={
        <span className="text-purple-700 text-xl font-mono font-bold inline-flex items-center justify-center gap-1 capitalize focus:border-purple-500 focus:outline-none">
          {name} <MdKeyboardArrowDown />
        </span>
      }
    >
      <Dropdown.Header className="border-b-2 border-purple-400">
        Your Work
      </Dropdown.Header>
      <Dropdown.Divider />
      {shownTasks && shownTasks?.length !== 0 ? (
        shownTasks?.map((task, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => navigate(`/home/project/tasks/${task?.id}`)}
          >
            <div className="w-full flex items-center justify-start">
              <Avatar
                alt="Task Avatar"
                sx={{
                  bgcolor: deepPurple[500],
                  width: 24,
                  height: 24,
                }}
              />
              <span className="ml-2">{task.name}</span>
            </div>
          </Dropdown.Item>
        ))
      ) : (
        <Dropdown.Header className=" border-purple-400 font-sans text-xs text-purple-900">
          All Done! Continue ;)
        </Dropdown.Header>
      )}
      <Dropdown.Divider className="h-0.5 w-full bg-purple-400" />
      <Dropdown.Item
        onClick={() => {
          navigate("/home/project/tasks");
        }}
      >
        View Details
      </Dropdown.Item>
      <Dropdown.Item onClick={() => navigate("/home")}>
        Go to Your Work Page
      </Dropdown.Item>
    </Dropdown>
  );
}

export default MenuWork;
