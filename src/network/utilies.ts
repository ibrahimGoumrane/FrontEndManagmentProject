import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
} from "../errors/http_errors";
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
      switch (response.status) {
        case 401:
          throw new UnauthorizedError(errorMessage);
        case 409:
          throw new ConflictError(errorMessage);
        case 400:
          throw new BadRequestError(errorMessage);
        case 403:
          throw new ForbiddenError(errorMessage);
        case 404:
          throw new NotFoundError(errorMessage);
        case 500:
          throw new InternalServerError(errorMessage);
        default:
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
