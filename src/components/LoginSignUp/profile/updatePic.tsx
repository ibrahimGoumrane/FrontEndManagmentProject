import { useRef } from "react";
import { useUser } from "../../../utils/Contexte/UserContext/userContexte";
import { useForm } from "react-hook-form";

export default function UpdatePicModal() {
  const { profilePic, updateProfilePic } = useUser();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ ProfilePic: FileList }>({
    mode: "onChange",
  });
  const { ref, ...rest } = register("ProfilePic");

  const registerSubmit = () => {
    if (fileInputRef.current?.files && fileInputRef.current?.files.length > 0) {
      updateProfilePic(fileInputRef.current?.files); // Sending the first file since ProfilePic is a FileList
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
    <div>
      <label htmlFor="photo" className="block text-lg font-bold leading-6">
        Photo
      </label>
      {errors.ProfilePic && (
        <div className="text-red-500">{errors.ProfilePic.message}</div>
      )}
      <div className="mt-2 gap-x-3 rounded-md w-full flex items-center justify-between bg-white text-black p-4 relative">
        <img src={profilePic} alt="profilePic" className="h-32 w-auto" />
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
