import { useState } from "react";
import NavItem from "./NavItem";
import NavItemComplex from "./NavItemComplexe";
import { MegaMenu } from "flowbite-react";

export interface NavBarProps {
  NavLinks: dataProps[];
  setItemLinks: (links: dataProps[]) => void;
  TogglePojectCreation: () => void;
}
export interface dataProps {
  name: string;
  active: boolean; // Add a default value of false
  href: string;
  type: string;
  
}

const Navbar = ({ NavLinks, setItemLinks , TogglePojectCreation }: NavBarProps) => {
  const [internalState, setInternalState] = useState(NavLinks);
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const index = e.currentTarget.id;
    setInternalState(() =>
      NavLinks.map((item, i) =>
        i === +index ? { ...item, active: true } : { ...item, active: false }
      )
    );
    setItemLinks(internalState);
  };
  return (
    <div
      className="items-center justify-between  w-full lg:flex lg:w-auto lg:order-1"
      id="mobile-menu-2"
    >
      <MegaMenu>
        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 ">
          {internalState.map((item, index) =>
            item.type === "simple" ? (
              <NavItem
                key={index}
                name={item.name}
                active={item.active}
                href={item.href}
                index={index}
                handleClick={handleClick}
              />
            ) : (
              <NavItemComplex key={index} name={item.name} TogglePojectCreation={TogglePojectCreation} />
            )
          )}
        </ul>
      </MegaMenu>
    </div>
  );
};
export default Navbar;
