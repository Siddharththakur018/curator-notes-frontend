"use client";

import { useEffect } from "react";
import { CircleAlert } from "lucide-react";
import { ToastContainer } from "react-toastify";

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
      theme="light"
      className="curator-toast-container"
      icon={<CircleAlert className="h-4 w-4" />}
      toastClassName={() =>
        "curator-toast border border-slate-200 bg-white text-slate-900 shadow-xl shadow-slate-900/10"
      }
      progressClassName="curator-toast-progress"
    />
  );
};
