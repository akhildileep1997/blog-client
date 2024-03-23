import { Box, Button } from "@mui/material";
import React from "react";
import image from "../Assets/image.png";
import "./Style.css";
import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()
  return (
    <div className="landing-main">
      <Box marginRight={5}>
        <h1 style={{ textAlign: "justify" }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro rerum,
          accusantium incidunt expedita, animi consequatur delectus deleniti
          voluptate, mollitia exercitationem et quidem perspiciatis? Odio
          molestias cupiditate doloribus id saepe commodi!
        </h1>
        <Button onClick={()=>navigate('/register')} className="button">
          Create Account
        </Button>
      </Box>

      <Box>
        <img height={"600px"} src={image} alt="" srcset="" />
      </Box>
    </div>
  );
}

export default Landing;
