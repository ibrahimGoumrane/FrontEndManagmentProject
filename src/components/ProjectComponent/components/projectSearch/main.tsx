import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProject } from "../../../../models/Projects";
import { searchProjects, getProjectData } from "../../../../network/ProjectApi";
import PopUp from "../../../utils/popUp";
import { PopUpType } from "../../../../models/utils";
import { Button } from "@mui/material";
import ProjectContainer from "./container";
export default function ProjectSearch() {
  const [query, setQuery] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const [projects, setProjects] = useState<getProject[]>([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showError, setShowError] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }
  function handleJoinRequest() {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
    setTimeout(() => {
      setShowSuccess(true);
    }, 1000);
    setTimeout(() => {
      navigate("/home/");
    }, 3000);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSpinner(true); // Show spinner when the search starts

    async function lookForProjects() {
      try {
        const FoundedProjects = await searchProjects(query);
        const projectData = await Promise.all(
          FoundedProjects.map((project) =>
            getProjectData(project.id ? +project.id : "")
          )
        );
        setProjects(projectData || []);
        setShowSpinner(false);
        if (projectData.length === 0) {
          setShowError(true);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        setProjects([]);
      }
    }

    lookForProjects();
  };
  return (
    <form
      className="h-auto flex flex-col overflow-auto "
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center ">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
            <div className="block text-gray-700  capitalize  italic text-xl py-2 font-bold">
              project Listings
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center bg-gray-200 rounded-md flex-1">
                <input
                  className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                  id="search"
                  value={query}
                  onChange={handleChange}
                  type="text"
                  placeholder="Search teams or members"
                />
              </div>
              <div>
                <Button
                  sx={{
                    bgcolor: "#0f172a",
                    "&:hover": {
                      bgcolor: "#1e293b",
                    },
                  }}
                  type="submit"
                  variant="contained"
                >
                  Search
                </Button>
              </div>
            </div>
            <div className="py-3 text-sm">
              {showSuccess && (
                <PopUp
                  type={PopUpType.Success}
                  message="Your Request has been submited You will be informed by email the result of your request."
                  setSuccess={setShowSuccess}
                  duration={4000}
                />
              )}
              {!showSuccess && (
                <ProjectContainer
                  showSpinner={showSpinner}
                  projects={projects}
                  query={query}
                  handleJoinRequest={handleJoinRequest}
                  showError={showError}
                />
              )}
            </div>{" "}
          </div>
        </div>
      </div>
    </form>
  );
}
