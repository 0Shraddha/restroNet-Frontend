import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Reusable ToastNotification Component with customizable props
const ToastNotification = ({
  position = "top-right",     // Default position
  autoClose = 1000,           // Default auto-close time in milliseconds
  hideProgressBar = false,    // Default to show progress bar
  newestOnTop = false,        // Default for toast order
  rtl = false,                // Right-to-left layout
  pauseOnFocusLoss = true,    // Pause on focus loss
  draggable = true,           // Make the toast draggable
  pauseOnHover = true,        // Pause on hover
  theme = "light",            // Default theme
}) => {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      closeOnClick
      rtl={rtl}
      pauseOnFocusLoss={pauseOnFocusLoss}
      draggable={draggable}
      pauseOnHover={pauseOnHover}
      theme={theme}
      style={{ position: 'fixed', zIndex: 99999999999999 }}
    />
  );
};

// Helper functions for triggering different types of toasts with customizable options
export const showSuccessToast = (message, options = {}) => {
  const capitalizeMessage = message.replace(/\b\w/g, (char) => char.toUpperCase());
  toast.success(capitalizeMessage, {
    position: options.position || "top-right",
    autoClose: options.autoClose || 2000,
    hideProgressBar: options.hideProgressBar || false,
    theme: options.theme || "light",
    ...options, // Spread any other options if provided
  });
};

export const showErrorToast = (message, options = {}) => {
  // Capitalize the first letter of each word in the message
  const capitalizeMessage = message.replace(/\b\w/g, (char) => char.toUpperCase());
  toast.error(capitalizeMessage, {
    position: options.position || "top-right",
    autoClose: options.autoClose || 2000,
    hideProgressBar: options.hideProgressBar || false,
    theme: options.theme || "light",
    ...options,
  });
};


export const showInfoToast = (message, options = {}) => {
  const capitalizeMessage = message.replace(/\b\w/g, (char) => char.toUpperCase());
  toast.info(capitalizeMessage, {
    position: options.position || "top-right",
    autoClose: options.autoClose || 100,
    hideProgressBar: options.hideProgressBar || false,
    theme: options.theme || "light",
    ...options,
  });
};

export const showWarningToast = (message, options = {}) => {
  const capitalizeMessage = message.replace(/\b\w/g, (char) => char.toUpperCase());
  toast.warn(capitalizeMessage, {
    position: options.position || "top-right",
    autoClose: options.autoClose || 100,
    hideProgressBar: options.hideProgressBar || false,
    theme: options.theme || "light",
    ...options,
  });
};

export default ToastNotification;
