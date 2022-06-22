import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import Meets from "../clockMeet/Meets";
import cardService from "../../services/dogWalker/cardServiceDogWalker";
import commonService from "../../services/commonService";
import { useParams } from "react-router-dom";

function EditCardWalker({ cardId, location }) {
  const params = useParams();
  let loc = location ? location : params.location;
  let val = cardId ? cardId : params.id;
  const [days, setDays] = useState("");
  const [errorDay, setErrorDay] = useState("");
  const [load, setLoad] = useState(true);
  const [card, setCard] = useState("");

  const getData = async () => {
    try {
      setLoad(true);
      val = await cardService.getCard(val);
      setCard(val.data[0]);
      setDays(val.data[0].meets);
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

  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (load) {
    return <h1>טוען תוכן ..</h1>;
  }

  return (
    <>
      {card && (
        <Formik
          initialValues={
            {
              experience: card?.experience,
              timeWalker: card?.timeWalker,
              cost: card?.cost,
              tags: commonService.arrayToTags(card?.tags),
            } || {
              experience: "",
              timeWalker: "",
              cost: "",
              tags: "",
            }
          }
          validate={(values) => {
            const errors = {};

            if (!values.experience) {
              errors.experience = "שדה זה חובה למילוי";
            } else if (values.experience < 0 || values.experience > 100) {
              errors.experience = "ניסיון אינו תקין";
            }
            if (!values.cost) {
              errors.cost = "שדה זה חובה למילוי";
            }
            // validation for timeWalker
            if (!values.timeWalker) {
              errors.timeWalker = "שדה זה חובה למילוי";
            }

            return errors;
          }}
          //pic validation
          onSubmit={async (values) => {
            try {
              setErrorDay("");
              let err = commonService.validateDays(days);

              if (err) {
                setErrorDay(err);
                return;
              }

              await cardService.editCard(val, {
                experience: values.experience,
                timeWalker: values.timeWalker,
                cost: values.cost,
                tags: commonService.tagsToArray(values.tags),
                meets: days,
              });

              window.location = `/${loc}`;
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
          }}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            // form inputs
            <div className="container ">
              <form onSubmit={handleSubmit} className="form-container ">
                <div className="col-12">
                  <h3>דוגווקר</h3>
                  <br />
                  <label htmlFor="experience" className="mt-4">
                    ניסיון בשנים
                  </label>
                  <br />
                  <input
                    className="tagsInput"
                    type="number"
                    name="experience"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.experience}
                    placeholder="ניסיון בשנים"
                  />
                  {errors.experience && touched.experience ? (
                    <div>{errors.experience}</div>
                  ) : null}
                  <br />
                  <br />
                  <div className="row">
                    <label htmlFor="timeWalker">משך זמן טיול</label>
                    <br />
                    <select
                      name="timeWalker"
                      id="timeWalker"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.timeWalker}
                    >
                      <option value="">בחר/י</option>
                      <option value="15">15 דק</option>
                      <option value="20">20 דק</option>
                      <option value="25">25 דק</option>
                      <option value="30">30 דק</option>
                      <option value="35">35 דק</option>
                      <option value="40">40 דק</option>
                      <option value="45">45 דק</option>
                      <option value="50">50 דק</option>
                      <option value="55">55 דק</option>
                      <option value="60">60 דק</option>
                    </select>
                    {errors.timeWalker && touched.timeWalker ? (
                      <div>{errors.timeWalker}</div>
                    ) : null}
                    <br />
                    <br />
                    <label htmlFor="cost" className="mt-3">
                      עלות טיול:
                    </label>
                    <br />
                    <select
                      name="cost"
                      id="cost"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cost}
                    >
                      <option value="">בחר/י</option>
                      <option value="150 - 250">150 - 250</option>
                      <option value="250 - 350">250 - 350</option>
                      <option value="450+">450+</option>
                    </select>
                    {errors.cost && touched.cost ? (
                      <div>{errors.cost}</div>
                    ) : null}
                    <br />
                    <br />
                    <div className="meets mt-3">
                      {days && <Meets setDays={setDays} days={days} />}
                      {errorDay && (
                        <div className="text-danger">{errorDay}</div>
                      )}
                    </div>
                    <br />

                    <label>תגיות חיפוש</label>
                    <br />
                    <input
                      className="tagsInput"
                      type="text"
                      name="tags"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tags}
                      placeholder="הכנס תגיות מופרדות בפסיקים :','"
                    />

                    {errors.tags && touched.tags ? (
                      <div>{errors.tags}</div>
                    ) : null}
                    <br />
                    <br />

                    <button
                      className="submit"
                      type="submit"
                      id="regButton"
                      disabled={isSubmitting}
                    >
                      עדכון כרטיס
                    </button>
                  </div>
                </div>
              </form>
              <button
                className="mt-3 col-12 btn btn-danger "
                onClick={() => (window.location = `/${loc}`)}
              >
                ביטול
              </button>
            </div>
          )}
        </Formik>
      )}
    </>
  );
}

export default EditCardWalker;
