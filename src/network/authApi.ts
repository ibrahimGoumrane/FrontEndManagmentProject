import {
  autorisationModel,
  autorisationModelInputs,
  updateDeleteAuth,
} from "../models/auth";
import { fetchData } from "./utilies";

////////////////////////////PROJECTAUTH

export const getProjectAuth = async (
  userId: string,
  moduleId: string
): Promise<autorisationModel> => {
  const response = await fetchData(
    `/api/projects/auth?moduleId=${moduleId}&userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const updateProjectAuth = async ({
  id,
  userId,
  moduleId,
}: updateDeleteAuth & { moduleId: string }) => {
  const response = await fetchData(
    `/api/projects/auth/project?moduleId=${moduleId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, userId, moduleId }),
    }
  );
  return response;
};

export const deleteProjectAuth = async (id: string, moduleId: string) => {
  const response = await fetchData(`/api/projects/auth?moduleId=${moduleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  return response;
};

////////////////////////////TASKMANGERAUTH

export const getTaskManagerAuth = async (
  moduleId: string
): Promise<autorisationModel> => {
  const response = await fetchData(
    `/api/projects/auth/taskManager?moduleId=${moduleId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const createTaskManagerAuth = async ({
  userId,
  moduleId,
}: autorisationModelInputs) => {
  const response = await fetchData(
    `/api/projects/auth/taskManager/create?moduleId=${moduleId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, moduleId }),
    }
  );
  return response;
};

export const updateTaskManagerAuth = async ({
  userId,
  moduleId,
}: autorisationModelInputs) => {
  const response = await fetchData(
    `/api/projects/auth/taskManager/update?moduleId=${moduleId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, moduleId }),
    }
  );
  return response;
};
export const DeleteTaskAuth = async ({
  userId,
  moduleId,
}: autorisationModelInputs) => {
  const response = await fetchData(
    `/api/projects/auth/taskManager/delete?moduleId=${moduleId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, moduleId }),
    }
  );
  return response;
};

export const deleteTaskManagerAuth = async (id: string, moduleId: string) => {
  const response = await fetchData(
    `/api/projects/auth/taskManager?moduleId=${moduleId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );

  return response;
};

// ////////////////////////////TASKAUTH

// export const getTaskAuth = async (
//   moduleId: string
// ): Promise<autorisationModel> => {
//   const response = await fetchData(`/api/tasks/auth?moduleId=${moduleId}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return response;
// };

// export const createTaskPermission = async ({
//   userId,
//   moduleId,
// }: autorisationModelInputs) => {
//   const response = await fetchData(
//     `/api/tasks/auth?moduleId=${moduleId}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId, moduleId }),
//     }
//   );
//   return response;
// };

// export const updateTaskPermission = async ({
//   id,
//   userId,
//   moduleId,
// }: updateDeleteAuth & { moduleId: string }) => {
//   const response = await fetchData(
//     `/api/tasks/auth?moduleId=${moduleId}`,
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id, userId, moduleId }),
//     }
//   );
//   return response;
// };

// export const deleteTaskPermission = async (id: string, moduleId: string) => {
//   const response = await fetchData(
//     `/api/tasks/auth?moduleId=${moduleId}`,
//     {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id }),
//     }
//   );
//   return response;
// };

////////////////////////////TEAMAUTH

export const getTeamAuth = async (
  moduleId: string
): Promise<autorisationModel> => {
  const response = await fetchData(`/api/teams/auth?moduleId=${moduleId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const updateTeamPermission = async ({
  id,
  userId,
  moduleId,
}: updateDeleteAuth & { moduleId: string }) => {
  const response = await fetchData(`/api/teams/auth?moduleId=${moduleId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, userId, moduleId }),
  });
  return response;
};

export const deleteTeamPermission = async (id: string, moduleId: string) => {
  const response = await fetchData(`/api/teams/auth?moduleId=${moduleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return response;
};
