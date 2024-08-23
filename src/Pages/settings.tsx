import UpdatePicModal from "../components/LoginSignUp/profile/updatePic";
import UpdateProfileModal from "../components/LoginSignUp/profile/updateProfile";
import { FaHome } from "react-icons/fa";
import ActiveLink from "../components/utils/link";
import UpdateSkills from "../components/LoginSignUp/profile/updateSkills";

export default function Settings() {
  return (
    <div className="bg-purple-200 w-screen h-screen flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center text-md text-white font-bold bg-purple-400 max-w-[40vw] mx-auto py-10 px-20 rounded-xl h-full relative">
        <div className="flex-1 w-4/5 flex flex-col gap-4 max-h-full overflow-y-auto">
          <div>
            <h2 className="text-xl font-bold ">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-100 mb-5">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          <UpdatePicModal />
          <UpdateSkills />
          <UpdateProfileModal onUpdatedSuccessfull={() => {}} />
          <ActiveLink to="/home/">
            <FaHome />
            <span className="font-bold text-black">Go to Home</span>
          </ActiveLink>
        </div>
      </div>
    </div>
  );
}
