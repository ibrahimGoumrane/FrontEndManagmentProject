import { useUser } from "../../utils/Contexte/UserContext/userContexte";

const LogoImg = () => {
  const { profilePic } = useUser();
  return (
    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
      <div className="relative">
        <img
          alt="..."
          src={profilePic}
          className=" rounded-full xl:w-48 w-48  h-auto   shadow-purple-800 shadow-sm relative block -translate-y-10 "
        />
      </div>
    </div>
  );
};

export default LogoImg;
