import { useState, useEffect } from "react";
import axios from "axios";

function JobPostPage() {
  //const current = new Date();
  //const curreDate=`${current.getMonth}`
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    jobType: "",
    jobDescription: "",
    payRange: "",
    comments: "",
    businessAddress: "",
    phone: "",
  });
  //
  const [editingData, setEditingData] = useState({});

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
    getEntries();
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
  //
  const editEntry = async (id) => {
    try {
      const response = await axios.put(`${LOCAL_URL}/api/jobpost/${id}`);
      // addEntry(id);
      //   setFormData({
      //     entryDate: [response.data.entryDate],
      //     entryType: [response.data.entryType],
      //     description: [response.data.description],
      //   });

      //   console.log(`edit`, response.data);

      //   let newData = response.data;
      //   console.log(
      //     "entry date",
      //     newData.entryDate,
      //     "entry type:",
      //     newData.entryType
      //   );
      //   setFormData({
      //     entryDate: newData.entryDate,
      //     entryType: newData.entryType,
      //     description: newData.description,
      //   });
      //   console.log(formData);

      //setFormData();
      setUpdate(`edited data ${id} successfully`);
    } catch (err) {
      console.error(err);
      setUpdate(`edit failed`);
    }
  };

  const handleEdit = async (e, id) => {
    console.log(`editing .... entry`);
    editEntry(id);

    //add in a function editEntry
    // console.log(id);
    // const response = await axios.get(`${LOCAL_URL}/api/braindump/${id}`);
    // // console.log(" edit get", response.data);
    // const newVal = response.data;
    // console.log(newVal);
    // const newValues = [...formData, id]; // Copy the current values array
    // //newValues[i] = event.target.value;
    // console.log(newValues[id]); //shows the text value in it
    //setFormData(newValues[id]);
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e, id) => {
    console.log("save is clicked:", id);
    try {
      const response = await axios.get(`${LOCAL_URL}/api/jobpost/`);
      //console.log("response in save", response.data);
      //   let newRes = response.data;
      //   console.log(newRes);
      //   setEditingData(newRes);
      //   console.log("editing data", editingData);
      //   editingData.map((i, index) => {
      //     console.log(editingData[index]._id);
      //     if (id === editingData[index]._id) {
      //       console.log("we matched", id);
      //       setFormData;
      //       //setFormData({ ...formData, [e.target.name]: e.target.value });
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log(formData);
      //       //handleSubmit();
      //       //   handleChange();
      //       //   handleTypeSelect();
      //     }
      //   });
      //   if (editingData == id) {
      //     console.log("id matched");
      //   } else {
      //     console.log("not matched");
      //   }
      //setEntries(response.data);
    } catch (err) {
      console.error(err);
    }
    //setFormData({ ...formData });
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
        {entries.map((entry) => {
          return (
            <>
              <li style={{ width: "80%" }}>
                {entry.jobType}: {entry.jobDescription} : {entry.payRange}
                <button
                  onClick={(e) => {
                    handleEdit(e, entry._id);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    handleSave(e, entry._id);
                  }}
                >
                  Save
                </button>
                <button onClick={(e) => handleDelete(e, entry._id)}>
                  Delete
                </button>
              </li>
            </>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <h2>Job Post Page</h2>
      <ol>
        CRUD
        <li>Create -form to add a new entry</li>
        <li>Read - show all (which i have ), the rest is future work</li>
        <li>Update- form to edit a specific entry</li>
        <li>Delete - button to delete an entry</li>
      </ol>
      <div style={{ display: "flex" }}>
        <div>
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
//
