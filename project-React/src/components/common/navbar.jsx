import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import userService from "../../services/userService/userService";
import { useCookies } from "react-cookie";
import config from "../../config.json";
import { useState } from "react";
import { toast } from "react-toastify";

const NavbarComp = () => {
  const [cookies, setCookie] = useCookies(["data"]);
  const [loading, setLoading] = useState(true);

  const updateStatusOffline = async (e) => {
    try {
      await userService.updateOffline();
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
    const getData = async () => {
      if (userService.getJwt()) {
        let user = await userService.getInfoUser();
        setCookie("data", user.data);
        if (!cookies.data) {
          return <p>טוען תוכן...</p>;
        } else {
          await userService.updateOnline();
        }
      }
    };

    setLoading(true);
    getData();
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return "<h1> טוען את התוכן המבוקש ...</h1>";
  }

  window.addEventListener("unload", updateStatusOffline);

  const { data } = cookies;

  return (
    <>
      <Navbar className="navbarBackGroundColor " expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Navbar.Brand href="/home">Dogit</Navbar.Brand>
            <NavDropdown
              title={
                data ? (
                  <>
                    <img
                      src={
                        data.image
                          ? `${config.pictureUrl}${data._id}.jpg`
                          : config.defaultImage
                      }
                      className="imageProfile"
                      alt="profile pic"
                    />
                    <span> שלום {data.firstName}</span>
                  </>
                ) : (
                  <i className="bi bi-gear"></i>
                )
              }
              id="basic-nav-dropdown"
            >
              {!data ? (
                <>
                  <NavDropdown.Item href="/signup" title="הרשמה">
                    הרשמה <i className="bi bi-door-open"></i>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/login" title="כניסה">
                    התחברות <i className="bi bi-box-arrow-in-right"></i>
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item href="/profile">
                    <i className="bi bi-gear"></i> הפרופיל שלי
                  </NavDropdown.Item>

                  <NavDropdown.Item href="/logout" title="יציאה">
                    <i className="bi bi-box-arrow-in-right"></i> יציאה
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            <Nav.Link href="/" title="דף הבית">
              דף הבית
            </Nav.Link>

            {data && (
              <>
                <NavDropdown title="המועדפים שלי" id="basic-nav-dropdown">
                  <NavDropdown.Item
                    href="/favoriteWalker"
                    title="דוגווקרים מועדפים"
                  >
                    הדוגווקרים המועדפים עלי
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="/favoriteTrainer"
                    title="המאלפים מועדפים"
                  >
                    המאלפים המועדפים עלי
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="שירותים שלנו" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/dogtrainer">מאלפים</NavDropdown.Item>
                  <NavDropdown.Item href="/dogwalker">דוגווקר</NavDropdown.Item>
                  <NavDropdown.Item href="/Article">מאמרים</NavDropdown.Item>
                </NavDropdown>

                <Nav.Link href="/allUsersOnline" title="משתמשים אונליין">
                  משתמשים אונליין
                </Nav.Link>

                {data.admin && (
                  <Nav.Link href="/allUsers" title="כל המשתמשים">
                    <i className="bi bi-people"></i> כל המשתמשים
                  </Nav.Link>
                )}
              </>
            )}
            <Nav.Link href="/contactUs">צור קשר</Nav.Link>
            <Nav.Link href="/aboutUs">אודותינו</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarComp;
