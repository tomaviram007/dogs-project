import React from "react";
import { Row } from "react-bootstrap";

const AboutUs = () => {
  return (
    <>
      {/* main div */}

      <div className="text-center mt-0 ">
        <img
          src="https://img.freepik.com/free-vector/collection-purebred-dogs-aligned-town_1196-664.jpg?t=st=1655660038~exp=1655660638~hmac=4e4a3d940a511d07c8c2facdc5222ee6ada92a0250f0f57b23fc1df254a8b75c&w=1380"
          alt="all dogs"
          height="auto"
          width="100%"
        />
        <h1 className="display-5 fw-bold mt-5" style={{ color: "green" }}>
          אודותינו
        </h1>

        <div className="col-md-8 mx-auto mt-5">
          <h3 className="mt-5 mb-5">
            אתר הכלבים הגדול בישראל.
            <br />
            דוגיט הינה פלטפורמה למציאת בעלי עסקיםבתחום הכלבנות והאילוף בישראל.
            <br />
            האתר מאגד בתוכו, מאלפי כלבים, דוגווקרים, ואנשי מקצוע מתחום הכלבנות.
            <br />
            המטרה שלנו להנגיש וליצור קהילה אוהבת ותומכת להולכי על 4 , ולאפשר
            יצירת קשר בין בעלי כלבים לנותני שירותים
          </h3>
          <hr />
        </div>

        <div className="d-flex flex-Colum justify-content-sm-center mt-5">
          <Row>
            {/* first programer */}
            <div className="col-lg-4 mt-5">
              <img
                className="rounded-circle "
                style={{ boxShadow: "1px 6px 12px gray" }}
                width="220"
                height="200"
                src="https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="profile of CTO"
              />

              <h2 className="fw-normal mt-3">Mousa.H</h2>
              <p>מתכנת</p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1055/1055666.png"
                alt="developer"
                width="50px"
                height="50px"
              />
              <br />
              <h5>קצת עלי</h5>

              <p>
                <u>
                  <b>שם : </b>{" "}
                </u>
                מוסא חמאד
                <br />
                <u>
                  <b>תפקיד: </b>{" "}
                </u>
                בודק תוכנה היום
                <br />
                <br />
                <u>
                  <b>הכשרה: </b>
                </u>
                <br />
                <img
                  src="https://www.hackeru.co.il/wp-content/themes/hackerusite/dist/images/logo.png"
                  alt="hakeru Logo"
                />
                <br />
                קורס פיתוח אתרים במכללת האקר יו
                <br />
                תואר במדעי המחשב
                <br />
              </p>
              <h5>
                <u>
                  <b>מידע כללי</b>
                </u>
              </h5>
              <p>כרגע אני יודע לבנות אתרים FRONT +BACKEND בעזרת REACT+NODE</p>
              <p>
                {" "}
                <u>
                  <b>חיים אישים :</b>
                </u>{" "}
                <br />
                <img
                  src="https://cdn-icons.flaticon.com/png/512/3097/premium/3097951.png?token=exp=1655662228~hmac=a36e293453ff4a39c655a1c77608c3c1"
                  alt="married"
                  width="50px"
                  height="50px"
                />
              </p>
            </div>
            {/* second programer */}
            <div className="col-lg-4 mt-5">
              <img
                style={{ boxShadow: "1px 6px 12px gray" }}
                className="rounded-circle"
                width="220"
                height="200"
                src="https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
                alt="profile of CTO"
              />

              <h2 className="fw-normal mt-3">Tom.A</h2>
              <p>מתכנת</p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1055/1055666.png"
                alt="developer"
                width="50px"
                height="50px"
              />
              <br />
              <h5>קצת עלי</h5>

              <p>
                <u>
                  <b>שם : </b>{" "}
                </u>
                תום אבירם
                <br />
                <u>
                  <b>תפקיד: </b>{" "}
                </u>
                מנהל מוצר + מתכנת
                <br />
                <br />
                <u>
                  <b>הכשרה: </b>
                </u>
                <br />
                <img
                  src="https://www.hackeru.co.il/wp-content/themes/hackerusite/dist/images/logo.png"
                  alt="hakeru Logo"
                />
                <br />
                קורס פיתוח אתרים במכללת האקר יו
                <br />
                תואר בתקשורת וניהול
                <br />
              </p>
              <h5>
                <u>
                  <b>מידע כללי</b>
                </u>
              </h5>
              <p>
                כיום מתעסק בעיקר בפיתוח Front-End בעזרת REACT , JavaScript ,
                Bootstrap
              </p>
              <p>
                {" "}
                <u>
                  <b>חיים אישים :</b>
                </u>
                <br />
                <img
                  src="https://cdn-icons.flaticon.com/png/512/3097/premium/3097951.png?token=exp=1655662228~hmac=a36e293453ff4a39c655a1c77608c3c1"
                  alt="married"
                  width="50px"
                  height="50px"
                />
              </p>
            </div>
            {/* third programer */}
            <div className="col-lg-4 mt-5 mb-5">
              <img
                style={{ boxShadow: "1px 6px 12px gray" }}
                className="rounded-circle"
                width="220"
                height="200"
                src="https://images.unsplash.com/photo-1560525821-d5615ef80c69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="profile of CTO"
              />

              <h2 className="fw-normal mt-3">Anton.M</h2>
              <p>מתכנת</p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1055/1055666.png"
                alt="developer"
                width="50px"
                height="50px"
              />
              <br />
              <h5>קצת עלי</h5>

              <p>
                <u>
                  <b>שם : </b>{" "}
                </u>
                אנטון מנקוב
                <br />
                <u>
                  <b>תפקיד: </b>{" "}
                </u>
                <br />
                <br />
                <u>
                  <b>הכשרה: </b>
                </u>
                <br />
                <img
                  src="https://www.hackeru.co.il/wp-content/themes/hackerusite/dist/images/logo.png"
                  alt="hakeru Logo"
                />
                <br />
                קורס פיתוח אתרים במכללת האקר יו
                <br />
              </p>
              <h5>
                <u>
                  <b>מידע כללי</b>
                </u>
              </h5>
              <p></p>
              <p>
                <u>
                  <b>חיים אישים :</b>
                </u>
                <br />
                <img
                  src="https://cdn-icons.flaticon.com/png/512/3097/premium/3097951.png?token=exp=1655662228~hmac=a36e293453ff4a39c655a1c77608c3c1"
                  alt="married"
                  width="50px"
                  height="50px"
                />
              </p>
            </div>
          </Row>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
