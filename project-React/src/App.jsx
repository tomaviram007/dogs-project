import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
//import userService from "./services/userService/userService";

// CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./components/trainer/trainer.css";
import "./components/walker/walker.css";
import { ToastContainer } from "react-toastify";

// components
import Home from "./components/pages/home";

import SignUp from "./components/user/signUp";
import LoginTo from "./components/user/login";
import Logout from "./components/user/logOut";
import Article from "./components/allArticles/article";
import Navbar from "./components/common/navbar";
import AllwalkersCards from "./components/walker/AllWalkersCards";
import AllTrainersCards from "./components/trainer/AllTrainersCards";
import Profile from "./components/pages/profile";
import TemplateCardWalker from "./components/walker/templateCardWalker";
import TemplateCardTrainer from "./components/trainer/templateCardTrainer";
import CardTrainer from "./components/trainer/templateCardTrainer";
import CreateCardTrainer from "./components/trainer/createCardTrainer";
import CreateCardWalker from "./components/walker/createCardWalker";
import DeleteCardWalker from "./components/walker/deleteCardWalker";
import DeleteCardTrainer from "./components/trainer/deleteCardTrainer";
import EditCardWalker from "./components/walker/editCardWalker";
import EditCardTrainer from "./components/trainer/editCardTrainer";
import EditUser from "./components/user/editUser";
import ContactUs from "./components/pages/contactUs";
import FavoriteWalker from "./components/walker/favoriteWalker";
import FavoriteTrainer from "./components/trainer/favoriteTrainer";
import SerchWalkerTags from "./components/walker/serchWalkerTags";
import SerchTrainerTags from "./components/trainer/serchTrainerTags";
import ForgotEmail from "./components/user/frogotEmail";
import UpdatePassword from "./components/user/updatePassword";
import AllUsers from "./components/user/allUsers";
import AllUsersOnline from "./components/user/allUsersOnline";
import OutSideTheHome from "./components/allArticles/outSideTheHome";
import Famousdogsinhistory from "./components/allArticles/Famousdogsinhistory";
import SelectingMyDog from "./components/allArticles/selectingMyDog";
import ProtectAdmin from "./components/user/protectAdmin";
import AboutUs from "./components/pages/about_us";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/login" element={<LoginTo />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/article" element={<Article />} />
          <Route path="/A-dog-pees" element={<OutSideTheHome />} />
          <Route
            path="/Famous_dogs_in_history"
            element={<Famousdogsinhistory />}
          />
          <Route path="/selectingMyDog" element={<SelectingMyDog />} />
          <Route path="/dogwalker" element={<AllwalkersCards />} />
          <Route path="/dogtrainer" element={<AllTrainersCards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/templateCardWalker" element={<TemplateCardWalker />} />
          <Route
            path="/templateCardTrainer"
            element={<TemplateCardTrainer />}
          />
          <Route path="/cardTrainer" element={<CardTrainer />} />
          <Route path="/createCardTrainer" element={<CreateCardTrainer />} />
          <Route path="/createCardWalker" element={<CreateCardWalker />} />
          <Route path="/aboutUs" element={<AboutUs />} />

          <Route
            path="/deleteCardWalker/:id/:location"
            element={<DeleteCardWalker />}
          />
          <Route
            path="/deleteCardTrainer/:id/:location"
            element={<DeleteCardTrainer />}
          />
          <Route
            path="/editCardWalker/:id/:location"
            element={<EditCardWalker />}
          />
          <Route
            path="/editCardTrainer/:id/:location"
            element={<EditCardTrainer />}
          />
          <Route path="/editUser/:id/:location" element={<EditUser />} />
          <Route path="/favoriteWalker" element={<FavoriteWalker />} />
          <Route path="/favoriteTrainer" element={<FavoriteTrainer />} />
          <Route path="/serchTagWalker/:tag" element={<SerchWalkerTags />} />
          <Route path="/serchTagTrainer/:tag" element={<SerchTrainerTags />} />
          <Route path="/sendEmail" element={<ForgotEmail />} />
          <Route
            path="/reset-password/:id/:token"
            element={<UpdatePassword />}
          />
          <Route
            path="/allUsers"
            element={
              <ProtectAdmin admin>
                <AllUsers />
              </ProtectAdmin>
            }
          />
          <Route path="/allUsersOnline" element={<AllUsersOnline />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
