// UserContext.tsx

import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Project } from "../../../models/Projects";
import { ProjectStatus, TaskStatus } from "../../../models/Status";
import { Id, Task } from "../../../models/Tasks";
import { User } from "../../../models/Users";
import {
  getProjectData,
  getProjectMembers,
  getProjectState,
  updateProject as saveProjectData,
  updateProjectMembers,
} from "../../../network/ProjectApi";
import {
  getProjectStatus,
  getTaskStatus,
  saveTaskStatus,
} from "../../../network/StatusApi";
import {
  deleteTasks,
  getProjectTasks,
  updateTask as saveTask,
} from "../../../network/TasksApi";
import { ProjectContext } from "./projectContexte";
import { clearLocalStorage } from "./utils/utilities";

interface ProjectProviderProps {
  projectId: Id;
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  projectId,
  children,
}) => {
  const [project, setProject] = useState<Project | null>(() => {
    const projectData = localStorage.getItem(`project${projectId}`);
    return projectData ? JSON.parse(projectData) : null;
  });

  const [tasks, setTask] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(`tasks${projectId}`);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [projectStatus, setProjectStatus] = useState<ProjectStatus[]>(() => {
    const savedTasks = localStorage.getItem("projectStatus");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [projectState, setProjectState] = useState<ProjectStatus | null>(() => {
    const projectState = localStorage.getItem(`projectState${projectId}`);
    return projectState ? JSON.parse(projectState) : null;
  });
  const [members, setMembers] = useState<User[]>(() => {
    const savedMembers = localStorage.getItem(`members${projectId}`);
    return savedMembers ? JSON.parse(savedMembers) : [];
  });
  const [taskStatus, setTaskStatus] = useState<TaskStatus[]>(() => {
    const savedTasks = localStorage.getItem(`taskStatus${projectId}`);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // State Manipulations

  const updateProject = useCallback(
    async (newProject: Project | null) => {
      setProject(newProject);
      if (newProject) {
        const Project = await saveProjectData(newProject);
        localStorage.setItem(`project${projectId}`, JSON.stringify(Project));
        setProject(Project);
      } else {
        localStorage.removeItem(`project${projectId}`);
        setProject(null);
      }
    },
    [projectId]
  );

  const updateTasks = useCallback(
    async (newTasks: Task[] ) => {
      await deleteTasks(projectId);
      const tasksDb = await Promise.all(
        newTasks.map((t) =>
          saveTask({
            ...t,
            projectId: +projectId,
          })
        )
      );
      setTask(tasksDb);
      localStorage.setItem(`tasks${projectId}`, JSON.stringify(tasksDb));
    },
    [projectId]
  );

  const updateMembers = useCallback(
    async (newMembers: User[]) => {
      const members = await updateProjectMembers(projectId, newMembers);
      setMembers(members);
      localStorage.setItem(`members${projectId}`, JSON.stringify(members));
    },
    [projectId]
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

  const updateTaskStatus = useCallback(
    async (newTaskStatus: TaskStatus[]) => {
        const taskS = await saveTaskStatus(projectId, newTaskStatus);
        setTaskStatus(taskS);
        localStorage.setItem(`taskStatus${projectId}`, JSON.stringify(taskS));
    },
    [projectId]
  );

  const resetData = useCallback(() => {
    setProject(null);
    setTask([]);
    setProjectState(null);
    setMembers([]);
    setTaskStatus([]);
    clearLocalStorage(projectId);
  }, [projectId]);

  // Fetching data from DB -> FrontEnd
  useEffect(() => {
    async function fetchProject() {
      try {
        const projectData: Project = await getProjectData(projectId);
        setProject(projectData);
        localStorage.setItem(
          `project${projectId}`,
          JSON.stringify(projectData)
        );
      } catch (error) {
        console.error("Failed to fetch project:", error);
        resetData();
      }
    }
    fetchProject();
  }, [projectId]);

  // Fetching Tasks
  useEffect(() => {
    async function fetchTasks() {
      try {
        const tasksData = await getProjectTasks(projectId);
        setTask(tasksData);
        localStorage.setItem(`tasks${projectId}`, JSON.stringify(tasksData));
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    }
    fetchTasks();
  }, [projectId]);

  // Fetching Project Status
  useEffect(() => {
    async function fetchProjectStatus() {
      try {
        const ProjectStatus = localStorage.getItem("projectStatus");
        const statusData = ProjectStatus
          ? JSON.parse(ProjectStatus)
          : await getProjectStatus();
        setProjectStatus(statusData);
        localStorage.setItem("projectStatus", JSON.stringify(statusData));
      } catch (error) {
        console.error("Failed to fetch project statuses:", error);
      }
    }
    fetchProjectStatus();
  }, []);

  // Fetching Project State
  useEffect(() => {
    async function fetchProjectState() {
      try {
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
      } catch (error) {
        console.error("Failed to fetch project state:", error);
      }
    }
    fetchProjectState();
  }, [projectId]);

  // Fetching Members
  useEffect(() => {
    async function fetchMembers() {
      try {
        const membersData = await getProjectMembers(projectId);
        setMembers(membersData);
        localStorage.setItem(
          `members${projectId}`,
          JSON.stringify(membersData)
        );
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    }
    fetchMembers();
  }, [projectId]);

  // Fetching Task Status
  useEffect(() => {
    async function fetchTaskStatus() {
      try {
        const statusData = await getTaskStatus(projectId);
        setTaskStatus(statusData);
        localStorage.setItem(
          `taskStatus${projectId}`,
          JSON.stringify(statusData)
        );
      } catch (error) {
        console.error("Failed to fetch task statuses:", error);
      }
    }
    fetchTaskStatus();
  }, [projectId]);

  return (
    <ProjectContext.Provider
      value={{
        project,
        tasks,
        projectStatus,
        projectState,
        members,
        taskStatus,
        updateProject,
        updateTasks,
        updateMembers,
        updateProjectState,
        updateTaskStatus,
        resetData,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
