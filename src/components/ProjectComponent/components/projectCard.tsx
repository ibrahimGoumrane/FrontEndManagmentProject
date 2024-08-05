import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Project } from "../../../models/Projects";
import { useNavigate } from "react-router-dom";
import { purple } from "@mui/material/colors";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [projectData, setProjectData] = useState<Project>();
  const navigate = useNavigate();
  useEffect(() => {
    setProjectData(project);
  }, [project]);
  function GoToProject(id: number | string = "") {
    navigate(`/home/project/${id}`);
  }

  return (
    <Card
      sx={{ width: 300, height: "35vh" }}
      className="relative project-card "
    >
      <div className="project-content">
        <img alt="project" src="/img/project.png" className="h-[20vh] w-full" />
        <CardContent className="w-full flex items-center justify-center flex-col ">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color={purple[400]}
            className="capitalize"
          >
            {projectData?.name ? projectData.name : "No name found"}
          </Typography>
          <div className="w-full lowercase text-sm font-light font-serif text-center">
            {projectData?.description
              ? projectData.description
              : "No description found"}
          </div>
        </CardContent>
      </div>
      <button
        onClick={() => GoToProject(projectData?.id)}
        className="project-button absolute px-2 py-1 bg-purple-900 text-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:bg-purple-800/70 duration-150"
      >
        Visit Project
      </button>
    </Card>
  );
}
