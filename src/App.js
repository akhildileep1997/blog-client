import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Register from "./components/Register.jsx";
import Blogs from "./components/Blogs.jsx";
import UserBlogs from "./components/UserBlogs.jsx";
import BlogDetails from "./components/BlogDetails.jsx";
import AddBlog from "./components/AddBlog.jsx";
import Login from "./components/Login.jsx";
import Authors from "./components/Authors.jsx";
import AuthorBlogs from "./components/AuthorBlogs.jsx";
import Footer from "./components/Footer.jsx";
import Landing from "./components/Landing.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const token = localStorage.getItem('token')


  return (
      <React.Fragment>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            {token && token ? (
              <>
                <Route path="/all-blogs" element={<Blogs />} />
                <Route path="/my-blogs" element={<UserBlogs />} />
                <Route path="/blog/edit-blog/:id" element={<BlogDetails />} />
                <Route path="/blog/new-blog" element={<AddBlog />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/author/:id" element={<AuthorBlogs />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Landing />} />
              </>
            )}
          </Routes>
        </main>
        <footer>
          <Footer />
      </footer>
       <ToastContainer />
      </React.Fragment>
  );
}


export default App;
