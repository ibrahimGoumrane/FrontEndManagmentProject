import { Link } from "react-router-dom";

const LoginSignUp = () => {
  return (
    <>
      <div className="hidden  sm:inline-block ">
        <Link
          className="text-purple-400  hover:bg-purple-700 hover:text-white font-bold  focus:ring-4 focus:ring-purple-300  rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
          to="/login"
        >
          Login
        </Link>
      </div>
      <Link
        to="/signup"
        className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
      >
        SignUp
      </Link>
    </>
  );
};

export default LoginSignUp;
