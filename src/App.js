import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Tags, Registration, AddPost, Login, Profile, ProfilePost, EditProfile, AnotherProfile } from "./pages";
import React from "react";
import { GoOutConfirmAlert } from "./components/ConfirmAlert/GoOutConfirmAlert";




function App() {

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags/:tag" element={<Tags/>} />
          <Route path="/posts/:id" element={<FullPost/>} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id/posts" element={<ProfilePost />} />
          <Route path="/profile-edit" element={<EditProfile />} />
          <Route path="/profile/:id" element={<AnotherProfile />} />
          <Route path="/delete-alert" element={<GoOutConfirmAlert />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
