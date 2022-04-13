import React from "react";

/////CSS Imports/////
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

/////Redux Imports/////
import * as messageActions from "../../redux/actions/messageActions";
import { useDispatch, useSelector } from "react-redux";

const MessageModal = () => {
  const dispatch = useDispatch();
  const messageState = useSelector((state) => state.message);

  const handleClose = () => {
    dispatch(messageActions.closeModal());
  };
  const closeModalAccept = () => {
    dispatch(messageActions.closeModalAccept());
  };

  return (
    <Modal
      isOpen={messageState.isMessage}
      toggle={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader>
        {/* <ModalTitle style={{ display: "d--flex justifyContent-center" }}> */}
        {messageState.title}
        {/* </ModalTitle> */}
      </ModalHeader>

      {messageState.errorMessage ? (
        <ModalBody>{messageState.errorMessage}</ModalBody>
      ) : (
        <ModalBody>
          {messageState.messageRow1}
          <br />
          {messageState.messageRow2}
        </ModalBody>
      )}
      <ModalFooter>
        <Button color={messageState.buttonColor} onClick={handleClose}>
          {messageState.buttonText}
        </Button>
        {messageState.secondButtonText ? (
          <Button
            color={messageState.secondButtonColor}
            onClick={closeModalAccept}
          >
            {messageState.secondButtonText}
          </Button>
        ) : null}
      </ModalFooter>
    </Modal>
  );
};

export default MessageModal;
