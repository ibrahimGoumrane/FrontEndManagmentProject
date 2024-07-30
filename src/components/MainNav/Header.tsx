import { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import LoginSignUp from "../Header/LoginSignUp";
import Logo from "../Header/Logo";
import Navbar, { dataProps } from "./Navbar";
import Profile from "../Header/profile/Profile";
import { useUser } from "../../utils/Contexte/UserContext/userContexte";

export interface NavBarProps {
  itemLinks: dataProps[];
  setItemLinks: (links: dataProps[]) => void;
  TogglePojectCreation: () => void;
}

const Header = ({
  itemLinks,
  setItemLinks,
  TogglePojectCreation,
}: NavBarProps) => {
  const { user } = useUser();
  const windowWidth = useRef(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [isNavOpened, setIsNavOpened] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth < 1024 && !isMobile) {
        setIsMobile(true);
        setIsNavOpened(false);
      } else if (currentWidth >= 1024 && isMobile) {
        setIsMobile(false);
        setIsNavOpened(true);
      }
      windowWidth.current = currentWidth;
    };

    // Initial setup
    handleResize();

    // Setup event listener
    window.addEventListener("resize", handleResize);
    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, isNavOpened]);

  return (
    <header className="fixed w-full  max-h-[15vh] z-20 pt-5">
      <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-evenly px-10  mx-auto w-full">
          <Logo />
          <div className="flex items-center lg:order-2 gap-2">
            {user ? (
              !isMobile ? (
                <Profile />
              ) : !isNavOpened ? (
                <Profile />
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            {user ? <></> : <LoginSignUp />}
            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setIsNavOpened(!isNavOpened)}
            >
              <span className="sr-only">Open main menu</span>
              {!isNavOpened ? <GiHamburgerMenu /> : <IoCloseSharp />}
            </button>
          </div>
          {isMobile ? (
            isNavOpened ? (
              <div className="flex flex-col items-center w-full mt-4">
                <Navbar NavLinks={itemLinks} setItemLinks={setItemLinks} TogglePojectCreation={TogglePojectCreation} />
              </div>
            ) : null
          ) : (
            <Navbar NavLinks={itemLinks} setItemLinks={setItemLinks} TogglePojectCreation={TogglePojectCreation} />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
