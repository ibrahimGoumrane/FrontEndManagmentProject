import { useState } from "react";
import Footer from "../components/Footer/Footer";
import HomePageNotLoggedIn from "../components/Main/HomePageNotLoggedIn";
import Header from "../components/MainNav/Header";

const HomePage = () => {
  const [Navigation, setNavigation] = useState([
    {
      name: "Start Now",
      active: false,
      href: "/home",
      type: "simple",
    },
    {
      name: "About",
      active: false,
      href: "/about",
      type: "simple",
    },
    {
      name: "Contact",
      active: false,
      href: "/contact",
      type: "simple",
    },
  ]);

  return (
    <>
      <Header
        itemLinks={Navigation}
        setFixed={true}
        setItemLinks={setNavigation}
        TogglePojectCreation={() => {}}
      />
      <HomePageNotLoggedIn />
      <Footer />
    </>
  );
};
export default HomePage;
