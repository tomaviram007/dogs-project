import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import { Formik } from "formik";
import userService from "../../services/userService/userService";

function ContactUs() {
  return (
    <Container className="d-flex flex-column">
      <Row>
        <Col sm={12} className="mt-3">
          <img
            src="https://cdn.pixabay.com/photo/2017/09/25/13/14/dog-2785077_960_720.jpg"
            alt=""
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Col>

        <Col sm={12} className="mt-5">
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              content: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.fullName) {
                errors.fullName = "שדה שם הינו חובה";
              } else if (
                values.fullName.length < 2 ||
                values.fullName.length > 255
              ) {
                errors.fullName = "השם קצר מדיי או ארוך מדיי";
              }

              if (!values.email) {
                errors.email = "שדה אימייל הינו חובה";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "אימייל לא תקין";
              }
              if (!values.content) {
                errors.content = "שדה תוכן הינו חובה";
              } else if (values.content.length < 10) {
                errors.content = "שדה תוכן קצר מדיי";
              }
              return errors;
            }}
            onSubmit={async (values) => {
              try {
                await userService.contactUs({
                  fullName: values.fullName,
                  email: values.email,
                  content: values.content,
                });

                values.fullName = "";
                values.email = "";
                values.content = "";
                // ToastContainer
                toast.success("האימייל נשלח בהצלחה", {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
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
            }) => (
              <>
                <form onSubmit={handleSubmit} className="form-signin ">
                  <h1 className="h3 mb-3 font-weight-normal text-center">
                    דברו איתנו אנחנו מחכים לכם
                  </h1>
                  <h5>
                    בואו לספר לנו מה הייתם רוצים שנוסיף באתר, על מנת שנוכל
                    להנגיש לכם את עולם הכלבנות במקום אחד, בלי יותר מידי כאבי ראש
                    והתרוצצויות
                  </h5>
                  <label htmlFor="inputFullName" className="sr-only">
                    שם מלא :
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    placeholder="שם מלא"
                  />
                  {errors.fullName && touched.fullName ? (
                    <div>{errors.fullName}</div>
                  ) : null}
                  <br />

                  <label htmlFor="inputEmail" className="sr-only">
                    : אימייל
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="email"
                  />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                  <br />
                  <label htmlFor="inputContent" className="sr-only ">
                    תוכן :
                  </label>
                  <textarea
                    row="20"
                    type="text"
                    name="content"
                    className="form-control "
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.content}
                    placeholder="תוכן"
                  />
                  {errors.content && touched.content ? (
                    <div>{errors.content}</div>
                  ) : null}
                  <br />

                  <button
                    className="btn btn-lg btn-primary btn-block  col-12 col-md-4"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    שלח
                  </button>
                </form>
              </>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactUs;
