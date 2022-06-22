import serviceCommon from "../../services/commonService";

const ShowClock = ({ clock }) => {
  if (!clock || clock === "") {
    return;
  }

  return (
    <>
      {Object.keys(clock).map((Key, index) => {
        return (
          <div key={index}>
            {serviceCommon.nameDayToHebrew(Key)}
            {clock[Key].closed
              ? " -סגור "
              : `- שעת התחלה: ${clock[Key]["start"]}:00  שעת סיום : ${clock[Key]["end"]}:00`}
          </div>
        );
      })}
    </>
  );
};

export default ShowClock;
