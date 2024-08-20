import UpdatePicModal from "../components/LoginSignUp/profile/updatePic";
import UpdateProfileModal from "../components/LoginSignUp/profile/updateProfile";
import { FaHome } from "react-icons/fa";
import ActiveLink from "../components/utils/link";

export default function Settings() {
  return (
    <div className="bg-purple-200 w-screen h-screen flex items-center justify-center ">
      <div className="flex flex-col items-center pt-20 justify-center text-md text-white font-bold bg-purple-400 max-w-[40vw] mx-auto p-20 rounded-xl h-full relative">
        <div className="pb-12 flex-1 w-4/5 flex flex-col">
          <div>
            <h2 className="text-xl font-bold  leading-7">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-100 mb-5">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          <UpdatePicModal />
          <UpdateProfileModal
            onUpdatedSuccessfull={() => {}}
            onCancelUpdate={() => {}}
          />
          <ActiveLink to="/">
            <FaHome />
            <span className="font-bold text-black">Go to Home</span>
          </ActiveLink>
        </div>
      </div>
    </div>
  );
}
