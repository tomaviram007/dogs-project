import { Container } from "react-bootstrap";
import userService from "../../services/userService/userService";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaBackspace } from "react-icons/fa";

const ForgotEmail = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "חובה למלא את השדה";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "כתובת האימייל אינה תקינה";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          try {
            await userService.sendEmailToRestPassword({ email: values.email });
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
            toast.error("לא קיים אימייל זה במערכת", {
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
            <h1 className="text-center "> שיחזור סיסמה</h1>
            <img
              className="imgCoverDogs "
              src="https://img.freepik.com/free-photo/front-view-beautiful-dog-with-copy-space_23-2148786560.jpg?t=st=1655018902~exp=1655019502~hmac=241c22303580ad2124fb55aba85d1bd8b1584a482f4c8fb5e7122dbf769b9019&w=1380"
              alt="dogs pic"
              width="100%"
              height="auto"
            />

            {/* login form */}
            <br />
            <div className="container  col-12 col-md-6">
              <div className="text-center pt-4 mt-3 ">
                <form onSubmit={handleSubmit} className="form-signin ">
                  <h4 className="mb-3 font-weight-normal">
                    נא להזין סיסמה חדשה
                  </h4>

                  <label htmlFor="inputEmail" className="sr-only">
                    אימייל
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="form-control "
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="נא להכניס את המייל שלך"
                  />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}

                  <div className="mt-3 my-3 mb-3 justify-content-center">
                    <button
                      className="btn btn-lg btn-primary btn-block col-12"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      שלח/י
                    </button>
                  </div>
                </form>
                <button
                  className=" btn btn-lg btn-secondary btn-block col-12"
                  onClick={() => navigate(-1)}
                >
                  {" "}
                  אחורה
                  <span className="mx-3 text-center">
                    <FaBackspace />
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </Formik>
    </Container>
  );
};
export default ForgotEmail;
