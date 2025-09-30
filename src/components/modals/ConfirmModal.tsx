// components/modals/ConfirmModal.tsx
import React from "react";
import BaseModal from "./BaseModal";
import ErrorBoundary from "../error/ErrorBoundary";
import {
  MdWarning,
  MdCheckCircle,
  MdInfo,
  MdError,
  MdCatchingPokemon,
} from "react-icons/md";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: "info" | "warning" | "error" | "success" | "pokemon";
  loading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm", // ✅ Default values
  message = "Are you sure?", // ✅ Default values
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "info",
  loading = false,
}) => {
  // ✅ Safe error handling untuk props
  const handleConfirm = React.useCallback(() => {
    try {
      onConfirm?.();
    } catch (error) {
      console.error("Error in onConfirm callback:", error);
    }
  }, [onConfirm]);

  const handleClose = React.useCallback(() => {
    try {
      onClose?.();
    } catch (error) {
      console.error("Error in onClose callback:", error);
    }
  }, [onClose]);

  const iconMap = {
    info: {
      icon: MdInfo,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    warning: {
      icon: MdWarning,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100 dark:bg-yellow-900",
    },
    error: {
      icon: MdError,
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900",
    },
    success: {
      icon: MdCheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    pokemon: {
      icon: MdCatchingPokemon,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
  };

  const { icon: Icon, color, bgColor } = iconMap[type] || iconMap.info; // ✅ Fallback

  const buttonMap = {
    info: "bg-blue-500 hover:bg-blue-600 shadow-blue-500/25",
    warning: "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/25",
    error: "bg-red-500 hover:bg-red-600 shadow-red-500/25",
    success: "bg-green-500 hover:bg-green-600 shadow-green-500/25",
    pokemon: "bg-purple-500 hover:bg-purple-600 shadow-purple-500/25",
  };

  const buttonClass = buttonMap[type] || buttonMap.info; // ✅ Fallback

  return (
    <ErrorBoundary
      onError={(error: any, errorInfo: any) => {
        console.error("ConfirmModal Error:", error, errorInfo);
      }}
    >
      <BaseModal isOpen={isOpen} onClose={handleClose} title={title} size="sm">
        <div className="text-center">
          {/* Pokemon-style icon container */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-20 h-20 rounded-full ${bgColor} flex items-center justify-center ring-4 ring-white/50 shadow-lg`}
            >
              {Icon && <Icon className={`w-10 h-10 ${color}`} />}
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed">
            {message || "Are you sure you want to proceed?"}
          </p>

          {/* Pokemon-themed buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleClose}
              disabled={loading}
              className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl font-semibold transition-all duration-200 shadow-lg disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className={`px-6 py-3 text-white ${buttonClass} rounded-xl font-semibold transition-all duration-200 shadow-lg disabled:opacity-50 flex items-center gap-2`}
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {confirmText}
            </button>
          </div>
        </div>
      </BaseModal>
    </ErrorBoundary>
  );
};

export default ConfirmModal;
