import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { serverAddress } from "../Settings/Settings";

export async function fetchData(input: RequestInfo, init?: RequestInit) {
  if (!init) init = {};
  // Ensure headers is defined and only add necessary headers
  if (!init.headers) {
    init.headers = {};
  }

  init.credentials = "include"; // include cookies

  try {
    const response = await fetch(serverAddress + input, init);

    if (response.status === 204) {
      return JSON.stringify({
        message: "Deleted Successfully",
      });
    }

    if (response.ok) {
      return response.json();
    } else {
      const errorBody = await response.json();
      const errorMessage = errorBody.error;

      if (response.status === 401) {
        throw new UnauthorizedError(errorMessage);
      } else if (response.status === 409) {
        throw new ConflictError(errorMessage);
      } else {
        throw new Error(
          `Request failed with status: ${response.status} message: ${errorMessage}`
        );
      }
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
