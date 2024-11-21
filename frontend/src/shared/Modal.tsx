import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

type ReusableModalProps = {
  title: string;
  bodyContent: React.ReactNode;
  backdrop?: "opaque" | "blur" | "transparent";
  actions?: React.ReactNode;
  actionButtonClick: () => void;
  button: React.ReactNode;
  actionButtonText?: string;
  hideActionButton?: boolean;
};

const ReusableModal: React.FC<ReusableModalProps> = ({
  title,
  bodyContent,
  backdrop = "opaque",
  actions,
  hideActionButton = false,
  button,
  actionButtonClick,
  actionButtonText,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("is open", isOpen);
  return (
    <>
      <span onClick={onOpen}>{button}</span>
      <Modal
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={onClose}
        className="bg-[#151515]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center" >{title}</ModalHeader>
              <ModalBody>{bodyContent}</ModalBody>
              <ModalFooter>
                {actions ? (
                  actions
                ) : !hideActionButton ? (
                  <>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      onClick={actionButtonClick}
                      className="bg-[#7242f5] text-white"
                      onPress={onClose}
                    >
                      {actionButtonText || "Action"}
                    </Button>
                  </>
                ) : (
                  ""
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReusableModal;
