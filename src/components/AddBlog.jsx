import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  Input,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { BaseUrl } from "../BaseUrl";
import { useNavigate } from "react-router-dom";

//toast
import {  toast } from "react-toastify";

function AddBlog() {
  //state
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: null,
  });

  // taking values from input field
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };
  console.log(inputs);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    try {
      if (!inputs.title || !inputs.description || !inputs.image) {
        return toast.warn("all fields required", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("image", inputs.image);
      formData.append("user", id);

      const response = await axios.post(`${BaseUrl}/blogs/new-blog`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        navigate("/all-blogs");
        toast.success("Blog added successfully", {
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
      style={{ display: "flex", justifyContent: "center", minHeight: "72vh" }}
    >
      <Box
        border={3}
        borderColor="gray"
        borderRadius={10}
        padding="20px"
        boxShadow="10px 10px 20px #ccc"
        p={3}
        margin={5}
        display="flex"
        flexDirection="column"
        width="80%"
      >
        <Typography
          color={"gray"}
          textAlign={"center"}
          variant="h3"
          fontWeight={"bold"}
          p={3}
        >
          Add Your Blog
        </Typography>
        <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" }}>
          Title
        </InputLabel>
        <TextField
          onChange={handleChange}
          value={inputs.title}
          name="title"
          margin="auto"
          variant="outlined"
        />
        <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" }}>
          Description
        </InputLabel>
        <TextField
          onChange={handleChange}
          value={inputs.description}
          name="description"
          margin="auto"
          variant="outlined"
        />
        <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" }}>
          Image
        </InputLabel>
        <Input
          type="file"
          onChange={handleChange}
          name="image"
          margin="auto"
          variant="outlined"
        />
        <Button
          onClick={() => handleSubmit()}
          type="submit"
          variant="contained"
          sx={{ mt: 4, mb: 2, backgroundColor: "green" }}
        >
          Post
        </Button>
      </Box>
    </div>
  );
}

export default AddBlog;
