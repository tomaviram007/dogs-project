// import SearchBar from "../searchBar";

import TemplateCardWalker from "./templateCardWalker";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import cardService from "../../services/dogWalker/cardServiceDogWalker";
import AllCards from "../common/allCards";
import { useParams } from "react-router-dom";

const SerchWalkerTags = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  //get all favorite walkers
  const getAllCard = async () => {
    try {
      let myCards = [];
      setLoading(true);
      myCards = await cardService.getCardsByTag(params.tag);
      setCards(myCards.data);

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
    getAllCard();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <h1>טוען...</h1>;
  }

  if (!params.tag) {
    return <h1>לא נשלח תאג לחיפוש </h1>;
  }

  return (
    //Comp, cards, setUpdatePage, loading, numberPage }
    <AllCards
      Comp={TemplateCardWalker}
      cards={cards}
      loading={loading}
      numberPage={4}
      Message={"אין כרטיסים עם התאג שרצית"}
      NameCards={"חיפוש לפי תאג בכרטיסי דוג ווקר"}
    />
  );
};

export default SerchWalkerTags;
