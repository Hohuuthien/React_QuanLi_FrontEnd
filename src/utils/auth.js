export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const login = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === "Admin";
};
