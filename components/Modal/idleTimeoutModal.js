import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Timer from "react-compound-timer";

const IdleTimeOutModal = ({ showModal, handleCancel, handleLogout }) => {
  return (
    <div>
      <Modal isOpen={showModal} toggle={handleCancel}>
        <ModalHeader>You Have Been Idle!</ModalHeader>
        <ModalBody>
          <h2 style={{ textAlign: "center" }}>
            <Timer
              formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
              initialTime={1000 * 60 * 1}
              direction="backward"
              checkpoints={[
                {
                  time: 0,
                  callback: handleLogout,
                },
              ]}
            >
              {() => (
                <React.Fragment>
                  <Timer.Minutes /> : <Timer.Seconds />
                </React.Fragment>
              )}
            </Timer>
          </h2>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleLogout}>
            Logout
          </Button>{" "}
          <Button color="primary" onClick={handleCancel}>
            Stay
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default IdleTimeOutModal;
