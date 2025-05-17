import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../features/user/userSlice";
import { Link } from "react-router-dom";

const UserProfiles = () => {
  const dispatch = useDispatch();
  const { profiles, status, error } = useSelector((state) => state.users);
  const [tags, setTags] = useState("");

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (tags.trim() !== "") {
      dispatch(getProfiles({ tags }));
    }
  };

  const clearSearch = () => {
    setTags("");
    dispatch(getProfiles());
  };

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
      <h1 className="mb-4 text-center">Users Profile</h1>

      <form
        className="d-flex mb-3 justify-content-center"
        onSubmit={handleSearch}
      >
        <input
          className="form-control me-2 w-50"
          type="search"
          placeholder="Search by tags"
          aria-label="Search"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button className="btn btn-outline-success me-2" type="submit">
          Search
        </button>
        {tags && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={clearSearch}
          >
            Clear
          </button>
        )}
      </form>

      {status === "loading" && (
        <div className="d-flex justify-content-center mb-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {profiles.length > 0 ? (
        profiles.map((profile) => (
          <div key={profile._id} className="card shadow-sm mb-4">
            <div className="d-flex flex-column flex-md-row align-items-center p-3">
              <div className="text-center me-md-4 mb-3 mb-md-0">
                <Link to={`/profile-details/${profile._id}`}>
                  <img
                    src={profile.avatarUrl}
                    alt="avatar"
                    className="rounded-circle"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </div>
              <div className="flex-grow-1">
                <h5 className="card-title">
                  <Link
                    to={`/profile-details/${profile._id}`}
                    className="text-decoration-none text-dark"
                  >
                    {profile.githubUsername}
                  </Link>
                </h5>
                <p className="card-text">{profile.bio || "No bio yet"}</p>
                <div className="mb-2">
                  <strong>Tags: </strong>
                  {profile.tags.map((tag, i) => (
                    <span key={i} className="badge bg-secondary me-1">
                      #{tag.toUpperCase()}
                    </span>
                  ))}
                </div>
                {profile.resumeUrl && (
                  <p className="card-text">
                    <strong>Resume:</strong>{" "}
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </p>
                )}
                <Link
                  to={`/profile-details/${profile._id}`}
                  className="btn btn-outline-primary btn-sm mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">No user found</div>
      )}
    </div>
  );
};

export default UserProfiles;
