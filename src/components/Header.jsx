import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Person2Icon from "@mui/icons-material/Person2";

function Header() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  // for switching the tabs
  const [value, setValue] = useState();

  //for logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    localStorage.clear();
    window.location.reload();
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "green" }}>
      <Toolbar>
        <Typography variant="h5">Plot-Point</Typography>
        {token && (
          <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
            <Tabs value={value} onChange={(e, val) => setValue(val)}>
              <Tab
                LinkComponent={Link}
                to="/all-blogs"
                style={{ color: "white" }}
                label="All Blogs"
              />
              <Tab
                LinkComponent={Link}
                to="/blog/new-blog"
                style={{ color: "white" }}
                label="Add-Blog"
              />
              <Tab
                LinkComponent={Link}
                to="/my-blogs"
                style={{ color: "white" }}
                label="My Blogs"
              />
              <Tab
                LinkComponent={Link}
                to="/authors"
                style={{ color: "white" }}
                label="Authors"
              />
            </Tabs>
          </Box>
        )}
        {token && <p style={{ margin: "5px" }}><Person2Icon /> {name}</p>}
        <Box display="flex" marginLeft="auto">
          {!token && (
            <>
              {" "}
              <Button
                LinkComponent={Link}
                to="/login"
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "orange",
                  color: "#e8eaf6",
                }}
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/register"
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "blue",
                  color: "#e8eaf6",
                  marginLeft: "20px",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
          {token && (
            <Button
              onClick={() => handleLogout()}
              variant="contained"
              sx={{
                borderRadius: "10px",
                backgroundColor: "red",
                color: "#e8eaf6",
                marginLeft: "20px",
              }}
            >
              Log-Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
