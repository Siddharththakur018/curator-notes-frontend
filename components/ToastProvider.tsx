"use client";

import { useEffect } from "react";
import { CheckCircle2, CircleAlert, Info } from "lucide-react";
import { Slide, ToastContainer } from "react-toastify";

import { showErrorToast } from "@/utils/toast";

export const ToastProvider = () => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      showErrorToast(event.error ?? event.message, {
        fallback: "Something unexpected happened.",
      });
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      showErrorToast(event.reason, {
        fallback: "Something unexpected happened.",
      });
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return (
    <ToastContainer
      position="top-right"
      autoClose={3200}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Slide}
      className="curator-toast-container"
      icon={({ type }) => {
        if (type === "success") return <CheckCircle2 className="h-4 w-4" />;
        if (type === "info") return <Info className="h-4 w-4" />;
        return <CircleAlert className="h-4 w-4" />;
      }}
      toastClassName={(context) =>
        ["curator-toast", context?.defaultClassName]
          .filter(Boolean)
          .join(" ")
      }
      progressClassName="curator-toast-progress"
    />
  );
};
