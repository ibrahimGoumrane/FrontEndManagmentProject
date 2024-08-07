import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { CommentData } from "../../../models/Comment.ts";
import { TeamMembers, Team, Id } from "../../../models/Teams.ts";
import { TeamContext } from "./TeamContexte.ts";
import { useUser } from "../UserContext/userContexte.ts";
import { saveTeam, getTeamById } from "../../../network/TeamApi.ts";

interface TaskProviderProps {
  teamId: Id;
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({
  teamId,
  children,
}) => {
  const { teams } = useUser();
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    async function getTeamData() {
      const teamData = await getTeamById(+teamId);
      setTeam(teamData);
    }
    getTeamData();
  }, [teamId]);

  const [teamMembers, setteamMembers] = useState<TeamMembers[]>([]);

  const updateTeam = useCallback(
    async (newTeam: Team | null) => {
      if (newTeam) {
        const SavedTeam = await saveTeam(newTeam);
        setTeam(SavedTeam);
      }
    },
    []
  );

  const updateComments = useCallback(
    async (commentsData: CommentData[]) => {
      await deleteComment(taskId);
      const commentsDb = await Promise.all(
        commentsData.map((comment) => saveComment(comment))
      );
      setComments(commentsDb);

      localStorage.setItem(`comments${taskId}`, JSON.stringify(commentsDb));
    },
    [taskId]
  );

  const resetData = useCallback(() => {
    setTask(null);
    setComments([]);
    clearLocalStorage(taskId); // This should remove related task data from local storage
  }, [taskId]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const commentsData: CommentData[] = await getCommentByTaskId(taskId);
        setComments(commentsData);
        localStorage.setItem(`comments${taskId}`, JSON.stringify(commentsData));
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    }
    fetchComments();
  }, [taskId]);

  return (
    <TeamContext.Provider
      value={{
        task,
        comments,
        updateTask,
        updateComments,
        resetData,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
