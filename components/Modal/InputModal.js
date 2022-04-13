import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

//NextJS
import { useRouter } from "next/router";

const InputModal = (props) => {
  const { isOpen, className, toggle, sendPassword } = props;
  const router = useRouter();
  const [input, setInput] = useState("");

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={() => {
          sendPassword(input);
        }}
        className={className}
      >
        {/* <ModalHeader toggle={toggle} charCode="X"> */}
        <ModalHeader>This Survey requires password</ModalHeader>
        <ModalBody>
          <Input
            onChange={(e) => {
              e.preventDefault();
              setInput(e.target.value);
            }}
            placeholder="Type password here..."
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              sendPassword(input);
            }}
          >
            Submit
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              router.push("/");
            }}
          >
            Back to Home Page
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default InputModal;
