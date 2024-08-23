import { useState } from "react";
import ProjectCreationBase from "../ProjectTaskTeamForms/Project/ProjectCreationBase";
import Header from "./Header";
import ProjectListing from "../ProjectComponent/components/projectListings";

export default function MainNavigation() {
  const [HeaderNavigation, setHeaderNavigation] = useState([
    {
      name: "tasks",
      active: false,
      href: "/",
      type: "complexe",
    },
    {
      name: "projects",
      active: false,
      href: "/about",
      type: "complexe",
    },
    {
      name: "teams",
      active: false,
      href: "/services",
      type: "complexe",
    },
  ]);
  const [showProjectCreation, setShowProjectCreation] = useState(false);

  return (
    <div className="w-screen h-screen overflow-hidden ">
      {showProjectCreation && (
        <ProjectCreationBase
          showProjectCreation={showProjectCreation}
          setShowProjectCreation={setShowProjectCreation}
        />
      )}
      <Header
        itemLinks={HeaderNavigation}
        setItemLinks={setHeaderNavigation}
        TogglePojectCreation={() =>
          setShowProjectCreation(!showProjectCreation)
        }
      />
      <ProjectListing />
    </div>
  );
}