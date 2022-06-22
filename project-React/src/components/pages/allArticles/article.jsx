import React from "react";
import { Container } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Article = () => {
  return (
    <>
      {/* hero */}
      <div className="d-flex flex-column text-center">
        <img
          className="img_banner d-block mx-auto mb-4"
          src="https://img.freepik.com/free-photo/cute-lovely-dog-beautiful-kurzhaar-dog-calmly-lying-floor-posing-isolated-white-studio-background_155003-45759.jpg?t=st=1655154261~exp=1655154861~hmac=00aedc7ca94fbbf35f9311d91b43d9b63f685f8abf1dd4c64723bde75a44ef67&w=1380"
          alt="dogs sleeping"
          style={{ width: "100%" }}
        />
        <h1 className="display-5 fw-bold">מאמרים בתחום הכלבנות</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-5">
            כאן תוכלו ליהנות ולהעשיר את הידע שלכם משלל מאמרים בנושאים שונים
            בתחום הכלבנות
          </p>
        </div>
      </div>
      {/* article */}
      <div className="container-fluid row">
        <div
          className="col-12 col-md-4 text-center mb-4"
          onClick={() => {
            window.location = `/A-dog-pees`;
          }}
        >
          <Card style={{ width: "auto" }}>
            <Card.Img
              style={{ width: "100%" }}
              variant="top"
              src="https://pbs.twimg.com/media/E3Fm8PDVkAE-tqE.jpg:large"
            />
            <Card.Body>
              <Card.Title>אילוף כלבים לעשיית צרכים מחוץ לבית</Card.Title>
              <Card.Text>
                חינוך הכלב לעשיית צרכיו בחוץ חשוב מאוד עבורכם...{" "}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  window.location = `/A-dog-pees`;
                }}
              >
                אילוף לצרכים{" "}
              </Button>
            </Card.Body>
          </Card>
        </div>
        {/* article */}
        <div
          className="col-12 col-md-4 text-center"
          onClick={() => {
            window.location = `/Famous_dogs_in_history`;
          }}
        >
          <Card style={{ width: "auto" }}>
            <Card.Img
              style={{ width: "100%" }}
              variant="top"
              src="https://img.freepik.com/free-photo/cute-little-dog-impersonating-business-person_23-2148985938.jpg?w=996&t=st=1655154561~exp=1655155161~hmac=2d3c4fb52b5f831c2c8c568d4d9da13caeb278eeccc3a2ab5bad3f9c6ba2a71c"
            />
            <Card.Body>
              <Card.Title>5 כלבים מפורסמים בהיסטוריה</Card.Title>
              <Card.Text>
                חינוך הכלב לעשיית צרכיו בחוץ חשוב מאוד עבורכם אך גם עבור חיית
                המחמד שאימצתם...
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  window.location = `/Famous_dogs_in_history`;
                }}
              >
                כלבים בהיסטוריה
              </Button>
            </Card.Body>
          </Card>
        </div>
        {/* article */}
        <div
          className="col-12 col-md-4 text-center"
          onClick={() => {
            window.location = `/selectingMyDog`;
          }}
        >
          <Card style={{ width: "auto" }}>
            <Card.Img
              style={{ width: "100%" }}
              variant="top"
              src="https://img.freepik.com/free-photo/beautiful-pet-portrait-dog-with-juice_23-2149218477.jpg?t=st=1655154555~exp=1655155155~hmac=ad7bfb3c2ec349940d728a9947dd67e8770901aa1a6b922a98a506a5923c3b43&w=996"
            />
            <Card.Body>
              <Card.Title>כיצד אבחר את הכלב שמתאים לי</Card.Title>
              <Card.Text>
                בשעה טובה החלטת לאמץ כלב ולהכניס חיית מחמד פרוותית ורגישה
                לחייך...
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  window.location = `/selectingMyDog`;
                }}
              >
                בחירה נכונה של כלב
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Article;
