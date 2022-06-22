const PageHeader = ({ title }) => {
  return (
    <div className="row">
      <div className="col-12 mt-3 text-center">
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center ">
          <div className="col-md-12">
            <h1 className="display-1 fw-normal">{title}</h1>
            <h5 className="col-md-12 p-sm-4 mx-auto my-2">
              דוגיט הינה פלטפורמה למציאת בעלי עסקים בתחום הכלבנות{" "}
            </h5>
            <p>
              Dogit היא הפלטפורמה הראשונה והיחידה בארץ כיום של נותני שירותים
              בתחום הכלבנות.
              <br /> אצלנו תוכלו למצוא מאלפים, דוגווקרים ובעתיד עסקים רבים
              ומגוונים המובילים בתחום הכלבנות.
              <br />
              <br />
              בעל/ת כלב?!
              <br /> אז בואו תצטרפו לקהילה שלנו ההולכת וגדלה ( מוזמנים לחפש
              אותנו בפייסבוק). <br />
              עולם הכלבנות הינו עולם מיוחדים ששייך לחברינו ההולכים על 4, מגיעים
              להם להתפנק ולקבל את הטוב ביותר.
              <br /> אז מה לא תשקיעו??
              <br /> יאללה תירשמו ותעשו לייק.
              <br />
              <br /> בואו להנות משלל שירותים .
            </p>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
