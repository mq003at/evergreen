import { Bounce, toast, ToastOptions } from "react-toastify";

export const defaultToastOptions: ToastOptions = {
  position: "bottom-right",
  type: "info",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const showToastMessage = (message: string, options?: ToastOptions) => {
  const mergedOptions = { ...defaultToastOptions, ...options };
  toast(message, mergedOptions);
};

export const successToast = (message: string) => {
  showToastMessage(message, { type: "success" });
};

export const errorToast = (error: string) => {
  showToastMessage(error, { type: "error" });
}


export const reqHeaders = (token: string) => {
  return {
    Authrorization: `Bearer ${token}`,
  };
};
