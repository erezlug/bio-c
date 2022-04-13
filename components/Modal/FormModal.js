import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  //   Input,
} from "reactstrap";
// import { useDispatch, useSelector } from "react-redux";
// import * as messageActions from "../../redux/actions/messageActions";

const FormModal = (props) => {
  // const dispatch = useDispatch();
  // const messageState = useSelector((state) => state.message);

  // const handleClose = () => {
  //   dispatch(messageActions.closeModal());
  // };
  // const closeModalAccept = () => {
  //   dispatch(messageActions.closeModalAccept());
  // };
  //   const [password, setPassword] = useState();
  const { submit, isOpen, toggle, load, errMessage } = props;

  // const [modal, setModal] = useState(isOpen);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Profile</ModalHeader>
      <ModalBody>
        {load ? (
          <div>
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <h6 className="mb-3">
              Are you sure you want to update your profile?
            </h6>

            {/* <Input
              value={password}
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            /> */}
            {errMessage && <span style={{ color: "red" }}>{errMessage}</span>}
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => submit()}>
          Update
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FormModal;
