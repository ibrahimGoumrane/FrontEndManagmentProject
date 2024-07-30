import { Id } from "../../../../models/Status";

export const clearLocalStorage = (projectId: Id) => {
    // Remove items related to a specific project
    localStorage.removeItem(`project${projectId}`);
    localStorage.removeItem(`tasks${projectId}`);
    localStorage.removeItem(`projectState${projectId}`);
    localStorage.removeItem(`members${projectId}`);
    localStorage.removeItem(`taskStatus${projectId}`);
  
    // Remove general items that are not specific to a project
    localStorage.removeItem("projectStatus");
  };