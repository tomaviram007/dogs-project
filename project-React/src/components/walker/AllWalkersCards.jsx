import TemplateCardWalker from "./templateCardWalker";
import React, { useState, useEffect } from "react";
import walkerService from "../../services/dogWalker/cardServiceDogWalker";
import { toast } from "react-toastify";
import userService from "../../services/userService/userService";
import AllCards from "../common/allCards";

const AllWalkersCards = () => {
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

  const getAllWalkers = async () => {
    try {
      let cards = [];
      setLoading(true);
      let walker = await walkerService.getAllCards();

      for (let i = 0; i < walker.data.length; i++) {
        let user = await getUserInf(walker.data[i].user_id);

        cards.push({ card: walker.data[i], user: user[0] });
      }

      setCards(cards);

      setLoading(false);
    } catch ({ response }) {
      // ToastContainer
      toast.error("לא התחברת לא יהיה תוכן! 😯", {
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
    getAllWalkers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="Container">
        <div className="row">
          <div className="col-sm-12 col-md-3 "></div>
          <div className="col-sm-12 col-md-6 text-center mt-5">
            <h1 className="alert align-items center">
              כדי לצפות בעמוד דוגווקרים <br />
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
      <div className=" text-center">
        <img
          className="d-block col-12 mx-auto mb-4"
          src="https://img.freepik.com/free-photo/portrait-cute-looking-calm-dog-cocker-spaniel-posing-isolated-white-background-smiling-doggie_155003-45836.jpg?t=st=1655154261~exp=1655154861~hmac=ee28694ea6859ceedf8f6a59548f72833c09e9739d2155aeb1bb6e10fd2fd8a6&w=1380"
          alt="A staring dog"
          style={{ width: "100%" }}
        />
        <h1 className="display-5 fw-bold">
          הדוגווקרים של <span>DOGIT</span>
        </h1>
        <div className="col-lg-8 mx-auto">
          <p className="lead mb-4">
            כאן תוכלו למצוא רשימה של דוגווקרים שיהיו שמחים לתת יד, ולהוציא את
            כלביכם בזמן שאתם לא יכולים. אם אתם בעבודה עד מאוחר, רוצים לצאת לשתות
            בירה או בחו"ל בנסיעת עבודה או סתם בחופשה קצרה. כל מה שנשאר לכם לעשות
            זה לבחור מבין הרשימה את הבנאדם המתאים וליצור איתו קשר.
          </p>
          <hr />
        </div>
      </div>

      <AllCards
        Comp={TemplateCardWalker}
        cards={cards}
        loading={loading}
        numberPage={6}
        Message={"עדיין אין כרטיסים במערכת.. 🤷‍♂️"}
        NameCards={"כרטיסי דוג ווקר"}
      />
    </>
  );
};

export default AllWalkersCards;
