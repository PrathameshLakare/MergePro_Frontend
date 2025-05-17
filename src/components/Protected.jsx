import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getMyProfile } from "../features/auth/authSlice";

const Protected = ({ children }) => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  if (!user && status === "error") {
    return <Navigate to="/" />;
  }

  return children;
};

export default Protected;
