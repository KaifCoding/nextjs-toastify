'use client';
import React, { createContext, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorIcon, InfoIcon, LoadingIcon, SuccessIcon, WarningIcon } from './Icons';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (id, message, type = 'info', options = {}) => {
    const { autoClose = true, closeIn = 3, position = 'top-right' } = options;

    setToasts((prev) => [...prev, { id, message, type, autoClose, closeIn, position }]);

    if (type !== 'loading' && autoClose) {
      setTimeout(() => removeToast(id), closeIn * 1000);
    }

    return id;
  };

  const updateToast = (id, { message, type, autoClose = true, closeIn = 3 }) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, message, type, autoClose, closeIn } : toast
      )
    );

    if (type !== 'loading' && autoClose) {
      setTimeout(() => removeToast(id), closeIn * 1000);
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const toastStyles = {
    success: 'text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800',
    error: 'text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800',
    info: 'text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800',
    warning: 'text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 dark:border-yellow-800',
    loading: 'text-gray-800 border-t-4 border-gray-300 bg-gray-50 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600',
  };

  const toastIcons = {
    success: <SuccessIcon />,
    error: <ErrorIcon />,
    warning: <WarningIcon />,
    info: <InfoIcon />,
    loading: <LoadingIcon />,
  };

  const ringColor = {
    success: 'green',
    error: 'red',
    warning: 'yellow',
    info: 'blue',
    loading: 'gray',
  };

  const positionClasses = {
    'top-left': 'top-5 left-5 items-start',
    'top-center': 'top-5 left-1/2 -translate-x-1/2 items-center',
    'top-right': 'top-5 right-5 items-end',
    'center-left': 'top-1/2 left-5 -translate-y-1/2 items-start',
    'center-center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center',
    'center-right': 'top-1/2 right-5 -translate-y-1/2 items-end',
    'bottom-left': 'bottom-5 left-5 items-start',
    'bottom-center': 'bottom-5 left-1/2 -translate-x-1/2 items-center',
    'bottom-right': 'bottom-5 right-5 items-end',
  };

  const groupedToasts = toasts.reduce((acc, toast) => {
    acc[toast.position] = acc[toast.position] || [];
    acc[toast.position].push(toast);
    return acc;
  }, {});

  return (
    <ToastContext.Provider value={{ addToast, updateToast, removeToast }}>
      {children}
      {Object.entries(groupedToasts).map(([position, items]) => (
        <div
          key={position}
          className={`fixed z-50 flex flex-col space-y-2 ${positionClasses[position]}`}
        >
          <AnimatePresence>
            {items.map((toast) => (
              <motion.div
                layout
                key={toast.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`flex items-center p-4 mb-4 rounded-lg shadow ${toastStyles[toast.type]} gap-3`}
                role="alert"
              >
                {toastIcons[toast.type]}
                <div className="text-sm font-medium">{toast.message}</div>

                {toast.type !== 'loading' && (
                  <button
                    onClick={() => removeToast(toast.id)}
                    className={`ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg h-8 w-8 inline-flex items-center justify-center focus:ring-2 focus:ring-${ringColor[toast.type]}-400`}
                    aria-label="Close"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ))}
    </ToastContext.Provider>
  );
};

export default ToastContext;
