import Header from "../components/utils/NotSignIn";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginSignUp/Login/LoginForm";
import { User } from "../models/Users";
import { useUser } from "../utils/Contexte/UserContext/userContexte";
const img = () => {
  return (
    <img
      src="./img/LogoNotLoggedIn.jpeg"
      className="w-16 h-auto text-center   "
    />
  );
};

const Login = () => {
  const navigate = useNavigate(); // Use the useNavigate hook
  const { updateUser } = useUser();

  const handleLoginSuccess = (user: User) => {
    updateUser(user);
    navigate("/home/"); // Redirect to the homepage or any desired route
  };
  return (
    <>
      <main className="max-h-screen w-1/2 mx-auto flex items-center justify-start mt-32 flex-col ">
        <Header
          heading="Login to your account"
          Img={img()}
          extra="You are always welcomed With us"
        />
        <LoginForm onLoginSuccessfull={handleLoginSuccess} />
      </main>
    </>
  );
};

export default Login;
