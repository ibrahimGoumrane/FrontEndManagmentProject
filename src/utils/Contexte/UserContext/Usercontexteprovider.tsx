import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { Project } from "../../../models/Projects";
import { Task } from "../../../models/Tasks";
import { Team } from "../../../models/Teams";
import { User } from "../../../models/Users";
import { getUserProjects } from "../../../network/ProjectApi";
import { getSkillsName, saveSkills } from "../../../network/SkillsApi";
import { getActiveUserTasks } from "../../../network/TasksApi";
import { getTeamByUserId } from "../../../network/TeamApi";
import {
  getLoggedInUser,
  getUserProfile,
  updateUser as saveUser,
  updateProfile,
} from "../../../network/UserApi";
import { serverAddress } from "../../../Settings/Settings";
import { UserContext } from "./userContexte";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  //User State Declaration
  const [user, setUser] = useState<User | null>(null);
  const socket = useRef<Socket>();
  const [profilePic, setProfilePic] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeTasks, setActiveTasks] = useState<{
    assigned: Task[];
    created: Task[];
  }>({
    assigned: [],
    created: [],
  });
  const [projects, setProjects] = useState<Project[]>([]);

  //update the state of the user
  const updateUser = useCallback(async (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      await saveUser(newUser);
    }
  }, []);
  const updateSkills = useCallback(async (newSkills: string[]) => {
    const data = await saveSkills(newSkills);
    setSkills(data);
  }, []);
  const updateProfilePic = useCallback(async (newProfilePic: FileList) => {
    const formdata = new FormData();
    formdata.append("profileImg", newProfilePic[0]);

    const newPic = await updateProfile(formdata);
    setProfilePic(newPic);
  }, []);
  const updateTeams = useCallback((newTeams: Team[]) => {
    setTeams(newTeams);
  }, []);

  const updateActiveTasks = useCallback(
    async (newTasks: { assigned: Task[]; created: Task[] }) => {
      setActiveTasks(newTasks);
    },
    []
  );

  const updateProjects = useCallback(async (newProjects: Project[]) => {
    setProjects(newProjects);
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
    if (user) return;
    async function fetchUser() {
      try {
        const loggedUserData = await getLoggedInUser();
        setUser(loggedUserData);
      } catch (error) {
        resetData();
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
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchProfilePic();
  }, [user]);

  useEffect(() => {
    // Initialize socket connection
    socket.current = io(serverAddress, {
      withCredentials: true, // Important to match credentials in CORS policy
    });
    socket.current.on("connect_error", function () {
      resetData();
      user && updateUser(null);
    });
    return () => {
      // Cleanup on component unmount
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
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

      setTeams(userTeamsData);

      setActiveTasks(userTasksData);

      setProjects(userProjectsData);
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
