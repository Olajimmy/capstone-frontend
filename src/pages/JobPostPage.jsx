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

  const [update, setUpdate] = useState("nothing changed");
  //const [entType, setEntType] = useState("");
  const LOCAL_URL = `http://localhost:5050`;

  const getEntries = async () => {
    console.log(`in getEntries`);
    //fetch calendar entries from the back end
    //aslo known as the api that i an creating
    //this endpoint is:
    // /api/calendar

    try {
      const response = await axios.get(`${LOCAL_URL}/api/jobpost`);
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
      const response = await axios.post(`${LOCAL_URL}/api/jobpost`, newEntry);
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

        setUpdate(
          `successfully added:, ${addedEntry.jobType} - ${addedEntry.jobDescription} -id: ${addedEntry._id}`
        );
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
      const response = await axios.delete(`${LOCAL_URL}/api/jobpost/${id}`);
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
      const response = await axios.get(`${LOCAL_URL}/api/jobpost/`);
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
        `${LOCAL_URL}/api/jobpost/${id}`,
        newValue
      );
      console.log(id);

      //setFormData();
      setUpdate(`edited data ${id} successfully`);
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
          border: "1px solid white",
        }}
      >
        {" "}
        <h3>Job Post History</h3>
        {freshId}
        {entries.map((entry) => {
          return (
            <>
              {currentUser.email === entry.email ? (
                <li key={entry._id} className="jobPostList">
                  {entry.jobType}: {entry.jobDescription} - {entry.payRange}
                  <button onClick={editAction}>Edit</button>
                  {editingData._id === entry._id && (
                    <form>
                      <label>Job Type:</label>
                      {/* <input
                        type="text"
                        name="jobType"
                        value={editingData.jobType || entry.jobType}
                        onChange={handleEditChange}
                      /> */}
                      <input
                        type="text"
                        name="jobType"
                        onChange={handleEditChange}
                        value={textData.jobType}
                      />
                      <br />
                      <label>Job Description</label>

                      <input
                        type="text"
                        name="jobDescription"
                        onChange={handleEditChange}
                        value={textData.jobDescription}
                      />
                      <br />
                      <label>Pay Range</label>

                      <input
                        type="text"
                        name="payRange"
                        onChange={handleEditChange}
                        value={textData.payRange}
                      />
                      <br />
                      <label>Comments</label>

                      <input
                        type="text"
                        name="comments"
                        onChange={handleEditChange}
                        value={textData.comments}
                      />
                      <br />
                      <label>Business Address</label>

                      <input
                        type="text"
                        name="businessAddress"
                        onChange={handleEditChange}
                        value={textData.businessAddress}
                      />
                      <br />
                      <label>Phone Number</label>

                      <input
                        type="text"
                        name="phone"
                        onChange={handleEditChange}
                        value={textData.phone}
                      />
                      <br />
                      <br />
                      <button onClick={(e) => saveEntry(e, entry._id, entry)}>
                        Save
                      </button>
                    </form>
                  )}
                  <button onClick={(e) => handleDelete(e, entry._id)}>
                    Delete
                  </button>
                </li>
              ) : null}
              {/* {currentUser.email === entry.email ? (
                <>
                  {" "}
                  <li key={entry._id} style={{ border: "1px solid white" }}>
                    {entry.jobType}: {entry.jobDescription} : {entry.payRange}
                    <button onClick={() => editAction(entry._id)}>
                      {editButton === false && freshId === currentUser._id
                        ? "Edit"
                        : "Hide"}
                    </button>
                    {}
                    {editButton === true ? (
                      <>
                        <form>
                          <label>Job type</label>
                          <input
                            type="text"
                            name="jobType"
                            onChange={handleEditChange}
                            value={textData.jobType}
                          />
                          <br />
                          <label>Job Description</label>

                          <input
                            type="text"
                            name="jobDescription"
                            onChange={handleEditChange}
                            value={textData.jobDescription}
                          />
                          <br />
                          <label>Pay Range</label>

                          <input
                            type="text"
                            name="payRange"
                            onChange={handleEditChange}
                            value={textData.payRange}
                          />
                          <br />
                          <label>Comments</label>

                          <input
                            type="text"
                            name="comments"
                            onChange={handleEditChange}
                            value={textData.comments}
                          />
                          <br />
                          <label>Business Address</label>

                          <input
                            type="text"
                            name="businessAddress"
                            onChange={handleEditChange}
                            value={textData.businessAddress}
                          />
                          <br />
                          <label>Phone Number</label>

                          <input
                            type="text"
                            name="phone"
                            onChange={handleEditChange}
                            value={textData.phone}
                          />
                          <br />
                          <button
                            onClick={(e) => {
                              saveEntry(e, entry._id);
                            }}
                          >
                            Save
                          </button>
                        </form>
                      </>
                    ) : (
                      <></>
                    )}
                    <button
                      onClick={(e) => {
                        handleHired(e, entry._id);
                      }}
                    >
                      Hired
                    </button>
                    <button onClick={(e) => handleDelete(e, entry._id)}>
                      Delete
                    </button>
                  </li>
                </>
              ) : (
                <></>
              )} */}
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
      <h2>Job Post Page</h2>
      {currentUser.email}

      <div style={{ display: "flex", border: "1px solid black" }}>
        <div style={{ border: "1px solid black" }}>
          <h3>Add a new Job</h3>
          <form onSubmit={handleSubmit}>
            <label>
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
        <div>{entries.length ? loaded() : loading()}</div>
      </div>
    </>
  );
}
export default JobPostPage;
