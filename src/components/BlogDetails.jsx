import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";
import {
  Box,
  Button,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

function BlogDetails() {
  // defining state
  const [blog, setBlog] = useState({});

  //for getting id
  const { id } = useParams();
  console.log(id, "coming from params");

  // calling api to get that post
  const token = localStorage.getItem("token");
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        setBlog(response.data.blog);
        setInputs({
          title: response.data.blog.title,
          description: response.data.blog.description,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  //state for form inputs
  const [inputs, setInputs] = useState({});

  // taking values from input fields
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle file input change
  const handleFileChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  //api for updating
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);
    if (inputs.image) {
      formData.append("image", inputs.image);
    }

    try {
      const response = await axios.post(
        `${BaseUrl}/blogs/update-your-blog/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
            navigate("/all-blogs");
        toast.success("Blog updated successfully", {
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
    <>
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
            Update Your Blog
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            onChange={handleChange}
            value={inputs.title || ""}
            name="title"
            margin="auto"
            variant="outlined"
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            onChange={handleChange}
            value={inputs.description || ""}
            name="description"
            margin="auto"
            variant="outlined"
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" }}
          >
            Image
          </InputLabel>
          <Input
            type="file"
            onChange={handleFileChange}
            name="image"
            margin="auto"
            variant="outlined"
          />
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            sx={{ mt: 4, mb: 2, backgroundColor: "green" }}
          >
            Update
          </Button>
        </Box>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <img src={`${BaseUrl}/images/${blog.image}`} alt={blog.title} />
      </div>
    </>
  );
}

export default BlogDetails;
