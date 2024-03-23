import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";
import BlogCard from "./BlogCard";
import { Box } from "@mui/material";

function AuthorBlogs() {
  const [userInfo, setUserInfo] = useState({});
  const { id } = useParams();
  const token = localStorage.getItem("token");

  //making api call
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/user/author/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log("User info:", response.data);
        setUserInfo(response.data.blogs);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(userInfo);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "72vh",
      }}
    >
      <Box textAlign={"center"} margin={"30px"}>
        <h1>Blogs by {userInfo.name}</h1>
      </Box>
      <Box>
        {userInfo && userInfo.blogs && userInfo.blogs.length > 0 ? (
          userInfo.blogs.map((blog) => (
            <BlogCard
              name={userInfo.name}
              key={blog._id}
              id={blog._id}
              title={blog.title}
              description={blog.description}
              imageUrl={`http://localhost:5000/images/${blog.image}`}
              createdAt={blog.createdAt}
            />
          ))
        ) : (
          <h3 style={{ color: "green", textAlign: "center" }}>
            No posts added by the author yet.
          </h3>
        )}
      </Box>
    </div>
  );
}

export default AuthorBlogs;
