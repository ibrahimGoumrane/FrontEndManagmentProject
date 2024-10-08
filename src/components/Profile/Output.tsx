// import { useUser } from "../../../utils/Contexte/userContext";
import BackGroundMain from "./backGroundMain";
import Main from "./main";
import "@fortawesome/fontawesome-free/css/all.min.css";
const Output = () => {
  return (
    <main className="profile-page min-h-screen">
      <BackGroundMain />
      <section className="relative py-16 bg-blueGray-200">
        <Main />
      </section>
    </main>
  );
};

export default Output;
