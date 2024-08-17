import useApplicationStore from "@/stores/application/application.store";
import React from "react";
import ModalWrapper from "./components/modal-wrapper";

const ModalProvider = () => {
  const { modals } = useApplicationStore();
  return (
    <>
      {modals.map((modalInstance) => (
        <ModalWrapper key={modalInstance.id} modalInstance={modalInstance} />
      ))}
    </>
  );
};

export default React.memo(ModalProvider);
