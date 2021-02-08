import { Redirect } from "react-router-dom";

export const isAuthenticated = (next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("jwt");
  if (user && token) {
    return <Redirect to="/dashboard"></Redirect>;
  } else {
    next();
    // <Redirect to="/dashboard"></Redirect>;
  }
};
