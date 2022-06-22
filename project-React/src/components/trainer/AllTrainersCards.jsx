import React, { useState, useEffect } from "react";
import TemplateCardTrainer from "./templateCardTrainer";
import { toast } from "react-toastify";
import userService from "../../services/userService/userService";
import trainerService from "../../services/dogTrainer/cardServiceDogTrainer";
import AllCards from "../common/allCards";

const AllTrainersCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  //get inforamtion about user's cuurent card
  const getUserInf = async (user_id) => {
    try {
      let user = "";
      user = await userService.getInfoUserById(user_id);
      return user.data;
    } catch (response) {
      // ToastContainer
      toast.error(response.data, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const getAllTrainer = async () => {
    try {
      let cards = [];
      setLoading(true);
      let trainer = await trainerService.getAllCards();

      for (let i = 0; i < trainer.data.length; i++) {
        let user = await getUserInf(trainer.data[i].user_id);

        cards.push({ card: trainer.data[i], user: user[0] });
      }

      setCards(cards);

      setLoading(false);
    } catch ({ response }) {
      // ToastContainer
      toast.error(response.data, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    getAllTrainer();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="Container">
        <div className="row">
          <div className="col-sm-12 col-md-3 "></div>
          <div className="col-sm-12 col-md-6 text-center mt-5">
            <h1 className="alert align-items center">
              כדי לצפות בעמוד מאלפים <br />
              יש להתחבר לשירות 🐶
            </h1>
          </div>
          <div className="col-sm-12 col-md-3 "></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-center">
        <img
          className="d-block col-12 mx-auto mb-4"
          src="https://img.freepik.com/free-photo/happiness-cute-sweet-puppy-maltipoo-brown-dog-pet-posing-isolated-white-wall-concept-motion-pets-love-animal-life-looks-happy-funny-copyspace-ad-playing-running_155003-36749.jpg?t=st=1655154413~exp=1655155013~hmac=77b563dab91baabf4812a8886c8df8d4b874c6495d4a9599869b8f0e678642dd&w=1380"
          alt="dog jumping"
          style={{ width: "100%" }}
        />
        <h1 className="display-5 fw-bold">
          המאלפים של <span>DOGIT</span>
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            כאן תוכלו למצוא רשימה של מאלפים ומאלפות שיהיו שמחים לתת לכם קצת
            מהידע שלהם ויעזרו לכלבייכם בכל צורה או בעיה שיש להם, כל מה שנשאר לכם
            לעשות הוא רק לבחור את הבנאדם המתאים עבורכם.
          </p>
          <hr />
        </div>
      </div>
      <AllCards
        Comp={TemplateCardTrainer}
        cards={cards}
        loading={loading}
        numberPage={6}
        Message={"עדיין אין כרטיסים במערכת.. 🤷‍♂️"}
        NameCards={"כרטיסי מאלפים"}
      />
    </>
  );
};

export default AllTrainersCards;
