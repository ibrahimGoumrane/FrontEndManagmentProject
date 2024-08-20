import { Button, CardActionArea, ThemeProvider } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
interface CardProps {
  title: string;
  image: string;
  HandlerProfileClick: () => void;
  HandlerLogoutClick: () => void;
}

const theme = createTheme({
  palette: {
    primary: {
      main: purple[300],
    },
    secondary: {
      main: "#f44336",
    },
  },
});

export default function MultiActionAreaCard({
  title,
  image,
  HandlerProfileClick,
  HandlerLogoutClick,
}: CardProps) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ minWidth: 200, maxHeight: 500 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={image}
            height={100}
            alt="green iguana"
            className="rounded-md "
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-md  font-bold text-left  capitalize text-nowrap italic  text-purple-900 "
            >
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div className="flex flex-col items-center justify-center gap-3 p-3">
          <Button
            onClick={HandlerProfileClick}
            fullWidth={true}
            sx={{
              justifyContent: "left",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            <Link to="/profile">Profile</Link>
          </Button>
          <Button
            onClick={HandlerProfileClick}
            fullWidth={true}
            sx={{
              justifyContent: "left",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            <Link to="/profile/settings">Settings</Link>
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={HandlerLogoutClick}
            fullWidth={true}
            sx={{
              justifyContent: "left",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            Logout
          </Button>
        </div>
      </Card>
    </ThemeProvider>
  );
}
