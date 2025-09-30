// hooks/useModal.tsx
import { useState, useCallback } from "react";

interface ModalState {
  isOpen: boolean;
  type: "confirm" | "input" | null;
  props: any;
}

export const useModal = () => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: null,
    props: {},
  });

  const showConfirm = useCallback((props: any) => {
    return new Promise<boolean>((resolve) => {
      setModal({
        isOpen: true,
        type: "confirm",
        props: {
          ...props,
          onConfirm: () => {
            setModal({ isOpen: false, type: null, props: {} });
            resolve(true);
          },
          onClose: () => {
            setModal({ isOpen: false, type: null, props: {} });
            resolve(false);
          },
        },
      });
    });
  }, []);

  const showInput = useCallback((props: any) => {
    return new Promise<string | null>((resolve) => {
      setModal({
        isOpen: true,
        type: "input",
        props: {
          ...props,
          onConfirm: (value: string) => {
            setModal({ isOpen: false, type: null, props: {} });
            resolve(value);
          },
          onClose: () => {
            setModal({ isOpen: false, type: null, props: {} });
            resolve(null);
          },
        },
      });
    });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ isOpen: false, type: null, props: {} });
  }, []);

  return {
    modal,
    showConfirm,
    showInput,
    closeModal,
  };
};
