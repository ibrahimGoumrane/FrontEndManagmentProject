import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

interface ListSkillsProps {
  skills: string[];
}

export default function ListSkills({ skills }: ListSkillsProps) {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="secondary mailbox folders">
        <List>
          {skills.map((skill, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  fontFamily: "fantasy",
                  fontSize: "20px",
                  fontWeight: "semibold",
                }}
              >
                {index + 1} . {skill}
              </Typography>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
