import React, {
  ReactNode,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import { Project } from "../../../models/Projects";
import { Task } from "../../../models/Tasks";
import { Team } from "../../../models/Teams";
import { User } from "../../../models/Users";
import {
  getUserProjects,
  updateProject as saveProjects,
} from "../../../network/ProjectApi";
import { getSkillsName, saveSkills } from "../../../network/SkillsApi";
import { getActiveUserTasks } from "../../../network/TasksApi";
import { getTeamByUserId } from "../../../network/TeamApi";
import {
  getLoggedInUser,
  getUserProfile,
  updateUser as saveUser,
  updateProfile,
} from "../../../network/UserApi";
import { UserContext } from "./userContexte";
import { io, Socket } from "socket.io-client";
import { serverAddress } from "../../../Settings/Settings";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("userdata");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const socket = useRef<Socket>();

  const [profilePic, setProfilePic] = useState<string>(() => {
    const savedImg = localStorage.getItem("userImg");
    return savedImg ? JSON.parse(savedImg) : null;
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
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("userdata", JSON.stringify(newUser));
      await saveUser(newUser);
    } else {
      localStorage.removeItem("userdata");
    }
  }, []);
  const updateSkills = useCallback(async (newSkills: string[]) => {
    const data = await saveSkills(newSkills);
    setSkills(data);
    localStorage.setItem("userskills", JSON.stringify(newSkills));
  }, []);
  const updateProfilePic = useCallback(async (newProfilePic: FileList) => {
    const formdata = new FormData();
    formdata.append("profileImg", newProfilePic[0]);

    const newPic = await updateProfile(formdata);
    setProfilePic(newPic);

    localStorage.setItem("userImg", JSON.stringify(newPic));
  }, []);
  const updateTeams = useCallback((newTeams: Team[]) => {
    setTeams(newTeams);
    localStorage.setItem("userTeams", JSON.stringify(newTeams));
  }, []);

  const updateActiveTasks = useCallback(
    async (
      newTasks: { assigned: Task[]; created: Task[] },
      saveToDb: boolean = true
    ) => {
      if (!saveToDb) {
        setActiveTasks(newTasks);
        localStorage.setItem("userTasks", JSON.stringify(newTasks));
        return;
      }
    },
    []
  );

  const updateProjects = useCallback(
    async (newProjects: Project[], saveToDb: boolean = true) => {
      setProjects(newProjects);
      if (!saveToDb) {
        setProjects(newProjects);
        localStorage.setItem("userProjects", JSON.stringify(newProjects));
        return;
      }
      await Promise.all(newProjects.map((project) => saveProjects(project)));
      localStorage.setItem("userProjects", JSON.stringify(newProjects));
    },
    []
  );

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
    if (user) return;

    async function fetchUser() {
      try {
        const loggedUserData = await getLoggedInUser();
        setUser(loggedUserData);
        localStorage.setItem("userdata", JSON.stringify(loggedUserData));
      } catch (error) {
        resetData();
        localStorage.clear();
      }
    }
    fetchUser();
  }, []);
  useEffect(() => {
    if (!user) return;

    async function fetchProfilePic() {
      try {
        if (user) {
          const loggedUserImg = await getUserProfile(user?.id);
          setProfilePic(loggedUserImg);
          localStorage.setItem("userImg", JSON.stringify(loggedUserImg));
        }
      } catch (error) {
        resetData();
        localStorage.clear();
      }
    }
    fetchProfilePic();
  }, [user]);

  useEffect(() => {
    // Initialize socket connection
    socket.current = io(serverAddress, {
      withCredentials: true, // Important to match credentials in CORS policy
    });

    return () => {
      // Cleanup on component unmount
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    async function fetchUserData() {
      if (!user) return;

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
    }
    fetchUserData();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        profilePic,
        skills,
        teams,
        activeTasks,
        projects,
        socket,
        updateUser,
        updateSkills,
        updateTeams,
        updateProfilePic,
        updateActiveTasks,
        updateProjects,
        resetData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
