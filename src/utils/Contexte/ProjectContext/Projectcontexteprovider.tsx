import React, { ReactNode, useCallback, useEffect, useState } from "react";
import {
  ActivityMap,
  MEMBERACTIVITYTYPE,
  TASKACTIVITYTYPE,
} from "../../../models/activity";
import { autorisationModel } from "../../../models/auth";
import { Project, ProjectModif } from "../../../models/Projects";
import { ProjectStatus, TaskStatus } from "../../../models/Status";
import { Id, Task } from "../../../models/Tasks";
import { getProjectAuth } from "../../../network/authApi";
import {
  getActivities,
  getProjectData,
  getProjectImg,
  getProjectMembers,
  getProjectState,
  updateProject as saveProjectData,
  updateProjectPic,
} from "../../../network/ProjectApi";
import {
  createTaskStatus,
  deleteTaskStatus,
  getProjectStatus,
  getTaskStatus,
  updateTaskStatus as updateTaskS,
} from "../../../network/StatusApi";
import {
  createTask as createT,
  deleteTasks,
  getActiveUserTasks,
  getProjectTasks,
  updateTask as updateT,
} from "../../../network/TasksApi";
import { useUser } from "../UserContext/userContexte";
import { ProjectContext } from "./projectContexte";
import { useNavigate } from "react-router-dom";

interface ProjectProviderProps {
  projectId: Id;
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  projectId,
  children,
}) => {
  const { projects, updateProjects, updateActiveTasks, user, activeTasks } =
    useUser();
  //State defintions
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTask] = useState<Task[]>([]);
  const [activity, setActivity] = useState<ActivityMap>();
  const [projectStatus, setProjectStatus] = useState<ProjectStatus[]>([]);
  const [projectImg, setProjectImg] = useState<string>("");
  const [projectState, setProjectState] = useState<ProjectStatus | null>(null);
  const [members, setMembers] = useState<autorisationModel[]>([]);
  const [taskStatus, setTaskStatus] = useState<TaskStatus[]>([]);
  // State Manipulations
  const updateProject = useCallback(
    async (newProject: ProjectModif | null) => {
      if (newProject) {
        const savedProjectData: Project = {
          ...project,
          ...newProject,
          endDate: newProject.endDate?.toISOString(),
        };
        const Project = await saveProjectData(savedProjectData);
        setProject(Project);
        updateProjects(
          projects?.map((p) => (p.id === +projectId ? Project : p)) || [Project]
        );
      } else {
        updateProjects(
          projects?.slice()?.filter((pro) => {
            return pro?.id?.toString() !== projectId.toString();
          }) ?? []
        );
        setProject(null);
      }
    },
    [project, projectId, projects, updateProjects]
  );
  const createTask = useCallback(
    async (newTask: Task) => {
      if (!newTask.name) {
        throw new Error("Task name is required");
      }

      const newT = await createT(
        newTask.name,
        projectId,
        newTask.statusId ?? "1",
        newTask.description ?? "Description"
      );
      const newTasks = [...tasks, newT];
      setTask(newTasks);
    },
    [projectId, tasks]
  );
  const deleteTask = useCallback(
    async (newTaskId: string) => {
      await deleteTasks(newTaskId, projectId);
      const newTasks = tasks.filter((task) => +task.id !== +newTaskId);
      setTask(newTasks);
    },
    [projectId, tasks]
  );
  const updateTask = useCallback(
    async (taskId: number, newTask: Task, saveTodb: boolean = true) => {
      let updatedTask = newTask;
      if (saveTodb) {
        updatedTask = await updateT(
          {
            ...newTask,
            id: taskId,
          },
          projectId.toString()
        );
      }
      const newTasks = tasks.map((task) => {
        if (+task.id === +taskId) {
          return updatedTask;
        }
        return task;
      });
      setTask(newTasks);
    },
    [projectId, tasks]
  );
  const createStatus = useCallback(
    async (newTaskStatus: TaskStatus) => {
      const newStatus = await createTaskStatus(newTaskStatus.name, projectId);
      const newTaskStatuses = [...taskStatus, newStatus];
      setTaskStatus(newTaskStatuses);
    },
    [projectId, taskStatus]
  );
  const updateStatus = useCallback(
    async (statusId: number, Status: TaskStatus) => {
      const updatedStaus = await updateTaskS(projectId, Status);
      const newTaskStatuses = taskStatus.map((status) => {
        if (+status.id === +statusId) {
          return updatedStaus;
        }
        return status;
      });
      setTaskStatus(newTaskStatuses);
    },
    [projectId, taskStatus]
  );
  const deleteStatus = useCallback(
    async (newStatusId: string) => {
      await deleteTaskStatus(newStatusId, projectId);
      const newTaskStatuses = taskStatus.filter(
        (status) => +status.id !== +newStatusId
      );
      setTaskStatus(newTaskStatuses);
    },
    [projectId, taskStatus]
  );
  function updateUserContext(projectId: string) {
    // remove project from user projects
    const newProjects =
      projects?.filter((proj) => proj?.id?.toString() !== projectId) || [];
    updateProjects(newProjects);
    //remove tasks from user tasks
    const newAssigneedTasks =
      activeTasks?.assigned.filter(
        (task) => task?.projectId?.toString() !== projectId
      ) || [];
    const newCreatedTasks =
      activeTasks?.created.filter(
        (task) => task?.projectId?.toString() !== projectId
      ) || [];
    updateActiveTasks({
      assigned: newAssigneedTasks,
      created: newCreatedTasks,
    });
  }
  const updateMembers = useCallback(
    async (newMembers: autorisationModel[], projectId: string) => {
      const savedMembers = newMembers;
      const isExsist = savedMembers.findIndex((member) => {
        return member.id.toString() === user?.id.toString();
      });
      if (isExsist === -1) {
        updateUserContext(projectId);
      } else {
        updateProjects(
          projects?.map((project) => {
            if (+projectId === project.id) {
              return { ...project, members: savedMembers };
            }
            return project;
          }) || []
        );
        setMembers(savedMembers);
      }
    },
    [projectId]
  );

  const updatePicture = useCallback(
    async (newPicture: FileList) => {
      const formData = new FormData();
      formData.append("projectImg", newPicture[0]);
      const response = await updateProjectPic(formData, projectId.toString());
      setProjectImg(response);
      //need to update the image in project context provider
      if (projects) {
        const newProjects = projects?.map((project) => {
          if (project.id && +project.id === +projectId) {
            return { ...project, projectImage: response };
          }
          return project;
        });
        updateProjects(newProjects);
      }
    },
    [projectId, projects, updateProjects]
  );
  const updateProjectState = useCallback(
    async (newProjectState: ProjectStatus | null) => {
      setProjectState(newProjectState);
      if (newProjectState?.name === "") {
        const newProjectStatus = projectStatus.find(
          (status) => status.id == newProjectState.id
        );
        setProjectState(newProjectStatus || null);
      } else if (newProjectState) {
        setProjectState(newProjectState);
      }
    },
    [projectId, projectStatus]
  );

  // Fetching data from DB -> FrontEnd
  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    async function fetchNewUserTasks() {
      const userTasksData = await getActiveUserTasks();
      updateActiveTasks(userTasksData);
    }
    fetchNewUserTasks();
  }, [user, updateActiveTasks]);

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    async function fetchProject() {
      try {
        const projectData: Project = await getProjectData(projectId);
        setProject(projectData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProject();
  }, [projectId, user]);
  //Fetching Project Image
  useEffect(() => {
    if (!user) {
      return navigate("/");
    }

    async function fetchProjectImg() {
      try {
        const projectData = await getProjectImg(projectId);
        setProjectImg(projectData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProjectImg();
  }, [projectId, user]);
  //FETCHING PROJECT ACTIVITY
  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    async function fetchProjectActivity() {
      try {
        const [
          createActivity,
          deleteActivity,
          updateActivity,
          joinActivity,
          leaveActivity,
        ] = await Promise.all([
          getActivities(projectId, TASKACTIVITYTYPE.CREATE),
          getActivities(projectId, TASKACTIVITYTYPE.DELETE),
          getActivities(projectId, TASKACTIVITYTYPE.UPDATE),
          getActivities(projectId, MEMBERACTIVITYTYPE.JOIN),
          getActivities(projectId, MEMBERACTIVITYTYPE.LEAVE),
        ]);

        const activityData: ActivityMap = {
          [TASKACTIVITYTYPE.CREATE]: createActivity,
          [TASKACTIVITYTYPE.DELETE]: deleteActivity,
          [TASKACTIVITYTYPE.UPDATE]: updateActivity,
          [MEMBERACTIVITYTYPE.JOIN]: joinActivity,
          [MEMBERACTIVITYTYPE.LEAVE]: leaveActivity,
        };
        setActivity(activityData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjectActivity();
  }, [projectId, user]);

  // Fetching Tasks
  useEffect(() => {
    if (!user) {
      return navigate("/");
    }

    async function fetchTasks() {
      const tasksData = await getProjectTasks(projectId);
      setTask(tasksData);
    }
    fetchTasks();
  }, [projectId, user]);

  // Fetching Project Status
  useEffect(() => {
    if (!user) {
      return navigate("/");
    }

    async function fetchProjectStatus() {
      const statusData = await getProjectStatus();
      setProjectStatus(statusData);
    }
    fetchProjectStatus();
  }, [user]);

  // Fetching Project State
  useEffect(() => {
    if (!user) {
      return navigate("/");
    }

    async function fetchProjectState() {
      const stateData = await getProjectState(projectId);
      setProjectState(stateData);
    }
    fetchProjectState();
  }, [projectId, user]);

  // Fetching Members
  useEffect(() => {
    async function fetchMembers() {
      if (!user) {
        return navigate("/");
      }

      const membersData = await getProjectMembers(projectId);
      const fetchMembersAuth = await Promise.all(
        membersData.map(async (user) => {
          return await getProjectAuth(user.id, projectId.toString());
        })
      );
      setMembers(fetchMembersAuth);
    }
    fetchMembers();
  }, [projectId, user]);

  // Fetching Task Status
  useEffect(() => {
    if (!user) {
      return navigate("/");
    }

    async function fetchTaskStatus() {
      const statusData = await getTaskStatus(projectId);
      setTaskStatus(statusData);
    }
    fetchTaskStatus();
  }, [projectId, user]);
  return (
    <ProjectContext.Provider
      value={{
        project,
        activity,
        updatePicture,
        tasks,
        projectStatus,
        projectState,
        members,
        taskStatus,
        projectImg,
        createTask,
        deleteTask,
        updateTask,
        createStatus,
        deleteStatus,
        updateStatus,
        updateProject,
        updateMembers,
        updateProjectState,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
