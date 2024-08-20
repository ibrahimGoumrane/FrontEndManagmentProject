import { useUser } from "../../../utils/Contexte/UserContext/userContexte";

export default function UpdatePicModal() {
  const { profilePic } = useUser();
  return (
    <div className="col-span-full ">
      <label htmlFor="photo" className="block text-lg font-bold leading-6 ">
        Photo
      </label>
      <div className="mt-2  gap-x-3   rounded-md w-full flex items-center justify-between bg-white text-black p-4  ">
        <img src={profilePic} alt="profilePic" className="h-20 w-20" />
        <button
          type="button"
          className="rounded-md  px-2.5 py-1.5 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Change
        </button>
      </div>
    </div>
  );
}
