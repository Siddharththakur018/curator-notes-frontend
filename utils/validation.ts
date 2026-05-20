export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export const validateEmail = (email: string) => {
  if (!emailRegex.test(email)) {
    return "Please enter a valid email";
  }

  return "";
};

export const validatePassword = (password: string) => {
  if (!passwordRegex.test(password)) {
    return "Password must contain uppercase, lowercase, number, special character and be 8-20 characters long";
  }

  return "";
};


export const isValidEmail = (email: string) => {
  return emailRegex.test(email);
};

export const isValidPassword = (password: string) => {
  return passwordRegex.test(password);
};
