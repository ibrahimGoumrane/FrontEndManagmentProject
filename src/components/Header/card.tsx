import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  ThemeProvider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
interface CardProps {
  title: string;
  email: string;
  image: string;
  age: number;
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
  email,
  image,
  age,
  HandlerProfileClick,
  HandlerLogoutClick,
}: CardProps) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-xl font-extrabold  capitalize text-center italic  text-purple-900  "
            >
              {title}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-xl font-extrabold  capitalize text-center italic  text-purple-900"
            >
              age : {age}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              email : {email}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* <Typography
            sx={{
              borderBottom: 4,
              borderRadius: "16px",
              padding: "10px",
              display: "block",
              width: "100%",
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "700",
              color: "black",
            }}
          >
            <Link to="/todo">Todo</Link>
          </Typography> */}
        </CardActions>
        <CardActions className="flex items-center justify-between">
          <Button
            variant="contained"
            color="success"
            onClick={HandlerProfileClick}
            fullWidth={true}
          >
            <Link to="/profile">Profile</Link>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={HandlerLogoutClick}
            fullWidth={true}
          >
            Logout
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
