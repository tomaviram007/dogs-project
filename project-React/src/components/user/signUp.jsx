import userService from "../../services/userService/userService";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import config from "../../config.json";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  //image upload states
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(config.defaultImage);

  const [imgError, setImgError] = useState("");

  function validateImg(e) {
    setImgError("");
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      setImgError("הגודל המירבי של התמונה  - 1 MB");
      return false;
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  return (
    <Container style={{ direction: "ltr" }}>
      <h1 className="text-center m-0">נא להירשם על מנת להיות חלק מהקהילה</h1>
      <Row className="signUp-row">
        <Col className="signUP-1-col" md={6} sm={false}></Col>
        <Col className="signUP-2-col">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              city: "",
              password: "",
              gender: "",
              dateBirthDay: "",
              admin: false,
              dogTrainer: false,
              dogWalker: false,
              phone: "",
              image: false,
            }}
            validate={(values) => {
              const errors = {};

              if (!values.firstName) {
                errors.firstName = "חובה למלא את השדה";
              } else if (
                values.firstName.length < 2 ||
                values.firstName.length > 255
              ) {
                errors.firstName = "חובה למלא את השדה";
              } else if (!/^[a-zA-Zא-ת]*$/i.test(values.firstName))
                errors.firstName = "השם הפרטי שלך לא תקין";

              if (!values.lastName) {
                errors.lastName = "חובה למלא את השדה";
              } else if (
                values.lastName.length < 2 ||
                values.lastName.length > 255
              ) {
                errors.lastName = "חובה למלא את השדה";
              } else if (!/^[a-zA-Z א-ת]*$/i.test(values.lastName))
                errors.lastName = "השם משפחה שלך לא תקין";

              if (!values.email) {
                errors.email = "חובה למלא את השדה";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "כתובת אימייל לא נכונה";
              }

              // validation for Phone
              if (!values.phone) {
                errors.phone = "חובה למלא את השדה";
              } else if (!/^0[2-9]\d{7,8}$/i.test(values.phone)) {
                errors.phone = "המספר פלאפון לא תקין";
              }

              if (!values.city) {
                errors.city = "חובה למלא את השדה";
              } else if (values.city.length < 2 || values.city.length > 400) {
                errors.city = "חובה להכניס עיר מגורים";
              } else if (/^[0-9]*$/i.test(values.city))
                errors.city = "יש להזין עיר מגורים בצורה נכונה";

              if (!values.password) {
                errors.password = "שדה למלא את השדה";
              } else if (
                values.password.length < 6 ||
                values.password.length > 255
              ) {
                errors.password = "סיסמה לא תקינה";
              }
              if (!values.gender || values.gender.value === "") {
                errors.gender = "חובה למלא את השדה";
              }
              if (!values.dateBirthDay) {
                errors.dateBirthDay = "חובה למלא את השדה";
              } else if (
                new Date(Date.now()).getUTCFullYear() -
                  new Date(values.dateBirthDay).getUTCFullYear() <=
                16
              ) {
                errors.dateBirthDay = "הגיל שלך קטן מ-16";
              }

              return errors;
            }}
            //pic validation
            onSubmit={async (values) => {
              try {
                if (imagePreview !== config.defaultImage) {
                  values.image = true;
                }

                const data = {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  city: values.city,
                  password: values.password,
                  gender: values.gender,
                  dateBirthDay: values.dateBirthDay,
                  admin: values.admin,
                  dogTrainer: values.dogTrainer,
                  dogWalker: values.dogWalker,
                  phone: values.phone,
                  image: values.image,
                };

                let user = await userService.createUser(data);

                if (values.image) {
                  let frmData = new FormData();
                  frmData.append("name", user.data._id + ".jpg");
                  frmData.append("image", image);

                  await userService.saveImage(frmData);
                }
                navigate(`/login`);
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
                              width: "55%",
                              height: "auto",
                              borderRadius: "35px",
                            }}
                          />
                        </>
                      )}

                      <i
                        className="btn btn-info mt-3 w-100"
                        style={{ width: "100px" }}
                      >
                        {imagePreview !== config.defaultImage
                          ? "שנה תמונה"
                          : "הוספת תמונה"}
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
                    style={{ direction: "rtl" }}
                  >
                    {/* F.NAME & L.NAME */}
                    <Row style={{ marginTop: 20 }}>
                      <Col xl={6} sm={12}>
                        <Form.Label>שם</Form.Label>
                        <Form.Control
                          className="text-center"
                          type="text"
                          name="firstName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                          placeholder="שם פרטי"
                        />
                        {errors.firstName && touched.firstName ? (
                          <Form.Text style={{ color: "red" }}>
                            {errors.firstName}
                          </Form.Text>
                        ) : null}
                      </Col>

                      <Col xl={6}>
                        <Form.Label>שם משפחה</Form.Label>
                        <Form.Control
                          className="text-center"
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                          placeholder="שם משפחה"
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
                      <Form.Group className="mt-3" controlId="formBasicEmail">
                        <Form.Label>כתובת אימייל שלך</Form.Label>
                        <Form.Control
                          className="text-center"
                          style={{ width: "100%" }}
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder="נא לרשום את המייל שלך"
                        />
                      </Form.Group>

                      <Col md={12}>
                        {errors.email && touched.email ? (
                          <Form.Text style={{ color: "red" }}>
                            {errors.email}
                          </Form.Text>
                        ) : null}
                      </Col>
                    </Row>

                    {/* PHONE & CITY */}
                    <Row className="mt-3">
                      <Col xl={6}>
                        <Form.Label>טלפון נייד</Form.Label>
                        <Form.Control
                          className="text-center"
                          type="tel"
                          name="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          placeholder="טלפון"
                        />
                        {errors.phone && touched.phone ? (
                          <Form.Text style={{ color: "red" }}>
                            {errors.phone}
                          </Form.Text>
                        ) : null}{" "}
                      </Col>
                      <Col xl={6}>
                        <Form.Label>עיר</Form.Label>
                        <Form.Control
                          className="text-center"
                          type="text"
                          name="city"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                          placeholder="עיר מגורים"
                        />
                        {errors.city && touched.city ? (
                          <Form.Text style={{ color: "red" }}>
                            {errors.city}
                          </Form.Text>
                        ) : null}{" "}
                      </Col>
                    </Row>

                    {/* gender & B.DATE */}

                    <Row className="p-0 m-0">
                      <Form.Label>מין</Form.Label>
                      <Form.Select
                        className="text-center "
                        aria-label=""
                        name="gender"
                        id="gender"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.gender}
                      >
                        <option value=""> בחר/י מין </option>
                        <option value="male">זכר</option>
                        <option value="female">נקבה</option>
                        <option value="other">אחר</option>
                      </Form.Select>

                      {errors.gender && touched.gender ? (
                        <Form.Text style={{ color: "red" }}>
                          {errors.gender}
                        </Form.Text>
                      ) : null}
                    </Row>

                    <Row className="mt-3 p-0 m-0">
                      <Form.Label>תאריך לידה</Form.Label>
                      <Form.Control
                        className="text-center p-0 m-0"
                        type="date"
                        name="dateBirthDay"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dateBirthDay}
                        placeholder=" תאריך לידה"
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
                        <Form.Label>אני גם בעל מקצוע</Form.Label>

                        <Form.Check
                          label="מאלף"
                          type="checkbox"
                          name="dogTrainer"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.dogTrainer}
                        />

                        {errors.dogTrainer && touched.dogTrainer ? (
                          <Form.Text style={{ color: "red" }}>
                            {errors.dogTrainer}
                          </Form.Text>
                        ) : null}

                        <Form.Check
                          label="דוגוואקר"
                          type="checkbox"
                          name="dogWalker"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.dogWalker}
                        />

                        {/* <Form.Label htmlFor="dogWalker">דוגווקר</Form.Label> */}
                        {errors.dogWalker && touched.dogWalker ? (
                          <Form.Text style={{ color: "red" }}>
                            {errors.dogWalker}
                          </Form.Text>
                        ) : null}
                      </div>
                    </Row>
                    <hr />
                    {/* PASSWORD */}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>סיסמה</Form.Label>
                      <Form.Control
                        className="text-center"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="סיסמה"
                      />
                    </Form.Group>

                    {errors.password && touched.password ? (
                      <Form.Text style={{ color: "red" }}>
                        {errors.password}
                      </Form.Text>
                    ) : null}

                    {/* BUTTON */}
                    <Row>
                      <Col>
                        <button
                          className="btn btn-primary w-100"
                          style={{ marginTop: 20 }}
                          type="submit"
                          disabled={isSubmitting || imgError}
                        >
                          הרשמה
                        </button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Container>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
