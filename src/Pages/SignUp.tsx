import Header from "../components/utils/NotSignIn";
import SignUpForm from "../components/LoginSignUp/SignUp/SignUpForm";
import { useNavigate } from "react-router-dom";
import { User } from "../models/Users";
const img = () => {
  return (
    <img
      src="./img/LogoNotLoggedIn.jpeg"
      className="w-16 h-auto text-center   "
    />
  );
};
interface SignUp {
  Successfull: (user: User) => void;
}
const Login = ({ Successfull }: SignUp) => {
  const navigate = useNavigate(); // Use the useNavigate hook
  const handleSignUpSuccess = (user: User) => {
    Successfull(user);
    navigate("/"); // Redirect to the homepage or any desired route
  };
  return (
    <>
      <main className="max-h-screen w-1/2 mx-auto flex items-center justify-start mt-5 flex-col ">
        <Header heading="My Site" Img={img()} extra="Create an account" />
        <SignUpForm onSignUpSuccessfull={handleSignUpSuccess} />
      </main>
    </>
  );
};

export default Login;
