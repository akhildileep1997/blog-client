import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../BaseUrl";
import { toast } from "react-toastify";

function Login() {
  // for navigating
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  //for taking the values from input field
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // api calling to send data
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BaseUrl}/user/login`, {
        email: inputs.email,
        password: inputs.password,
      });
      if (response) {
             localStorage.setItem("token", response.data.token);
             localStorage.setItem("id", response.data.user._id);
             localStorage.setItem("name", response.data.user.name);
             console.log(response);
             navigate("/all-blogs");
             window.location.reload();
             toast.success(`${response.data.message}`, {
               position: "top-right",
               autoClose: 5000,
               theme: "dark",
             });
      } else {
        toast.error("incorrect userId or password", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
     }
    } catch (error) {
      console.log(error);
    }
  };

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
          Login
        </Typography>
        <TextField
          onChange={handleChange}
          value={inputs.email}
          name="email"
          type="email"
          placeholder="Email"
          margin="normal"
        />
        <TextField
          onChange={handleChange}
          value={inputs.password}
          name="password"
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
          Login
        </Button>
        <div style={{ marginBottom: "15px", marginTop: "15px" }}>
          Don't have an account |{" "}
          <Button onClick={() => handleClick()}>sign up</Button>
        </div>
      </Box>
    </div>
  );
}

export default Login;
