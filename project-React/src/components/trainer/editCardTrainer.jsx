import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import Meets from "../clockMeet/Meets";
import cardService from "../../services/dogTrainer/cardServiceDogTrainer";
import commonService from "../../services/commonService";
import { useParams } from "react-router-dom";

function EditCardTrainer({ cardId, location }) {
  const params = useParams();
  let val = cardId ? cardId : params.id;
  let loc = location ? location : params.location;
  const [days, setDays] = useState("");
  const [errorDay, setErrorDay] = useState("");
  const [load, setLoad] = useState(true);
  const [errorServ, setErrorServ] = useState("");
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
    return <h1>הב הב..טוענים מידע</h1>;
  }

  return (
    <>
      {card && (
        <Formik
          initialValues={
            {
              experience: card?.experience,
              trainWay: card?.trainWay,
              cost: card?.cost,
              timeTrain: card?.timeTrain,
              tags: commonService.arrayToTags(card?.tags),
            } || {
              experience: "",
              trainWay: "",
              timeTrain: "",
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
            // validation for timeTrain
            if (!values.timeTrain) {
              errors.timeTrain = "שדה זה חובה למילוי";
            }

            return errors;
          }}
          //pic validation
          onSubmit={async (values) => {
            try {
              setErrorServ("");
              setErrorDay("");
              let err = commonService.validateDays(days);

              if (err) {
                setErrorDay(err);
                return;
              }

              await cardService.editCard(val, {
                experience: values.experience,
                timeTrain: values.timeTrain,
                trainWay: values.trainWay,
                cost: values.cost,
                tags: commonService.tagsToArray(values.tags),
                meets: days,
              });

              window.location = `/${loc}`;
            } catch ({ response }) {
              setErrorServ(response.data);
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
            <div className="container row ">
              <form onSubmit={handleSubmit} className="form-container">
                <div className="col-12">
                  <br />
                  <h3>מאלף</h3>
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
                    <label htmlFor="timeTrain">משך זמן האילוף</label>
                    <select
                      name="timeTrain"
                      id="timeTrain"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.timeTrain}
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
                    {errors.timeTrain && touched.timeTrain ? (
                      <div>{errors.timeTrain}</div>
                    ) : null}
                    <br />
                    <br />

                    <label htmlFor="cost" className="mt-3">
                      עלות אילוף:
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
                    <label htmlFor="trainWay" className="mt-3">
                      שיטת אילוף:
                    </label>
                    <br />
                    <select
                      name="trainWay"
                      id="trainWay"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.trainWay}
                      className="mt-2 mb-5"
                    >
                      <option value="">בחר/י</option>
                      <option value="true">Force-Free - חיזוק חיובי בלבד</option>
                      <option value="false">New Classic - שילוב חיזוק חיובי ושלילי</option>
                    </select>
                    {errors.trainWay && touched.trainWay ? (
                      <div>{errors.trainWay}</div>
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
                  </div>

                  <br />
                  <div className="row">
                    <button
                      className="submit"
                      type="submit"
                      id="regButton"
                      disabled={isSubmitting}
                    >
                      עדכון כרטיס
                    </button>
                    {errorServ && (
                      <div className="text-danger">{errorServ}</div>
                    )}
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

export default EditCardTrainer;
