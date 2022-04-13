//React
import React, { useState } from "react";

//Reactstrap
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";

//Redux
import { useSelector } from "react-redux";

//NextJS
import { useRouter } from "next/router";

const AcceptModal = (props) => {
  const router = useRouter();
  const { isOpen, momzSurveyId, setModal } = props;
  const language = useSelector((state) => state.language);

  const title = {
    display: "flex",
    "text-align": "right",
    direction: "rtl",

    fontWeight: "bold",
  };
  const hebrew = { display: "flex", "text-align": "right", direction: "rtl" };

  return (
    <div>
      <Modal isOpen={isOpen} size="xl">
        <ModalHeader style={title}>
          <h1 style={{ ...title, textDecoration: "underline" }}>
            {language.sureyTerms}
          </h1>
          <h5 style={hebrew}>
            לפני אישורך להשתתפות, בבקשה לקרוא את המסמך ה"הסכמה מדעת", אשר מסביר
            בצורה מפורטת על תהליך המחקר.
          </h5>
          <h5 style={hebrew}>
            הסכמה מדעת להשתתפות במחקר רפואי - מספר מחקר 0028-21-HMO
          </h5>
        </ModalHeader>
        <ModalBody>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <iframe
              title="agreementForm"
              src="/agreement/AgreementForm.pdf"
              frameBorder="0"
              width="70%"
              height="550px"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <h4 style={hebrew}>
            על מנת להתחיל את המחקר, אנא לחצי על כפתור "מאשרת".{" "}
          </h4>
        </ModalFooter>

        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              router.push(`/momz/${momzSurveyId}`);
            }}
          >
            {language.accept}
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              setModal(false);
            }}
          >
            {language.decline}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AcceptModal;
