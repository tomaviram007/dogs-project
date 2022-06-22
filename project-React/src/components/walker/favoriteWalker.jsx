// import SearchBar from "../searchBar";

import TemplateCardWalker from "./templateCardWalker";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import cardService from "../../services/dogWalker/cardServiceDogWalker";
import AllCards from "../common/allCards";

const FavoriteWalker = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  //get all favorite walkers
  const getAllWalkers = async () => {
    try {
      let myCards = [];
      setLoading(true);
      myCards = await cardService.getAllFavoriteWalker();
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
    getAllWalkers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <h1>טוען כרטיסי מאלפים מועדפים עליך...</h1>;
  }

  return (
    //Comp, cards, setUpdatePage, loading, numberPage }
    <AllCards
      Comp={TemplateCardWalker}
      cards={cards}
      setUpdatePage={true}
      loading={loading}
      numberPage={2}
      Message={"עדיין לא סימנת מועדפים.. 🤷‍♂️ בדוגווקר"}
      NameCards={"כרטיסי הדוג-ווקר המועדפים עליי"}
    />
  );
};

export default FavoriteWalker;
