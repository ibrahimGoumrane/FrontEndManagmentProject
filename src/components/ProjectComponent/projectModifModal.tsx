import { ProjectModif } from "../../models/Projects";
import ProjectModifComponent from "./components/projectModif/ProjectModif";
import UpdateProjectPicModal from "./components/projectPicture";

interface ProjectModifProps {
  onUpdatedSuccessfully: (newProject: ProjectModif | null) => void;
  onCancelModif: () => void;
}

export default function ProjectModifModal({
  onUpdatedSuccessfully,
  onCancelModif,
}: ProjectModifProps) {
  return (
    <main className="w-full min-h-[90vh] flex items-start justify-center bg-purple-500">
      <section className="basis-1/3 min-h-[90vh] max-h-[90vh] overflow-y-auto px-12  rounded-md bg-white flex justify-start pt-6 items-center flex-col space-y-10 border-black border-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white">
            Project Settings
          </h2>
          <div>
            <p className="text-md font-semibold dark:text-white  mt-1">
              Here you can change the project name, description, or delete the
              project.
            </p>
          </div>
        </div>
        <UpdateProjectPicModal />
        <ProjectModifComponent
          onUpdatedSuccessfully={onUpdatedSuccessfully}
          onCancelModif={onCancelModif}
        />
      </section>
    </main>
  );
}
