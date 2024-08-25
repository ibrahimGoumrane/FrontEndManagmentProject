import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Project, ProjectModif } from "../../../models/Projects";
import { ProjectStatus, TaskStatus } from "../../../models/Status";
import { Id, Task } from "../../../models/Tasks";
import {
  getActivities,
  getProjectData,
  getProjectImg,
  getProjectMembers,
  getProjectState,
  updateProject as saveProjectData,
  updateProjectMembers,
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
  deleteTasks,
  createTask as createT,
  getProjectTasks,
  getActiveUserTasks,
  updateTask as updateT,
} from "../../../network/TasksApi";
import { ProjectContext } from "./projectContexte";
import { clearLocalStorage } from "./utils/utilities";
import { useUser } from "../UserContext/userContexte";
import { getProjectAuth } from "../../../network/authApi";
import { autorisationModel } from "../../../models/auth";
import {
  ActivityMap,
  TASKACTIVITYTYPE,
  MEMBERACTIVITYTYPE,
} from "../../../models/activity";

interface ProjectProviderProps {
  projectId: Id;
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  projectId,
  children,
}) => {
  const { projects, updateProjects, updateActiveTasks, user } = useUser();

  const [project, setProject] = useState<Project | null>(() => {
    const projectData = localStorage.getItem(`project${projectId}`);
    return projectData ? JSON.parse(projectData) : null;
  });

  const [tasks, setTask] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(`tasks${projectId}`);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [activity, setActivity] = useState<ActivityMap>();
  const [projectStatus, setProjectStatus] = useState<ProjectStatus[]>(() => {
    const savedTasks = localStorage.getItem("projectStatus");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [projectImg, setProjectImg] = useState<string>(() => {
    const savedTasks = localStorage.getItem("projectImg${projectId}");
    return savedTasks ? JSON.parse(savedTasks) : "";
  });
  const [projectState, setProjectState] = useState<ProjectStatus | null>(() => {
    const projectState = localStorage.getItem(`projectState${projectId}`);
    return projectState ? JSON.parse(projectState) : null;
  });
  const [members, setMembers] = useState<autorisationModel[]>(() => {
    const savedMembers = localStorage.getItem(`members${projectId}`);
    return savedMembers ? JSON.parse(savedMembers) : [];
  });
  const [taskStatus, setTaskStatus] = useState<TaskStatus[]>(() => {
    const savedTasks = localStorage.getItem(`taskStatus${projectId}`);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

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
        localStorage.setItem(`project${projectId}`, JSON.stringify(Project));
        setProject(Project);
        updateProjects(
          projects?.map((p) => (p.id === +projectId ? Project : p)) || [
            Project,
          ],
          false
        );
      } else {
        localStorage.removeItem(`project${projectId}`);
        updateProjects(
          projects?.slice()?.filter((pro) => {
            return pro?.id !== project?.id;
          }) ?? [],
          false
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
      localStorage.setItem(`tasks${projectId}`, JSON.stringify(newTasks));
    },
    [projectId, tasks]
  );
  const deleteTask = useCallback(
    async (newTaskId: string) => {
      await deleteTasks(newTaskId, projectId);
      const newTasks = tasks.filter((task) => +task.id !== +newTaskId);
      setTask(newTasks);
      localStorage.setItem(`tasks${projectId}`, JSON.stringify(newTasks));
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
      localStorage.setItem(`tasks${projectId}`, JSON.stringify(newTasks));
    },
    [projectId, tasks]
  );
  const createStatus = useCallback(
    async (newTaskStatus: TaskStatus) => {
      const newStatus = await createTaskStatus(newTaskStatus.name, projectId);
      const newTaskStatuses = [...taskStatus, newStatus];
      setTaskStatus(newTaskStatuses);
      localStorage.setItem(
        `taskStatus${projectId}`,
        JSON.stringify(newTaskStatuses)
      );
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
      localStorage.setItem(
        `taskStatus${projectId}`,
        JSON.stringify(newTaskStatuses)
      );
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
      localStorage.setItem(
        `taskStatus${projectId}`,
        JSON.stringify(newTaskStatuses)
      );
    },
    [projectId, taskStatus]
  );
  const updateMembers = useCallback(
    async (newMembers: autorisationModel[], saveTodb: boolean = true) => {
      let savedMembers = newMembers;
      if (saveTodb) {
        savedMembers = await updateProjectMembers(projectId, newMembers);
      }
      const isExsist = savedMembers.findIndex((member) => {
        return member.id.toString() === user?.id.toString();
      });
      if (isExsist === -1) {
        resetData();
        updateProjects(
          projects?.filter(
            (project) => project.id?.toString() !== projectId.toString()
          ) || []
        );
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
        localStorage.setItem(
          `members${projectId}`,
          JSON.stringify(savedMembers)
        );
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
      localStorage.setItem(`projectImg${projectId}`, JSON.stringify(response));
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
        localStorage.setItem(
          `projectState${projectId}`,
          JSON.stringify(newProjectStatus)
        );
      } else if (newProjectState) {
        setProjectState(newProjectState);
        localStorage.setItem(
          `projectState${projectId}`,
          JSON.stringify(newProjectState)
        );
      } else {
        localStorage.removeItem(`projectState${projectId}`);
      }
    },
    [projectId, projectStatus]
  );

  const resetData = useCallback(() => {
    setProject(null);
    const newProjects = projects?.filter((project) => {
      if (+projectId === project.id) {
        return false;
      }
      return true;
    });
    updateProjects(newProjects || []);
    setTask([]);
    setProjectState(null);
    setMembers([]);
    setTaskStatus([]);
    clearLocalStorage(projectId);
  }, [projectId, projects, updateProjects]);

  // Fetching data from DB -> FrontEnd
  useEffect(() => {
    async function fetchNewUserTasks() {
      const userTasksData = await getActiveUserTasks();
      updateActiveTasks(userTasksData, false);
    }
    fetchNewUserTasks();
  }, [tasks]);
  useEffect(() => {
    async function fetchProject() {
      console.log("fetching project");
      console.log(project);
      try {
        const projectData: Project = await getProjectData(projectId);
        setProject(projectData);
        localStorage.setItem(
          `project${projectId}`,
          JSON.stringify(projectData)
        );
      } catch (error) {
        resetData();
      }
    }
    fetchProject();
  }, [projectId, resetData]);
  //Fetching Project Image
  useEffect(() => {
    async function fetchProjectImg() {
      try {
        const projectData = await getProjectImg(projectId);
        setProjectImg(projectData);
        localStorage.setItem(
          `projectImg${projectId}`,
          JSON.stringify(projectData)
        );
      } catch (error) {
        resetData();
      }
    }
    fetchProjectImg();
  }, [projectId, resetData]);

  //FETCHING PROJECT ACTIVITY
  useEffect(() => {
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
        resetData();
      }
    }

    fetchProjectActivity();
  }, [projectId, resetData]);

  // Fetching Tasks
  useEffect(() => {
    async function fetchTasks() {
      const tasksData = await getProjectTasks(projectId);
      setTask(tasksData);
      localStorage.setItem(`tasks${projectId}`, JSON.stringify(tasksData));
    }
    fetchTasks();
  }, [projectId]);

  // Fetching Project Status
  useEffect(() => {
    async function fetchProjectStatus() {
      const ProjectStatus = localStorage.getItem("projectStatus");
      const statusData = ProjectStatus
        ? JSON.parse(ProjectStatus)
        : await getProjectStatus();
      setProjectStatus(statusData);
      localStorage.setItem("projectStatus", JSON.stringify(statusData));
    }
    fetchProjectStatus();
  }, []);

  // Fetching Project State
  useEffect(() => {
    async function fetchProjectState() {
      const stateData = await getProjectState(projectId);
      setProjectState(stateData);
      if (stateData) {
        localStorage.setItem(
          `projectState${projectId}`,
          JSON.stringify(stateData)
        );
      } else {
        localStorage.removeItem(`projectState${projectId}`);
      }
    }
    fetchProjectState();
  }, [projectId]);

  // Fetching Members
  useEffect(() => {
    async function fetchMembers() {
      const membersData = await getProjectMembers(projectId);
      const fetchMembersAuth = await Promise.all(
        membersData.map(async (user) => {
          return await getProjectAuth(user.id, projectId.toString());
        })
      );
      setMembers(fetchMembersAuth);
      localStorage.setItem(`members${projectId}`, JSON.stringify(membersData));
    }
    fetchMembers();
  }, [projectId]);

  // Fetching Task Status
  useEffect(() => {
    async function fetchTaskStatus() {
      const statusData = await getTaskStatus(projectId);
      setTaskStatus(statusData);
      localStorage.setItem(
        `taskStatus${projectId}`,
        JSON.stringify(statusData)
      );
    }
    fetchTaskStatus();
  }, [projectId]);

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
        resetData,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
