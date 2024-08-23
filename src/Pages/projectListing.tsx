import MainNavigation from "../components/MainNav/mainNavigation";
import ProjectListing from "../components/ProjectComponent/components/projectListings";

export default function ProjectData() {
  return (
    <div className="w-screen h-screen overflow-hidden ">
      <MainNavigation />
      <ProjectListing />
    </div>
  );
}
