import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import walkerService from "../../services/dogWalker/cardServiceDogWalker";
import { useCookies } from "react-cookie";
import config from "../../config.json";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { toast } from "react-toastify";
import ShowClock from "../clockMeet/showClock";

//card: contain details about cardWalker
//setUpdatePage:update favorite page when delete it from favorite
const TemplateCardWalker = ({ card, setUpdatePage }) => {
  const [cookies] = useCookies(["data"]);
  const [load, setLoad] = useState({});

  //variable its contains true if the card in the favorite
  const [cardFv, setCardFv] = useState(null);

  // check if current card exists in the current user.
  const checkExistFavoriteCard = async () => {
    try {
      setLoad(true);

      let flag = await walkerService.checkFavoriteCard(card.card._id);

      setCardFv(flag);
      setLoad(false);
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

  //add  curent card on the favorite
  const addFavoriteCard = async () => {
    try {
      if (!card) {
        return;
      }

      await walkerService.addFavoriteCard({
        fDogWalker: [card.card._id],
      });
      setCardFv({ data: true });
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
  // delete from favorite cards
  const deleteFavoriteCard = async () => {
    try {
      if (!card) {
        return;
      }
      await walkerService.deleteFavoriteCard({
        fDogWalker: [card.card._id],
      });

      setCardFv({ data: false });
      if (setUpdatePage) {
        window.location = "/favoriteWalker";
      }
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
    checkExistFavoriteCard();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (load) {
    return <h1>טוען כרטיסי דוגווקר...</h1>;
  }

  return (
    <>
      <div className="borderStyle row">
        {/* buttons */}
        <div className="row">
          {/* buttons */}
          <div className="col-4  justify-content-center">
            {/* delete */}
            {card && card.card.user_id === cookies.data._id && (
              <Link
                className="ml-1 "
                to={`/deleteCardWalker/${card.card._id}/profile`}
              >
                <button type="button" className="btnDelete ">
                  <i className="bi bi-trash"></i>
                </button>
              </Link>
            )}

            {/* edit button */}
            {card && card.card.user_id === cookies.data._id && (
              <Link to={`/editCardWalker/${card.card._id}/profile`}>
                <b>
                  <button type="button" className="m-1 btnEdit">
                    <i className="bi bi-pen"></i>
                  </button>
                </b>
              </Link>
            )}
          </div>
          <div className="col-4 mb-3 text-center">
            {/* profile image of the profile */}
            <img
              className="zoomOut"
              src={
                card.user.image
                  ? `${config.pictureUrl}${card.user._id}.jpg`
                  : config.defaultImage
              }
              alt="profile pic"
            />
          </div>
          <div className="col-4 text-center">
            {/* favorite Buttons */}
            {cardFv &&
              !cardFv.data &&
              card &&
              card.card.user_id !== cookies.data._id && (
                <button
                  type="button"
                  className="Favorite_btn "
                  onClick={addFavoriteCard}
                >
                  <BsHeart />
                </button>
              )}
            {cardFv && cardFv.data && card.card.user_id !== cookies.data._id && (
              <button
                type="button"
                className="FavoriteDele_btn"
                onClick={deleteFavoriteCard}
              >
                <BsFillSuitHeartFill />
              </button>
            )}
          </div>
        </div>
        {/* card profile info */}
        <div className="row justify-content-center">
          <div className="col-12 text-center borderStyleColor">
            <h2>{card.user.firstName}</h2>
            <h5> {`עלות : ${card.card.cost} ₪`} </h5>
            <h5> {`טלפון : ${card.user.phone}`}</h5>
            <h5> {`אימייל : ${card.user.email}`}</h5>
          </div>
        </div>
        <div className="row">
          <h4 className="text-primary">שעות פעילות:</h4>
          <ShowClock className="col-12" clock={card.card.meets} />
        </div>
        {/* Tags */}
        <div className="row ">
          <div className="col-12 text-center mt-3 justify-content-center">
            {card.card.tags.map((tag) => {
              return (
                <button
                  key={tag}
                  onClick={() => {
                    window.location = `/serchTagWalker/${tag}`;
                  }}
                  type="button"
                  className="tags "
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
        <hr />
        {/* contact user */}
        <div className="row justify-content-center mt-3">
          <div className="col-12 text-center  mb-3">
            <button
              type="button"
              className=" buttonEmail "
              onClick={() => (window.location = `mailto:${card.user.email}`)}
            >
              <i className="bi bi-envelope contactMeStyle "></i>
            </button>
            {/* send Whatsapp massage */}
            <button
              type="button"
              className=" buttonWhatsapp "
              onClick={() =>
                (window.location = `https:api.whatsapp.com/send?phone=${card.user.phone}`)
              }
            >
              <i className="bi bi-whatsapp"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default TemplateCardWalker;
