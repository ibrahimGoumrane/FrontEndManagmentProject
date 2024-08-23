import { useRef } from "react";
import { useProject } from "../../../utils/Contexte/ProjectContext/projectContexte";
import { useForm } from "react-hook-form";

export default function UpdateProjectPicModal() {
  const { projectImg, updatePicture } = useProject();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ ProjectPic: FileList }>({
    mode: "onChange",
  });
  const { ref, ...rest } = register("ProjectPic");

  const registerSubmit = () => {
    if (fileInputRef.current?.files && fileInputRef.current?.files.length > 0) {
      updatePicture(fileInputRef.current?.files);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleSubmit(registerSubmit)();
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="photo" className="block text-lg font-bold leading-6">
        Project Picture
      </label>
      {errors.ProjectPic && (
        <div className="text-red-500">{errors.ProjectPic.message}</div>
      )}
      <div className="mt-2 gap-y-6 rounded-md w-full flex items-center justify-between bg-white text-black p-4 relative flex-col">
        <img
          src={projectImg}
          alt="profilePic"
          className="h-20 rounded-full w-20"
        />
        <button
          type="button"
          disabled={isSubmitting}
          className="rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={handleButtonClick}
        >
          {isSubmitting ? "Uploading..." : "Change"}
        </button>

        <form id="changePic" className="hidden">
          <input
            type="file"
            id="photo"
            {...rest}
            ref={(e) => {
              ref(e);
              fileInputRef.current = e;
            }}
            onChange={handleFileChange}
          />
        </form>
      </div>
    </div>
  );
}
