import userService from "../../services/userService/userService";
import { Container, Row, Col, Form } from "react-bootstrap";
import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import "./signUp.css";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
const TOKEN_KEY = "token";

const getDateFormat = (date) => {
  if (!date) {
    return "";
  }

  //contain date in pices
  let arr = date.split("-");
  let arr2 = arr[2].split("T");

  return `${arr[0]}-${arr[1]}-${arr2[0]}`;
};

const EditUser = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["data"]);
  const [load, setLoad] = useState(true);
  const params = useParams();

  //image upload states
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [userInfo, setUserInf] = useState(null);
  const [imgError, setImgError] = useState("");

  if (!cookies.data) {
    window.location = "/login";
  }
  // const regButton = document.getElementById("regButton");

  //get information about user from data base
  const getInfoUser = async () => {
    try {
      if (!params.id) {
        window.location = "/login";
      }
      setLoad(true);

      let info = await userService.getInfoUserById(params.id);

      if (info.data[0].image) {
        setImagePreview(config.pictureUrl + info.data[0]._id + ".jpg");
      } else {
        setImagePreview(config.defaultImage);
      }

      setUserInf(info.data[0]);
      setLoad(false);
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
    getInfoUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function validateImg(e) {
    setImgError("");
    // regButton.disabled=false;
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      //1048576
      setImgError("?????????? ???????????? ???? ????????????  - 1 MB");
      // regButton.disabled = true;
      return false;
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  const deleteImage = async () => {
    try {
      await userService.deleteImage(params.id);
      setUserInf((userInfo) => {
        return { ...userInfo, image: false };
      });

      setImagePreview(config.defaultImage);
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

  if (load) {
    return <h1>???????? ????????...</h1>;
  }

  return (
    <>
      {userInfo !== null && (
        <Container>
          <h1 className="text-center m-0">?????????? ???????????? ????????????</h1>
          <Row className="signUp-row">
            <Col className="signUP-2-col">
              {userInfo !== null && (
                <Formik
                  initialValues={
                    {
                      firstName: userInfo.firstName,
                      lastName: userInfo.lastName,
                      email: userInfo.email,
                      city: userInfo.city,
                      gender: userInfo.gender,
                      dateBirthDay: getDateFormat(userInfo.dateBirthDay),
                      admin: userInfo.admin,
                      dogTrainer: userInfo.dogTrainer,
                      dogWalker: userInfo.dogWalker,
                      phone: userInfo.phone,
                    } || {
                      firstName: userInfo.firstName,
                      lastName: userInfo.lastName,
                      email: userInfo.email,
                      city: userInfo.city,
                      gender: userInfo.gender,
                      dateBirthDay: getDateFormat(userInfo.dateBirthDay),
                      admin: userInfo.admin,
                      dogTrainer: userInfo.dogTrainer,
                      dogWalker: userInfo.dogWalker,
                      phone: userInfo.phone,
                    }
                  }
                  validate={(values) => {
                    const errors = {};

                    if (!values.firstName) {
                      errors.firstName = "???????? ???????? ???? ????????";
                    } else if (
                      values.firstName.length < 2 ||
                      values.firstName.length > 255
                    ) {
                      errors.firstName = "???????? ???????? ???? ????????";
                    } else if (!/^[a-zA-Z??-??]*$/i.test(values.firstName))
                      errors.firstName = "?????? ?????????? ?????? ???? ????????";

                    if (!values.lastName) {
                      errors.lastName = "???????? ???????? ???? ????????";
                    } else if (
                      values.lastName.length < 2 ||
                      values.lastName.length > 255
                    ) {
                      errors.lastName = "???????? ???????? ???? ????????";
                    } else if (!/^[a-zA-Z??-?? ]*$/i.test(values.lastName))
                      errors.lastName = "???? ???????????? ?????? ???? ????????";

                    if (!values.email) {
                      errors.email = "???????? ???????? ???? ????????";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "?????????? ???????????? ???? ??????????";
                    }

                    // validation for Phone
                    if (!values.phone) {
                      errors.phone = "???????? ???????? ???? ????????";
                    } else if (!/^0[2-9]\d{7,8}$/i.test(values.phone)) {
                      errors.phone = "?????????? ???????????? ???? ????????";
                    }

                    if (!values.city) {
                      errors.city = "???????? ???????? ???? ????????";
                    } else if (
                      values.city.length < 2 ||
                      values.city.length > 400
                    ) {
                      errors.city = "???????? ???????????? ?????? ????????????";
                    } else if (/^[0-9]*$/i.test(values.city))
                      errors.city = "???? ?????????? ?????? ???????????? ?????????? ??????????";

                    if (!values.gender || values.gender.value === "") {
                      errors.gender = "???????? ???????? ???? ????????";
                    }
                    if (!values.dateBirthDay) {
                      errors.dateBirthDay = "???????? ???????? ???? ????????";
                    } else if (
                      new Date(Date.now()).getUTCFullYear() -
                        new Date(values.dateBirthDay).getUTCFullYear() <=
                      16
                    ) {
                      errors.dateBirthDay = "???????? ?????? ?????? ??-16";
                    }

                    return errors;
                  }}
                  //pic validation
                  onSubmit={async (values) => {
                    try {
                      if (imagePreview !== config.defaultImage) {
                        values.image = true;
                      } else {
                        values.image = false;
                      }

                      const data = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        city: values.city,
                        gender: values.gender,
                        dateBirthDay: values.dateBirthDay,
                        admin: values.admin,
                        dogTrainer: values.dogTrainer,
                        dogWalker: values.dogWalker,
                        phone: values.phone,
                        image: values.image,
                      };

                      const user = await userService.editUser(data, params.id);
                      setCookie(TOKEN_KEY, user.data.token);
                      if (values.image) {
                        let frmData = new FormData();
                        frmData.append("name", userInfo._id + ".jpg");
                        frmData.append("image", image);

                        await userService.saveImage(frmData);
                      }
                      // ToastContainer
                      toast.success("???? ???????????? ???????????? ????????????", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                      window.location = `/${params.location}`;
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
                    /* and other goodies */
                  }) => (
                    <Container>
                      <div>
                        {/* account image */}
                        <div className="d-flex flex-column align-items-center">
                          <Form.Label
                            htmlFor="image-upload"
                            className="image-upload-label d-flex flex-column align-items-center"
                          >
                            {imagePreview !== null && (
                              <>
                                <img
                                  src={imagePreview}
                                  className="account-img"
                                  alt="account pic"
                                  style={{
                                    width: "70%",
                                    height: "auto",
                                    borderRadius: "35px",
                                  }}
                                />
                              </>
                            )}
                            {imagePreview !== config.defaultImage && (
                              <button
                                className="btn btn-danger mt-3 w-100"
                                onClick={deleteImage}
                              >
                                ?????? ??????????
                              </button>
                            )}
                            <i
                              className="btn btn-info mt-3 w-100"
                              style={{ width: "100px" }}
                            >
                              {imagePreview !== config.defaultImage
                                ? "?????? ??????????"
                                : "?????????? ??????????"}
                            </i>
                          </Form.Label>

                          <input
                            type="file"
                            id="image-upload"
                            hidden
                            accept="image/png, image/jpeg"
                            onChange={validateImg}
                          />
                          {/* error show size */}
                          {imgError ? (
                            <Form.Text style={{ color: "red" }}>
                              Image error:{imgError}
                            </Form.Text>
                          ) : null}
                        </div>
                        <hr />
                        {/* FORM */}
                        <Form
                          onSubmit={handleSubmit}
                          className="form-container"
                        >
                          {/* F.NAME & L.NAME */}
                          <Row style={{ marginTop: 20 }}>
                            <Col md={6} sm={12}>
                              <Form.Label>????:</Form.Label>
                              <Form.Control
                                className="text-center"
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                placeholder="???? ????????"
                              />
                              {errors.firstName && touched.firstName ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.firstName}
                                </Form.Text>
                              ) : null}
                            </Col>

                            <Col md={6}>
                              <Form.Label>???? ??????????:</Form.Label>
                              <Form.Control
                                className="text-center"
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                placeholder="???? ??????????"
                              />
                              {errors.lastName && touched.lastName ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.lastName}
                                </Form.Text>
                              ) : null}
                            </Col>
                          </Row>
                          {/* EMAIL */}
                          <Row>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>?????????? ???????????? ??????:</Form.Label>
                              <Form.Control
                                className="text-center"
                                style={{ width: "100%" }}
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="???? ???????????? ????????"
                              />
                            </Form.Group>

                            <Col md={6}>
                              {errors.email && touched.email ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.email}
                                </Form.Text>
                              ) : null}
                            </Col>
                          </Row>

                          {/* PHONE & CITY */}
                          <Row>
                            <Col md={6}>
                              <Form.Label>?????????? ????????:</Form.Label>
                              <Form.Control
                                className="text-center"
                                type="tel"
                                name="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                placeholder="??????????"
                              />
                              {errors.phone && touched.phone ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.phone}
                                </Form.Text>
                              ) : null}{" "}
                            </Col>
                            <Col md={6}>
                              <Form.Label>??????:</Form.Label>
                              <Form.Control
                                className="text-center"
                                type="text"
                                name="city"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.city}
                                placeholder="??????"
                              />
                              {errors.city && touched.city ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.city}
                                </Form.Text>
                              ) : null}{" "}
                            </Col>
                          </Row>

                          <br />

                          {/* gender & B.DATE */}
                          <Row className="p-0 m-10">
                            <Form.Group>
                              <Form.Label>?????? :</Form.Label>
                              <Form.Select
                                className="text-center p-0 m-0"
                                aria-label=""
                                name="gender"
                                id="gender"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.gender}
                              >
                                <option value=""> ??????/?? ?????? </option>
                                <option value="male">??????</option>
                                <option value="female">????????</option>
                                <option value="other">??????</option>
                              </Form.Select>
                              {errors.gender && touched.gender ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.gender}
                                </Form.Text>
                              ) : null}
                            </Form.Group>
                          </Row>

                          <Row className="mt-3 p-0 m-0">
                            <Form.Label>?????????? ???????? :</Form.Label>
                            <Form.Control
                              className="text-center p-0 m-0"
                              type="date"
                              name="dateBirthDay"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.dateBirthDay}
                              placeholder="?????????? ????????"
                            />
                            {errors.dateBirthDay && touched.dateBirthDay ? (
                              <Form.Text style={{ color: "red" }}>
                                {errors.dateBirthDay}
                              </Form.Text>
                            ) : null}
                          </Row>

                          {/* PROFESSION */}
                          <hr />
                          <Row>
                            <div className="d-flex justify-content-around">
                              <Form.Label>?????? ???? ?????? ??????????:</Form.Label>

                              <Form.Check
                                label="????????"
                                type="checkbox"
                                name="dogTrainer"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.dogTrainer}
                                checked={values.dogTrainer}
                              />

                              {errors.dogTrainer && touched.dogTrainer ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.dogTrainer}
                                </Form.Text>
                              ) : null}

                              <Form.Check
                                label="????????????????"
                                type="checkbox"
                                name="dogWalker"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.dogWalker}
                                checked={values.dogWalker}
                              />
                              {errors.dogWalker && touched.dogWalker ? (
                                <Form.Text style={{ color: "red" }}>
                                  {errors.dogWalker}
                                </Form.Text>
                              ) : null}

                              {cookies.data.admin &&
                                values.email !== config.admin && (
                                  <Form.Check
                                    label="????????"
                                    type="checkbox"
                                    name="admin"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.admin}
                                    checked={values.admin}
                                    className="text-danger"
                                  />
                                )}
                            </div>
                          </Row>

                          <hr />
                          {/* BUTTON */}
                          <Row>
                            <Col md={6}>
                              <button
                                className="mt-3 mb-3 btn btn-danger  w-100 "
                                onClick={() => navigate(-1)}
                                type="button"
                              >
                                ??????????
                              </button>
                            </Col>
                            <Col md={6}>
                              <button
                                className="mt-3 btn btn-info w-100 "
                                type="submit"
                                disabled={isSubmitting || imgError}
                              >
                                ????????
                              </button>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    </Container>
                  )}
                </Formik>
              )}
            </Col>
            <Col className="signUP-1-col" md={6} sm={false}></Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default EditUser;
