import React from "react";

const FinishSurveyCards = () => {
  return (
    <React.Fragment>
      <div className="services-area pb-70">
        <div className="container">
          <div className="section-title-two">{/* <span>Services</span> */}</div>

          <div className="row">
            <div className="col-sm-10 col-lg-4">
              <div
                className="service-item"
                style={{
                  backgroundColor: "#02AEEB",
                  color: "white",
                  minHeight: "455px",
                }}
              >
                <div className="d-table">
                  <div className="d-table-cell">
                    <img
                      className="mb-1 mt-3"
                      alt="logoImage"
                      src="/images/brand/telHashomer.png"
                      style={{ width: "15rem" }}
                    ></img>

                    <h3
                      className="mt-5"
                      style={{ color: "white", fontSize: "2rem" }}
                    >
                      מרפאת חווה
                    </h3>
                    <p style={{ fontSize: "1rem" }}>
                      מרפאה לבריאות הנפש של האישה בבי"ח תל השומר
                    </p>
                    <p style={{ fontSize: "1rem" }}>
                      עובדים כיום און-ליין וניתן לפנות מכל הארץ
                    </p>
                    <p style={{ fontSize: "1rem" }}>טלפון: 03-5305915</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-10 col-lg-4">
              <div
                className="service-item"
                style={{
                  backgroundColor: "#02AEEB",
                  color: "white",
                  minHeight: "455px",
                }}
              >
                <div className="d-table">
                  <div className="d-table-cell">
                    <img
                      alt="logoImage"
                      src="/images/brand/hadasa.png"
                      style={{ width: "10rem" }}
                    ></img>

                    <h3 style={{ color: "white", fontSize: "2rem" }}>
                      מרפאת בריאות הנפש בהדסה עין כרם
                    </h3>
                    <p style={{ fontSize: "1rem" }}>
                      ניתן לפנות לד"ר ענבל ראובני, מנהלת המרפאה ואחראית על
                      השירות לבריאות הנפש של האישה
                    </p>
                    <p style={{ fontSize: "1rem" }}>
                      עובדים כיום און-ליין וניתן לפנות מכל הארץ
                    </p>
                    <p style={{ fontSize: "1rem" }}>טלפון: 02-6777348</p>
                    <p style={{ fontSize: "1rem" }}>טלפון: 02-6777063</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-10 col-lg-4">
              <div
                className="service-item"
                style={{
                  backgroundColor: "#02AEEB",
                  color: "white",
                  minHeight: "455px",
                }}
              >
                <div className="d-table">
                  <div className="d-table-cell">
                    <img
                      className="mb-2"
                      alt="logoImage"
                      src="/images/brand/sourasky.png"
                      style={{ width: "7rem" }}
                    ></img>

                    <h3 style={{ color: "white", fontSize: "2rem" }}>
                      מרפאת בריאות הנפש של האישה באיכילוב
                    </h3>
                    <p style={{ fontSize: "1rem" }}>
                      מציעים כיום טיפול אונליין וניתן לפנות
                    </p>
                    <p style={{ fontSize: "1rem" }}>
                      כמה מגבלות בירוקרטיות כמו הצורך להיות מטופלת בעבר באיכילוב
                      (בכל אגף שהוא), וכדאי לברר מולם
                    </p>
                    <p style={{ fontSize: "1rem" }}>טלפון: 03-6974707</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FinishSurveyCards;
