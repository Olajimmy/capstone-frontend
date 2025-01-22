import { useState } from "react";
import { signUp } from "../utilities/users-services";

function SignUpForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    entryType: "", //entType || "None",
  });
  const [error, setError] = useState("");
  const [entType, setEntType] = useState("");
  // const [postImage, setPostImage] = useState({ myFile: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = { ...formData, entryType: entType };
      delete submitData.confirm;
      const user = await signUp(submitData);
      console.log(user);
      props.setUser(user);
    } catch (e) {
      setError("Sign Up Failed - Try Again");
    }
  };

  const handleTypeSelect = (e) => {
    setEntType(e.target.value);
    console.log(entType);
  };

  return (
    <div>
      <h2>Sign Up to Get Started</h2>
      <div>
        <form autoComplete="off" onSubmit={handleSubmit} className="signUpForm">
          <label>Display Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Display Name"
            required
          />
          <br />
          <label>Email Address (needs to be unique):</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <br />
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
          <br />
          <label>How Can We Help?</label>
          <select value={entType} onChange={handleTypeSelect}>
            <option value="none">Select an option</option>
            <option value="employee">I Need a Job</option>
            <option value="employer">I Need a Worker</option>
          </select>
          <br />
          <button
            type="submit"
            disabled={formData.password !== formData.confirm}
          >
            Sign Up
          </button>
        </form>
        <p className="errorText">{error}</p>
      </div>
    </div>
  );
}

export default SignUpForm;
