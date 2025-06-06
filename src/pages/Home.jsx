import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserDetails from "../components/UserDetails";
import { createNewUser } from "../features/auth/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(createNewUser());
  }, [dispatch]);

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
      <h1 className="mb-4 text-center">My Profile</h1>
      {user && (
        <div className="card shadow p-4">
          <div className="row align-items-center mb-4">
            <div className="col-12 col-md-auto text-center mb-3 mb-md-0">
              <img
                className="rounded-circle"
                src={user.avatarUrl}
                alt="User Avatar"
                width="120"
                height="120"
              />
            </div>
            <div className="col">
              <h2 className="mb-0">Welcome, {user.githubUsername}</h2>
              {user.bio && <p className="text-muted mt-1">{user.bio}</p>}
              {user.tags && user.tags.length > 0 && (
                <div className="mt-3">
                  <strong>Tags: </strong>
                  {user.tags.map((tag, i) => (
                    <span key={i} className="badge bg-secondary me-2">
                      #{tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <h4 className="mt-4">Featured Repositories</h4>
          <ul className="list-group mb-4">
            {user.featuredRepos?.length > 0 ? (
              user.featuredRepos.map((repo, index) => (
                <li key={index} className="list-group-item">
                  <p className="mb-1">
                    <strong>Repo URL:</strong>{" "}
                    <a
                      href={repo.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.repoUrl}
                    </a>
                  </p>
                  <p className="mb-0">
                    <strong>Repo Description:</strong> {repo.description}
                  </p>
                </li>
              ))
            ) : (
              <li className="list-group-item">
                No featured repositories found.
              </li>
            )}
          </ul>

          <div>
            {user.linkedinUrl && (
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={user.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.linkedinUrl}
                </a>
              </p>
            )}
            {user.portfolioUrl && (
              <p>
                <strong>Portfolio:</strong>{" "}
                <a
                  href={user.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.portfolioUrl}
                </a>
              </p>
            )}
            {user.resumeUrl && (
              <p>
                <strong>Resume:</strong>{" "}
                <a
                  href={user.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
