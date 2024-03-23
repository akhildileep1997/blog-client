import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../BaseUrl";
import { useNavigate } from 'react-router-dom'
import "./Style.css";

function Authors() {
  const navigate = useNavigate()
  const [author, setAuthor] = useState([]);

  const getAllAuthors = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BaseUrl}/user/all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        setAuthor(response.data.users);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllAuthors();
    console.log(author);
  }, []);

  return (
    <div style={{ minHeight: "72vh" }}>
      <div style={{textAlign:'center',margin:'10px'}}><h1>Authors</h1></div>
      <div className="main-layout">
        {author.map((user, index) => (
          <div
            onClick={() => navigate(`/author/${user._id}`)}
            className="main"
            key={index}
          >
            <div className="start">{user.name.charAt(0)}</div>
            <div className="name">{user.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Authors;
