import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate=useNavigate()
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{ maxWidth: 500, minWidth: 500 ,minWidth:500,maxWidth:500}}
          className="mt-5 card  shadow m-5"
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Welcome to Incubation
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navigate("/apply")}>APPLY</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default Home;
