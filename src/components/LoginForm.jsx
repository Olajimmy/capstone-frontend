//
import { useState } from "react";
import { Link } from "react-router";
import userServices from "../utilities/users-services";

//

function LoginForm({ setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  }
  //
  async function handleSubmit(e) {
    e.preventDefault();
    //console.log(formData);
    const credentials = { ...formData };
    console.log(credentials);
    try {
      //the promise returned by the login service method will resolve to the user

      //object includes in the payload of the jwt
      const user = await userServices.login(credentials);
      setUser(user);
    } catch (err) {
      setError("log in failed - try again");
    }
  }

  //
  return (
    <>
      <h2>Login </h2>
      <div>
        <form autoComplete="off" onSubmit={handleSubmit} className="login-form">
          <h2 className="login-header">Login</h2>

          <label className="form-label">
            Email Address (needs to be unique)
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="form-input"
            />
          </label>

          <label className="form-label">
            Enter Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="form-input"
            />
          </label>

          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
        {/* <form
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{ border: "1px solid black" }}
        >
          <label
            style={{
              border: "1px solid black",
              padding: "5px",
              display: "flex",
              justifyContent: "space-evenly",
              marginBottom: "10px",
            }}
          >
            Email Address (needs to be unique)
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="enter email"
              required
            />
          </label>

          <br />
          <label
            style={{
              border: "1px solid black",
              padding: "5px",
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "10px",
            }}
          >
            Enter Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="enter password"
              required
            />
          </label>

          <br />

          <br />
          <button type="submit">Login</button>
        </form> */}
        <p>{error}</p>
      </div>
    </>
  );
}
export default LoginForm;
