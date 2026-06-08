"use client";

import axios from "axios";
import { toast } from "react-toastify";

type ErrorToastOptions = {
  fallback?: string;
};

const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

const firebaseErrorMessages: Record<string, string> = {
  "auth/email-already-in-use": "An account already exists with this email.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/network-request-failed": "Network error. Please check your connection.",
  "auth/too-many-requests": "Too many attempts. Please try again in a moment.",
  "auth/user-not-found": "No account was found with these credentials.",
  "auth/wrong-password": "Invalid email or password.",
};

export const getErrorMessage = (
  error: unknown,
  fallback = DEFAULT_ERROR_MESSAGE,
) => {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code?: unknown }).code)
      : "";

  if (firebaseErrorMessages[code]) {
    return firebaseErrorMessages[code];
  }

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Could not connect. Please check your internet.";
    }

    if (error.response.status === 401 || error.response.status === 403) {
      return "Please sign in again to continue.";
    }

    if (error.response.status === 404) {
      return "We could not find what you requested.";
    }

    if (error.response.status >= 500) {
      return "Server issue. Please try again in a moment.";
    }

    return fallback;
  }

  if (typeof error === "string" && error.trim().length > 0) {
    return error;
  }

  return fallback;
};

export const showErrorToast = (
  error: unknown,
  options: ErrorToastOptions = {},
) => {
  const message = getErrorMessage(error, options.fallback);

  toast.error(message, {
    toastId: message,
  });

  return message;
};
