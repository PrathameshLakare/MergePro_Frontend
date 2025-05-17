import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  clearProfileError,
  updateFeaturedRepos,
  updateProfileData,
  updateResume,
  updateTags,
  updateCustomSlug,
} from "../features/profile/profileSlice";
import { getMyProfile } from "../features/auth/authSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const [tags, setTags] = useState(user?.tags?.join(", ") || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [customSlug, setCustomSlug] = useState(user?.customSlug || "");
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedinUrl || "");
  const [portfolioUrl, setPortfolioUrl] = useState(user?.portfolioUrl || "");
  const [featuredRepos, setFeaturedRepos] = useState(user?.featuredRepos || []);
  const [resume, setResume] = useState();
  const userId = user?._id;
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (user) {
      setTags(user.tags?.join(", ") || "");
      setBio(user.bio || "");
      setCustomSlug(user.customSlug || "");
      setLinkedinUrl(user.linkedinUrl || "");
      setPortfolioUrl(user.portfolioUrl || "");
      setFeaturedRepos(user.featuredRepos || []);
    }
  }, [dispatch, user, userId]);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleFeaturedRepos = (e, index) => {
    const { name, value } = e.target;

    setFeaturedRepos((prevRepo) =>
      prevRepo.map((repo, i) =>
        i === index ? { ...repo, [name]: value } : repo
      )
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newProfileData = { bio, linkedinUrl, portfolioUrl };

    const formData = new FormData();
    formData.append("file", resume);

    if (newProfileData) {
      dispatch(updateProfileData({ userId, userData: newProfileData }));
    }
    if (tags) {
      dispatch(updateTags({ userId, inputTags: tags.toLowerCase() }));
    }
    if (resume) {
      dispatch(updateResume({ userId, resume: formData }));
    }
    if (featuredRepos) {
      dispatch(updateFeaturedRepos({ userId, featuredRepos }));
    }
    if (customSlug && customSlug !== user.customSlug) {
      dispatch(updateCustomSlug({ userId, customSlug }));
    }
    dispatch(getUserDetails(userId));
  };

  const handleCloseAlert = () => {
    setShowError(false);
    dispatch(clearProfileError());
  };

  return (
    <div className="container py-4">
      {showError && (
        <div
          className="alert alert-danger mx-2 alert-dismissible fade show"
          role="alert"
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1050,
            minWidth: "300px",
          }}
        >
          <strong>Error:</strong> {error?.message || error}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleCloseAlert}
          ></button>
        </div>
      )}

      <h1 className="text-center mb-4">Edit Profile</h1>

      <form className="card p-4 shadow-sm" onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <div className="mb-3">
            <label className="form-label fw-bold">GitHub Username</label>
            <p className="form-control-plaintext">{user?.githubUsername}</p>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Bio</label>
          <textarea
            className="form-control"
            placeholder="Write your bio here"
            value={bio}
            rows="3"
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Custom Slug</label>
          <input
            className="form-control"
            type="text"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            placeholder="e.g. user-123 (alphanumeric, hyphens allowed, no spaces or special characters)"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Tags</label>
          <input
            className="form-control"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Example: tag1, tag2, tag3 (Max 10)"
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">LinkedIn URL</label>
            <input
              className="form-control"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              type="text"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Portfolio URL</label>
            <input
              className="form-control"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              type="text"
            />
          </div>
        </div>

        {featuredRepos.length > 0 && (
          <div className="mb-4">
            <h5 className="fw-bold mb-3">Featured Repositories</h5>
            {featuredRepos.map((repo, index) => (
              <div key={index} className="mb-3 border rounded p-3">
                <p className="fw-semibold">Repository {index + 1}</p>
                <div className="mb-2">
                  <label className="form-label">Repository URL</label>
                  <input
                    className="form-control"
                    type="text"
                    name="repoUrl"
                    value={repo.repoUrl}
                    onChange={(e) => handleFeaturedRepos(e, index)}
                  />
                </div>
                <div>
                  <label className="form-label">Repository Description</label>
                  <input
                    className="form-control"
                    type="text"
                    name="description"
                    value={repo.description}
                    onChange={(e) => handleFeaturedRepos(e, index)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label fw-bold">Resume</label>
          {user?.resumeUrl && (
            <p className="text-muted">
              Previous:{" "}
              <a href={user.resumeUrl} target="_blank" rel="noreferrer">
                {user.resumeUrl}
              </a>
            </p>
          )}
          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            className="form-control"
          />
        </div>

        <div className="">
          <button type="submit" className="btn btn-primary px-4">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
