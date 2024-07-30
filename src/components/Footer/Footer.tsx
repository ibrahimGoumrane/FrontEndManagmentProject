import NavFooter from "./subComponents/NavFooter";
import Icons from "./subComponents/Icons";

const Footer = () => {
  return (
    <section className="bg-white">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <div className="w-100 h-max flex items-center justify-evenly flex-col lg:flex-row gap-10 lg:gap-0">
          <NavFooter />
          <Icons />
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          © 2021 SomeCompany, Inc. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
