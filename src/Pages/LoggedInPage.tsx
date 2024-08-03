import MainData from "../components/MainDashBoard/ContentData";
import MainNav from "../components/MainDashBoard/Navigation";
const MainDashBoard = () => {
  return (
    <body className="w-screen h-screen overflow-hidden ">
      <MainNav />
      <MainData />
    </body>
  );
};

export default MainDashBoard;
