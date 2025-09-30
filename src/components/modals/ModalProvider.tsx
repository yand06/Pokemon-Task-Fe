// components/modals/ModalProvider.tsx
import React from "react";
import { useModal } from "../../hooks/useModal";
import ConfirmModal from "./ConfirmModal";
import InputModal from "./InputModal";

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { modal } = useModal();

  return (
    <>
      {children}

      {modal.type === "confirm" && (
        <ConfirmModal isOpen={modal.isOpen} {...modal.props} />
      )}

      {modal.type === "input" && (
        <InputModal isOpen={modal.isOpen} {...modal.props} />
      )}
    </>
  );
};
