import { BsGithub } from "react-icons/bs";

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-5 shadow-lg text-center"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="mb-4">MergePro</h2>
        <p className="mb-4 text-muted">
          Login with your GitHub account to continue
        </p>
        <a
          href="http://localhost:5000/v1/auth/github"
          className="btn btn-dark w-100"
        >
          <i className="bi bi-github me-2">
            <BsGithub />
          </i>{" "}
          Login with GitHub
        </a>
      </div>
    </div>
  );
};

export default Login;
