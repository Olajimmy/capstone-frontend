//********************Boundary */
import { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "../utilities/users-services";

function JobPostPage() {
  const [currentUser, setCurrentUser] = useState(getUser());
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    email: currentUser.email,
    jobType: "",
    jobDescription: "",
    payRange: "",
    comments: "",
    businessAddress: "",
    phone: "",
  });
  //
  const [editButton, setEditButton] = useState(false);
  const [editingData, setEditingData] = useState({});
  const [freshId, setFreshId] = useState("");
  const [textData, setTextData] = useState({
    jobType: "",
  });

  const [update, setUpdate] = useState("");
  //const [entType, setEntType] = useState("");
  const LOCAL_URL = `http://localhost:5050`;
  const deployedVariable = `https://capstone-backend-1hvk.onrender.com`;

  const getEntries = async () => {
    console.log(`in getEntries`);
    //fetch calendar entries from the back end
    //aslo known as the api that i an creating
    //this endpoint is:
    // /api/calendar

    try {
      const response = await axios.get(`${deployedVariable}/api/jobpost`);
      console.log("response.data", response.data);
      setEntries(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  //
  const addEntry = async (newEntry) => {
    let error = false;
    let addedEntry = {};
    try {
      const response = await axios.post(
        `${deployedVariable}/api/jobpost`,
        newEntry
      );
      addedEntry = response.data;
      console.log("addedEntry", response.data);
      setEntries(response.data);
    } catch (e) {
      error = true;
      console.error(e);
    } finally {
      // lets the user knows if the add was successfull or not
      if (error) {
        setUpdate("there was an error");
      } else {
        //once i actually implement the post route in my backend, i will show added entry

        setUpdate(`Job successfully added to the Database`);
        console.log(
          `${addedEntry.jobType} - ${addedEntry.jobDescription} -id: ${addedEntry._id}`
        );
      }
    }
  };

  //
  useEffect(() => {
    getEntries(), currentUser;
  }, [update]);
  //

  const deleteEntry = async (id) => {
    try {
      const response = await axios.delete(
        `${deployedVariable}/api/jobpost/${id}`
      );
      console.log(response);
      setUpdate(`deleted entry ${id} successfully `);
    } catch (err) {
      console.error(err);
      setUpdate(`delete failed`);
    }
  };

  const handleHired = async (e, id) => {
    console.log("save is clicked:", id);
    try {
      const response = await axios.get(`${deployedVariable}/api/jobpost/`);
      //console.log("response in save", response.data);

      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log(formData);
    } catch (err) {
      console.error(err);
    }
  };

  //

  // handleChange(id);

  //
  const handleDelete = (e, id) => {
    console.log(`deleting ... entry`);
    // console.log(e, id);
    deleteEntry(id);

    //add in a function deleteEntry
  };

  //
  const handleSubmit = (e) => {
    e.preventDefault();
    let newEntry = {};
    console.log(`in handleSubmit`);

    console.log();
    //this is where i will send my post request to the backend
    setFormData({ ...formData });
    console.log(formData);
    newEntry = {
      email: formData.email,
      jobType: formData.jobType,
      jobDescription: formData.jobDescription,
      payRange: formData.payRange,
      comments: formData.comments,
      businessAddress: formData.businessAddress,
      phone: formData.phone,
    };
    console.log(newEntry);
    addEntry(newEntry);
  };
  //

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  //

  //   const handleTypeSelect = (e) => {
  //     setEntType(e.target.value);
  //   };
  //
  const loading = () => {
    return <h3>there dont seem to be an entries yet</h3>;
  };
  //
  const handleEditChange = (e) => {
    setTextData({ ...textData, [e.target.name]: e.target.value });
    console.log(textData);
  };
  //
  const saveEntry = async (e, id, entry) => {
    let newValue = {};
    newValue = {
      jobType: textData.jobType || entry.jobType,
      jobDescription: textData.jobDescription || entry.jobDescription,
      payRange: textData.payRange || entry.payRange,
      comments: textData.comments || entry.comments,
      businessAddress: textData.businessAddress || entry.businessAddress,
      phone: textData.phone || entry.phone,
    };
    try {
      const response = await axios.put(
        `${deployedVariable}/api/jobpost/${id}`,
        newValue
      );
      console.log(id);

      //setFormData();
      setUpdate(`edited successfully`);
    } catch (err) {
      console.error(err);
      setUpdate(`edit failed`);
    }
  };

  //
  const editAction = (entry) => {
    if (editButton === false) {
      setEditButton(true);
      setEditingData(entry);
    } else {
      setEditButton(false);
    }
  };
  //

  const loaded = () => {
    return (
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          flexDirection: "column",
          border: "0px solid black",
        }}
      >
        {" "}
        <h3>What You Have Posted So Far</h3>
        {entries.map((entry) => {
          return (
            <>
              {currentUser.email === entry.email ? (
                <li key={entry._id} className="jobPostList">
                  <div className="jobPostDetails">
                    <p className="jobDescription">
                      {entry.jobType}: {entry.jobDescription} - {entry.payRange}
                    </p>
                    <button
                      onClick={() => setEditingData(entry)}
                      className="editDelete"
                    >
                      Edit
                    </button>
                  </div>
                  {editingData._id === entry._id && (
                    <form className="editForm">
                      <label className="jobPostLabel">Job Type:</label>
                      <input
                        type="text"
                        name="jobType"
                        onChange={handleEditChange}
                        value={textData.jobType}
                        className="jobPostInput"
                      />
                      <br />
                      <label className="jobPostLabel">Job Description</label>
                      <input
                        type="text"
                        name="jobDescription"
                        onChange={handleEditChange}
                        value={textData.jobDescription}
                        className="jobPostInput"
                      />
                      <br />
                      <label className="jobPostLabel">Pay Range</label>
                      <input
                        type="text"
                        name="payRange"
                        onChange={handleEditChange}
                        value={textData.payRange}
                        className="jobPostInput"
                      />
                      <br />
                      <label className="jobPostLabel">Comments</label>
                      <input
                        type="text"
                        name="comments"
                        onChange={handleEditChange}
                        value={textData.comments}
                        className="jobPostInput"
                      />
                      <br />
                      <label className="jobPostLabel">Business Address</label>
                      <input
                        type="text"
                        name="businessAddress"
                        onChange={handleEditChange}
                        value={textData.businessAddress}
                        className="jobPostInput"
                      />
                      <br />
                      <label className="jobPostLabel">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        onChange={handleEditChange}
                        value={textData.phone}
                        className="jobPostInput"
                      />
                      <br />
                      <button
                        className="saveButton"
                        onClick={(e) => saveEntry(e, entry._id, entry)}
                      >
                        Save
                      </button>
                    </form>
                  )}
                  <button
                    className="editDe"
                    onClick={(e) => handleDelete(e, entry._id)}
                  >
                    Delete
                  </button>
                </li>
              ) : null}
            </>
          );
        })}
      </ul>
    );
  };
  //

  //
  return (
    <>
      <div style={{ marginBottom: "30px" }}>
        <h2>Welcome to Job Post Page</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // Ensures the two sections (form and entries list) are spaced out
          border: "0px solid black",
          padding: "10px", // Adding padding to ensure some space around the elements
        }}
      >
        {/* Add a new Job Section */}
        <div
          style={{
            border: "0px solid black",
            padding: "10px", // Padding for better spacing
            flex: 1, // This ensures the form takes up available space
            marginRight: "20px", // Adds spacing between the form and the entries section
          }}
        >
          <h3>Add a new Job</h3>
          <form onSubmit={handleSubmit}>
            <label
              style={{
                backgroundColor: "#78a1bb",
                border: "0px solid black",
                display: "flex",
                justifyContent: "space-between",
                padding: "5px", // Adds some padding for better alignment of label/input pairs
                marginBottom: "10px", // Adds space between form fields
              }}
            >
              <strong>Job Type</strong>
              <input
                type="text"
                name="jobType"
                required
                onChange={handleChange}
                value={formData.jobType}
                placeholder="enter type of job"
                style={{ width: "70%", padding: "5px" }} // Adjust input width and padding for consistency
              />
            </label>
            <label
              style={{
                border: "0px solid black",
                padding: "5px",
                backgroundColor: "#78a1bb",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px", // Adds space between form fields
              }}
            >
              <strong>Job Description</strong>
              <input
                type="text"
                name="jobDescription"
                placeholder="enter job description"
                value={formData.jobDescription}
                onChange={handleChange}
                style={{ width: "70%", padding: "5px" }}
              />
            </label>
            <label
              style={{
                border: "0px solid black",
                padding: "5px",
                display: "flex",
                backgroundColor: "#78a1bb",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <strong>Pay Rate</strong>
              <input
                type="text"
                name="payRange"
                required
                onChange={handleChange}
                placeholder="enter pay range"
                value={formData.payRange}
                style={{ width: "70%", padding: "5px" }}
              />
            </label>
            <label
              style={{
                border: "0px solid black",
                padding: "5px",
                display: "flex",
                backgroundColor: "#78a1bb",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <strong> Comment</strong>
              <input
                type="text"
                name="comments"
                required
                onChange={handleChange}
                placeholder="enter extra comment"
                value={formData.comments}
                style={{ width: "70%", padding: "5px" }}
              />
            </label>
            <label
              style={{
                border: "0px solid black",
                padding: "5px",
                display: "flex",
                backgroundColor: "#78a1bb",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <strong> Business Address</strong>
              <input
                type="text"
                name="businessAddress"
                required
                onChange={handleChange}
                placeholder="enter business address"
                value={formData.businessAddress}
                style={{ width: "70%", padding: "5px" }}
              />
            </label>
            <label
              style={{
                border: "0px solid black",
                padding: "5px",
                display: "flex",
                backgroundColor: "#78a1bb",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <strong> Phone</strong>
              <input
                type="number"
                name="phone"
                onChange={handleChange}
                value={formData.phone}
                placeholder="enter phone number"
                style={{ width: "70%", padding: "5px" }}
              />
            </label>{" "}
            <input
              type="submit"
              value="Post Job"
              style={{
                backgroundColor: "#4CAF50", // Green background
                color: "white", // White text color
                padding: "10px 15px", // Padding for the button
                border: "none", // Removes border
                cursor: "pointer", // Changes cursor on hover
                width: "100%", // Makes the button take the full width
                fontWeight: "bold",
              }}
            />
          </form>
          <p>{update}</p>
        </div>

        {/* Entries List Section */}
        <div
          style={{
            flex: 1, // Ensures the entries section also takes available space
            display: "flex",
            flexDirection: "column", // Stacks the entries vertically
            justifyContent: "flex-start", // Aligns the list to the top
            paddingLeft: "20px", // Adds space between the form and the entries
          }}
        >
          {entries.length ? loaded() : loading()}
        </div>
      </div>

      {/* 
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid black",
        }}
      >
        <div style={{ border: "1px solid black" }}>
          <h3>Add a new Job</h3>
          <form onSubmit={handleSubmit}>
            <label
              style={{
                border: "1px solid black",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Job Type
              <input
                type="text"
                name="jobType"
                required
                onChange={handleChange}
                value={formData.jobType}
                placeholder="Enter Job Type"
              />
            </label>
            <br />
            <label>
              Job Description:
              <input
                type="text"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Pay Rate
              <input
                type="text"
                name="payRange"
                required
                onChange={handleChange}
                value={formData.payRange}
              />
            </label>
            <br />
            <label>
              Comments:
              <input
                type="text"
                name="comments"
                required
                onChange={handleChange}
                value={formData.comments}
              />
              <br />
              <label>
                Business Address
                <input
                  type="text"
                  name="businessAddress"
                  required
                  onChange={handleChange}
                  value={formData.businessAddress}
                />
              </label>
              <br />
              <label>
                Phone
                <input
                  type="number"
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                />
              </label>
              <br />
            </label>
            <input type="submit" value="add a new entry" />
          </form>
          <p>{update}</p>
        </div>
        <div style={{ justifyItems: "flex-end" }}>
          {entries.length ? loaded() : loading()}
        </div>
      </div> */}
    </>
  );
}
export default JobPostPage;
