import MainData from "../components/MainDashBoard/ContentData";
import MainNavigation from "../components/MainNav/mainNavigation";
const MainDashBoard = () => {
  return (
    <div className="w-screen h-screen overflow-hidden ">
      <MainNavigation />
      <MainData />
    </div>
  );
};

export default MainDashBoard;
