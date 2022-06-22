import React from "react";

const Footer = () => {
  return (
    <div className="footerBackGroundColor fixed-bottom">
      <div className="d-flex justify-content-center">
        פלטפורמה בתחום הכלבנות © 2022 Dogit
        <a
          href="https://www.facebook.com/dogit.dog"
          target="_blank"
          rel="noopener noreferrer"
          title="facebookGroup"
          className="mx-3"
        >
          <i className="bi bi-facebook "></i>
        </a>
      </div>
    </div>
  );
};
export default Footer;
  