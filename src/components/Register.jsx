import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { BaseUrl } from "../BaseUrl";
import { toast } from "react-toastify";

function Register() {
  // for navigating
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };


  // for taking the values
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  //for submitting the form
  const handleSubmit = async() => {
try {
      const  data  = await axios.post(
        `${BaseUrl}/user/register`, {
          name: inputs.name,
          email: inputs.email,
          password:inputs.password
        }   
      );
  if (data) {
    navigate("/login");
    toast.success(`${data.data.message}`, {
      position: "top-right",
      autoClose: 5000,
      theme: "dark",
    });
}
} catch (error) {
  console.log(error);
}
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "72vh",
      }}
    >
      <Box
        width={450}
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        boxShadow={"10px 10px 20px #ccc"}
        padding={"3"}
        margin={"auto"}
        marginTop={5}
        borderRadius={5}
      >
        <Typography variant="h3" padding={3} textAlign={"center"}>
          Register
        </Typography>
        <TextField
          onChange={handleChange}
          name="name"
          value={inputs.name}
          placeholder="Name"
          margin="normal"
        />
        <TextField
          onChange={handleChange}
          name="email"
          value={inputs.email}
          type="email"
          placeholder="Email"
          margin="normal"
        />
        <TextField
          onChange={handleChange}
          name="password"
          value={inputs.password}
          type="password"
          placeholder="Password"
          margin="normal"
        />
        <Button
          onClick={() => handleSubmit()}
          type="submit"
          variant="contained"
          sx={{ borderRadius: 3, marginTop: 3 }}
          color="warning"
        >
          Register
        </Button>
        <div style={{ marginBottom: "15px", marginTop: "15px" }}>
          Already have an account |{" "}
          <Button onClick={() => handleClick()}>Log In</Button>
        </div>
      </Box>
    </div>
  );
}

export default Register;
