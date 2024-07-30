import { Avatar, Button } from "@mui/material";
import { useState } from "react";
import Card from "../card";
import { deepPurple } from "@mui/material/colors";
import { LogOut } from "../../../network/UserApi";
import { useUser } from "../../../utils/Contexte/UserContext/userContexte";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const { name, email, age } = user!;
  function HandlerLogoutClick() {
    LogOut();
    setShowProfile(false);
    localStorage.clear();
    navigate("/login");
  }
  function handleProfileClick() {
    setShowProfile(false);
  }

  return (
    <div className="relative ">
      <Button
        className="flex items-center justify-center gap-5"
        onClick={() => setShowProfile(!showProfile)}
      >
        <Avatar
          alt="Remy Sharp"
          sx={{ bgcolor: deepPurple[500], width: "50px", height: "50px" }}
          component="div"
        />
      </Button>
      {showProfile ? (
        <div className="absolute right-0 ">
          <Card
            title={name}
            email={email}
            age={age}
            image="/img/profile.jpg"
            HandlerLogoutClick={HandlerLogoutClick}
            HandlerProfileClick={handleProfileClick}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Profile;
