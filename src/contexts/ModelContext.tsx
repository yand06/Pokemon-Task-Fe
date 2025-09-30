import React, { createContext, useContext, useState } from "react";
import ConfirmModal from "../components/modals/ConfirmModal";
import InputModal from "../components/modals/InputModal";
import ErrorBoundary from "../components/error/ErrorBoundary";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "info" | "warning" | "error" | "success" | "pokemon";
}

interface InputModalProps {
  title: string;
  message: string;
  placeholder?: string;
  defaultValue?: string;
  confirmText?: string;
  cancelText?: string;
  validation?: (value: string) => string | null;
}

// Context type
interface ModalContextType {
  showConfirm: (props: ConfirmModalProps) => Promise<boolean>;
  showInput: (props: InputModalProps) => Promise<string | null>;
  closeModal: () => void;
}

// Modal state interface
interface ModalState {
  type: "confirm" | "input" | null;
  props: any;
  resolve: ((value: any) => void) | null;
  isOpen: boolean;
}

// Create context
const ModalContext = createContext<ModalContextType | null>(null);

// Custom hook untuk menggunakan modal context
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

// Modal Provider Component
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    props: {},
    resolve: null,
    isOpen: false,
  });

  // Function untuk show confirm modal
  const showConfirm = (props: ConfirmModalProps): Promise<boolean> => {
    return new Promise((resolve) => {
      setModalState({
        type: "confirm",
        props,
        resolve,
        isOpen: true,
      });
    });
  };

  // Function untuk show input modal
  const showInput = (props: InputModalProps): Promise<string | null> => {
    return new Promise((resolve) => {
      setModalState({
        type: "input",
        props,
        resolve,
        isOpen: true,
      });
    });
  };

  // Function untuk close modal
  const closeModal = () => {
    if (modalState.resolve) {
      modalState.resolve(modalState.type === "input" ? null : false);
    }
    setModalState({
      type: null,
      props: {},
      resolve: null,
      isOpen: false,
    });
  };

  // Handle confirm modal response
  const handleConfirmResponse = React.useCallback(
    (confirmed: boolean) => {
      try {
        if (modalState.resolve) {
          modalState.resolve(confirmed);
        }
      } catch (error) {
        console.error("Error in modal response:", error);
      } finally {
        // ✅ Cleanup dengan delay
        setTimeout(() => {
          setModalState({
            type: null,
            props: {},
            resolve: null,
            isOpen: false,
          });
        }, 100);
      }
    },
    [modalState]
  );

  // Handle input modal response
  const handleInputResponse = React.useCallback(
    (value: string | null) => {
      try {
        if (modalState.resolve) {
          modalState.resolve(value);
        }
      } catch (error) {
        console.error("Error in modal response:", error);
      } finally {
        // ✅ Cleanup dengan delay
        setTimeout(() => {
          setModalState({
            type: null,
            props: {},
            resolve: null,
            isOpen: false,
          });
        }, 100);
      }
    },
    [modalState]
  );

  // Context value
  const contextValue: ModalContextType = {
    showConfirm,
    showInput,
    closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}

      {/* ✅ Wrap modals dengan Error Boundary */}
      <ErrorBoundary
        onError={(error, errorInfo) => {
          console.error("Modal Error:", error, errorInfo);
          // ✅ Auto cleanup on error
          setModalState({
            type: null,
            props: {},
            resolve: null,
            isOpen: false,
          });
        }}
      >
        {/* Render Confirm Modal */}
        {modalState.type === "confirm" && (
          <ConfirmModal
            isOpen={modalState.isOpen}
            onConfirm={() => handleConfirmResponse(true)}
            onClose={() => handleConfirmResponse(false)}
            loading={false}
            {...modalState.props}
          />
        )}

        {/* Render Input Modal */}
        {modalState.type === "input" && (
          <InputModal
            isOpen={modalState.isOpen}
            onConfirm={(value: string) => handleInputResponse(value)}
            onClose={() => handleInputResponse(null)}
            loading={false}
            {...modalState.props}
          />
        )}
      </ErrorBoundary>
    </ModalContext.Provider>
  );
};

export { ModalContext };

export type { ConfirmModalProps, InputModalProps };
