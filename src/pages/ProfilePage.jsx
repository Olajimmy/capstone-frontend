import { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "../utilities/users-services"; // Assuming this function fetches the logged-in user

function ProfilePage() {
  const [entries, setEntries] = useState([]);
  const [unique, setUnique] = useState({});
  const [picture, setPicture] = useState(null);

  const LOCAL_URL = `http://localhost:5050`;
  const deployedVariable = `https://capstone-backend-1hvk.onrender.com`;

  const getEntries = async () => {
    console.log(`Fetching entries...`);
    try {
      const response = await axios.get(`${deployedVariable}/api/users/`);
      console.log("response.data", response.data);
      setEntries(response.data);
      setUnique(getUser());
      console.log(unique.email);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const uploadPicture = async (e) => {
    e.preventDefault();
    if (!picture) {
      console.log("No image selected");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", picture);

      const response = await axios.put(
        `${deployedVariable}/api/users/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Image uploaded successfully", response.data);
      setEntries(response.data);
      setUnique(getUser()); // refresh user data if needed
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <>
      <div className="profile-container">
        <h2>Welcome to Your Profile</h2>

        {/* User Profile Information */}
        <div className="profile-info">
          <div className="profile-details">
            <label
              style={{
                border: "0px solid black",
                padding: "5px",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              {" "}
              <strong>Name:</strong> {unique.name}
            </label>
            <br />
            <label
              style={{
                border: "0px solid black",
                padding: "5px",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              {" "}
              <strong>Email:</strong> {unique.email}
            </label>
            <br />
            <label
              style={{
                border: "0px solid black",
                padding: "5px",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              {" "}
              <strong>User Id:</strong> {unique._id}
            </label>
            <br />
            <label
              style={{
                border: "0px solid black",
                padding: "5px",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              {" "}
              <strong>Status:</strong> {unique.entryType}
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
