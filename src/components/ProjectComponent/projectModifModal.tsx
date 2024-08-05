import { ProjectModif } from "../../models/Projects";
import ProjectModifComponent from "./components/projectModif/ProjectModif";

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
      <section className="basis-1/3 min-h-[90vh] px-12  rounded-md bg-white flex justify-start pt-16 items-center flex-col space-y-10 border-black border-4">
        <div>
          <h2 className="text-3xl font-bold dark:text-white">
            Modify your Project
          </h2>
        </div>
        <ProjectModifComponent
          onUpdatedSuccessfully={onUpdatedSuccessfully}
          onCancelModif={onCancelModif}
        />
      </section>
    </main>
  );
}
