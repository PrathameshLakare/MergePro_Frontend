import { useParams } from "react-router-dom";
import UserDetails from "../components/UserDetails";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsById } from "../features/user/userSlice";

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { user, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUserDetailsById(userId));
  }, [dispatch, userId]);

  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="alert alert-danger text-center" role="alert">
          <p className="mb-0">Error: {error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Profile Details</h1>
      <UserDetails user={user} />
    </div>
  );
};

export default ProfileDetails;
