import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../BaseUrl";
import BlogCard from "./BlogCard";

function Blogs() {
  // setting the state
  const [blogs, setBlogs] = useState([]);

  //api call for getting all the blogs
  const fetchBlogs = async () => {
    try {
      //getting token from local storage
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const response = await axios.get(`${BaseUrl}/blogs/all-blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []); 
    useEffect(() => {
      console.log(blogs);
    }, [blogs]); 

  return (
    <div style={{ minHeight: "72vh" }}>
      {blogs &&
        blogs?.map((blog) => (
          <BlogCard
            name={blog.user.name}
            key={blog._id}
            title={blog.title}
            createdAt={blog.createdAt}
            imageUrl={`http://localhost:5000/images/${blog.image}`}
            description={blog.description}
          />
        ))}
    </div>
  );
}

export default Blogs;
