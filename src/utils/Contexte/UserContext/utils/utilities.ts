export const clearLocalStorage = () => {
  localStorage.removeItem("userdata");
  localStorage.removeItem("userskills");
  localStorage.removeItem("userTeams");
  localStorage.removeItem("userTasks");
  localStorage.removeItem("userProjects");
};
