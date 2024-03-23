import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import { Box, IconButton } from "@mui/material";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function BlogCard({
  title,
  imageUrl,
  description,
  createdAt,
  id,
  name,
  showButtons = false,
}) {
  const navigate = useNavigate();

  // function for converting date string to date
  const getFormattedDate = (date) => {
    const newDate = new Date(date);
    return newDate.toDateString();
  };

  //route for edit and api delete
  const handleEdit = (id) => {
    navigate(`/blog/edit-blog/${id}`);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${BaseUrl}/blogs/delete-blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(id, "inside the delete blog");
      if (response) {
         window.location.reload();
        toast.success(`blog with${id} removed`, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    } catch (error) {
      window.location.reload();
      console.log(error);
    }
  };

  return (
    <div>
      <Card
        sx={{
          width: "50%",
          margin: "auto",
          mt: 3,
          mb: 3,
          p: 3,
          boxShadow: "5px 5px 10px #ccc",
          transition: "box-shadow 0.3s ease",
          ":hover": {
            boxShadow: "5px 5px 15px #aaa",
          },
          borderRadius: 5,
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {name.charAt(0)}
            </Avatar>
          }
          title={title}
          subheader={getFormattedDate(createdAt)}
        />
        <CardMedia
          component="img"
          style={{ height: "auto", width: "100%" }}
          image={imageUrl}
          alt={title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <h5>Author:{name}</h5>
          </Typography>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        {showButtons && id && (
          <Box display={"flex"} justifyContent={"flex-end"}>
            <IconButton>
              <ModeEditOutlineIcon
                style={{ color: "blue" }}
                onClick={() => handleEdit(id)}
              />
            </IconButton>
            <IconButton>
              <DeleteIcon
                style={{ color: "red" }}
                onClick={() => handleDelete(id)}
              />
            </IconButton>
          </Box>
        )}
      </Card>
    </div>
  );
}

export default BlogCard;
