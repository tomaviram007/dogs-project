import userService from "../../services/userService/userService";
import config from "../../config.json";
import ReactPaginate from "react-paginate";
import { BsWhatsapp } from "react-icons/bs";
import { BsFillEnvelopeFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Container } from "react-bootstrap";

const AllUsersOnline = () => {
  const [cookies] = useCookies(["data"]);
  const [load, setLoad] = useState(true);
  const [userInfo, setUserInf] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchUsers, setSearchUsers] = useState("");
  const [onlineStatic, setOnlineStatic] = useState("");

  if (!cookies.data) {
    window.location = "/login";
  }

  //get information about user from data base
  const getInfoUser = async () => {
    try {
      if (!cookies.data) {
        window.location = "/login";
      }

      setLoad(true);
      await userService.updateOnline();
      let info = await userService.getAllUsersOnline();
      let statics = await userService.getStaticOnline();
      setOnlineStatic(statics.data);
      setUserInf(info.data);
      setSearchUsers(info.data);
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

  if (load) {
    return <h1>אין יוזרים מחוברים בינתיים</h1>;
  }

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = searchUsers
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user, index) => {
      return (
        <tr className="row" key={user._id}>
          <td className="col-1 mx-3">
            {index + 1 + pageNumber * usersPerPage}
          </td>
          <td className="col-3">{user.firstName + " " + user.lastName}</td>
          <td className="col-3">
            <button
              className="btn btn"
              onClick={() => {
                window.location = `mailto:${user.email}`;
              }}
            >
              <BsFillEnvelopeFill />
            </button>
          </td>

          <td className="col-2 d-none d-md-block">
            <img
              height="35px"
              width="35px"
              src={
                user.image
                  ? `${config.pictureUrl}${user._id}.jpg`
                  : config.defaultImage
              }
              className="mb-4 "
              alt="profile pic"
            />
          </td>

          <td className="col-2 ">
            <button
              type="button"
              className=" buttonWhatsapp text-center  p-2 m-0 text-center"
              onClick={() =>
                (window.location = `https:api.whatsapp.com/send?phone=${user.phone}`)
              }
            >
              <BsWhatsapp />
            </button>
          </td>
        </tr>
      );
    });
  const pageCount = Math.ceil(searchUsers.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleChange = (e) => {
    let temp = e.target.value.trim();
    const userFilter = userInfo.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(temp.toLowerCase()) ||
        user.email.includes(temp.toLowerCase())
      );
    });

    setSearchUsers(userFilter);
  };

  return (
    <>
      <div className="div">
        <img
          src="https://img.freepik.com/free-vector/hands-holding-touching-mobile-phones-displays-using-apps-online-set_74855-16142.jpg?t=st=1655663735~exp=1655664335~hmac=23b3e4a995c4d41bcb4f3eeef90a8e1147fa5795c310fa8c64a38a58023dce95&w=1380"
          alt="allusers"
          width="100%"
        />
      </div>
      <Container style={{border:"1px solid black" , borderRadius:"15px" , boxShadow:"1px 5px 20px gray"}} className="p-3">
        <div className=" d-flex row text-center">
          <h1>
            {" "}
            <u>משתמשים מחוברים</u>
          </h1>
        </div>
        {/* statistic */}
        <div className="d-flex m-3">
          <h4 className="mx-1">
            {onlineStatic.numberUser} /{" "}
            <span style={{ color: "green" }}> {onlineStatic.numberOnline}</span>{" "}
          </h4>
          <h4> מחוברים</h4>{" "}
        </div>
        {/* search input */}
        {userInfo.length ? (
          <>
            {" "}
            {pageNumber === 0 && (
              <div className="row justify-content-center">
                <div className="d-flex  flex-column">
                  <h4>חיפוש לפי שם או מייל:</h4>

                  <input
                    placeholder="הב הב אני מחכה לך..."
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            <table className="table">
              <thead>
                <tr className="row ">
                  <th className="col-1 mx-3 justify-content-center">מספר</th>
                  <th className="col-3">שם</th>
                  <th className="col-3">מייל</th>
                  <th className="col-2 d-none d-md-block">תמונה פרופיל</th>
                  <th className="col-2 "> צאט</th>
                </tr>
              </thead>
              <tbody>{displayUsers}</tbody>
            </table>
            <ReactPaginate
              previousLabel={"הקודם"}
              nextLabel={"הבא"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </>
        ) : (
          <h1 className="text-danger">אין עוד משתמשים מחוברים</h1>
        )}
      </Container>
    </>
  );
};

export default AllUsersOnline;
