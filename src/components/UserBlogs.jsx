import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../BaseUrl";
import BlogCard from "./BlogCard";

function UserBlogs() {
  // setting the state
  const [userInfo, setUserInfo] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    //making api call to fetch the data
    const id = localStorage.getItem("id");
    try {
      const response = await axios.get(
        `${BaseUrl}/blogs/user/all-blogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        console.log("particular user blogs", response.data.blogs);
        setUserInfo(response.data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "72vh",
      }}
    >
      {userInfo &&
        userInfo.map((user) => (
          <>
            {user &&
              user.blogs.map((blog) => (
                <>
                  <BlogCard
                    showButtons={true}
                    name={user.name}
                    id={blog._id}
                    title={blog.title}
                    description={blog.description}
                    imageUrl={`http://localhost:5000/images/${blog.image}`}
                    createdAt={blog.createdAt}
                  />
                </>
              ))}
          </>
        ))}
    </div>
  );
}

export default UserBlogs;
