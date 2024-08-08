import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Project } from "../../../models/Projects";
import { Task } from "../../../models/Tasks";
import { Team } from "../../../models/Teams";
import { User } from "../../../models/Users";
import {
  getUserProjects,
  updateProject as saveProjects,
} from "../../../network/ProjectApi";
import { getSkillsName, saveSkills } from "../../../network/SkillsApi";
import {
  deleteTasksUser,
  getActiveUserTasks,
  updateTask as saveTasks,
} from "../../../network/TasksApi";
import { getTeamByUserId } from "../../../network/TeamApi";
import {
  getLoggedInUser,
  updateUser as saveUser,
} from "../../../network/UserApi";
import { UserContext } from "./userContexte";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("userdata");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [skills, setSkills] = useState<string[]>(() => {
    const savedSkills = localStorage.getItem("userskills");
    return savedSkills ? JSON.parse(savedSkills) : [];
  });

  const [teams, setTeams] = useState<Team[]>(() => {
    const savedTeams = localStorage.getItem("userTeams");
    return savedTeams ? JSON.parse(savedTeams) : [];
  });

  const [activeTasks, setActiveTasks] = useState<{
    assigned: Task[];
    created: Task[];
  }>(() => {
    const savedTasks = localStorage.getItem("userTasks");
    return savedTasks ? JSON.parse(savedTasks) : { assigned: [], created: [] };
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem("userProjects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  });
  const updateUser = useCallback(async (newUser: User | null) => {
    try {
      setUser(newUser);
      if (newUser) {
        localStorage.setItem("userdata", JSON.stringify(newUser));
        await saveUser(newUser);
      } else {
        localStorage.removeItem("userdata");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  }, []);

  const updateSkills = useCallback(async (newSkills: string[]) => {
    try {
      setSkills(newSkills);
      await saveSkills(newSkills);
      localStorage.setItem("userskills", JSON.stringify(newSkills));
    } catch (error) {
      console.error("Failed to update skills:", error);
    }
  }, []);

  const updateTeams = useCallback((newTeams: Team[]) => {
    try {
      setTeams(newTeams);
      localStorage.setItem("userTeams", JSON.stringify(newTeams));
    } catch (error) {
      console.error("Failed to update teams:", error);
    }
  }, []);

  const updateActiveTasks = useCallback(
    async (
      newTasks: { assigned: Task[]; created: Task[] },
      saveToDb: boolean = true
    ) => {
      try {
        if (!saveToDb) {
          setActiveTasks(newTasks);
          localStorage.setItem("userTasks", JSON.stringify(newTasks));
          return;
        }
        const assignedTask = await Promise.all(
          newTasks.assigned.map((task) => saveTasks(task))
        );
        const savedTask = await Promise.all(
          newTasks.created.map((task) => saveTasks(task))
        );
        localStorage.setItem(
          "userTasks",
          JSON.stringify({
            assigned: assignedTask,
            created: savedTask,
          })
        );
      } catch (error) {
        console.error("Failed to update tasks:", error);
      }
    },
    []
  );

  const updateProjects = useCallback(
    async (newProjects: Project[], saveToDb: boolean = true) => {
      try {
        setProjects(newProjects);
        if (!saveToDb) {
          setProjects(newProjects);
          localStorage.setItem("userProjects", JSON.stringify(newProjects));
          return;
        }
        await Promise.all(newProjects.map((project) => saveProjects(project)));
        localStorage.setItem("userProjects", JSON.stringify(newProjects));
      } catch (error) {
        console.error("Failed to update projects:", error);
      }
    },
    []
  );

  const clearUserTasks = useCallback(async () => {
    try {
      setActiveTasks({
        assigned: [],
        created: [],
      });
      await deleteTasksUser();
      localStorage.removeItem("userTasks");
    } catch (error) {
      console.error("Failed to clear user tasks:", error);
    }
  }, []);

  const resetData = () => {
    setUser(null);
    setSkills([]);
    setTeams([]);
    setActiveTasks({
      assigned: [],
      created: [],
    });
    setProjects([]);
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const loggedUserData = await getLoggedInUser();
        if (!loggedUserData) throw new Error("User not yet authenticated");
        if (!user) {
          setUser(loggedUserData);
          localStorage.setItem("userdata", JSON.stringify(loggedUserData));
        }
      } catch (error) {
        console.error("Failed to fetch logged-in user:", error);
        resetData();
        localStorage.clear();
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;

      try {
        const [userSkillsData, userTeamsData, userTasksData, userProjectsData] =
          await Promise.all([
            getSkillsName(user.id),
            getTeamByUserId(+user.id),
            getActiveUserTasks(),
            getUserProjects(),
          ]);
        setSkills(userSkillsData);
        localStorage.setItem("userskills", JSON.stringify(userSkillsData));

        setTeams(userTeamsData);
        localStorage.setItem("userTeams", JSON.stringify(userTeamsData));

        setActiveTasks(userTasksData);
        localStorage.setItem("userTasks", JSON.stringify(userTasksData));

        setProjects(userProjectsData);
        localStorage.setItem("userProjects", JSON.stringify(userProjectsData));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
    fetchUserData();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        skills,
        teams,
        activeTasks,
        projects,
        updateUser,
        updateSkills,
        updateTeams,
        updateActiveTasks,
        updateProjects,
        resetData,
        clearUserTasks,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
