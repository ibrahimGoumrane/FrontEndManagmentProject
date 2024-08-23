import Header from "../components/utils/NotSignIn";
import SignUpForm from "../components/LoginSignUp/SignUp/SignUpForm";
import { useNavigate } from "react-router-dom";
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
  const { updateUser } = useUser();

  const navigate = useNavigate();
  const handleSignUpSuccess = (user: User) => {
    updateUser(user);
    navigate("/home/");
  };
  return (
    <>
      <main className="max-h-screen overflow-hidden w-1/2 mx-auto flex items-center justify-start mt-5 flex-col">
        <Header heading="My Site" Img={img()} extra="Create an account" />
        <SignUpForm onSignUpSuccessfull={handleSignUpSuccess} />
      </main>
    </>
  );
};

export default Login;
