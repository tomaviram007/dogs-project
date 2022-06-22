import React from "react";
import { Container } from "react-bootstrap";
import userService from "../../services/userService/userService";
import { Formik } from "formik";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginTo = () => {
  const [cookies] = useCookies(["data"]);
  const navigate = useNavigate();
  if (cookies.data) {
    window.location = "/profile";
  }

  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "חובה למלא את השדה";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "כתובת אימייל לא נכונה";
          }
          if (!values.password) {
            errors.password = "חובה למלא את השדה";
          } else if (
            values.password.length < 6 ||
            values.password.length > 255
          ) {
            errors.password = "סיסמה לא תקינה";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          try {
            await userService.login(values.email, values.password);
            // ToastContainer
            toast.success("🦄  הכניסה הצליחה", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            window.location = "/home";
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
            <div className="center mt-5">
              <img
                className="imgCoverDogs mb-4"
                src="https://img.freepik.com/free-photo/group-portrait-adorable-puppies_53876-64777.jpg?t=st=1655018902~exp=1655019502~hmac=bb4186f5d4e5498345f0eb4c761204a9444095a8a4b48fdab656558595794250&w=1380"
                alt="dogs pic"
                width="auto"
                height="auto"
              />
            </div>
            {/* login form */}
            <br />
            <div
              className="container loginForm col-md-6"
              style={{ direction: "rtl" }}
            >
              <div className="text-center pt-4 mt-3 ">
                <form onSubmit={handleSubmit} className="form-signin ">
                  <h1 className="h3 mb-3 font-weight-normal">התחברות למערכת</h1>

                  <label htmlFor="inputEmail" className="sr-only">
                    אימייל
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="אימייל"
                  />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                  <br />
                  <label htmlFor="inputPassword" className="sr-only ">
                    סיסמה
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control "
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="סיסמה"
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  <br />

                  <button
                    className="btn btn-lg btn-primary btn-block  col-12 col-md-4"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    כניסה
                  </button>

                  <button
                    className="mx-3 btn btn-lg btn-secondary btn-block col-12 col-md-4"
                    type="button"
                    onClick={() => {
                      navigate("/sendEmail");
                    }}
                  >
                    שיחזור סיסמה
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </Formik>
    </Container>
  );
};
export default LoginTo;
