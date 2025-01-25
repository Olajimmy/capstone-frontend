import { useState, useEffect } from "react";
import axios from "axios";

function JobFeed() {
  const [entries, setEntries] = useState([]);
  const [moreDetails, setMoreDetails] = useState(null); // To store details of the clicked job
  const [loadingState, setLoadingState] = useState(false); // Optional loading state
  const [chatOpen, setChatOpen] = useState(false);

  const LOCAL_URL = `http://localhost:5050`;
  const deployedVariable = `https://capstone-backend-1hvk.onrender.com`;

  const getEntries = async () => {
    setLoadingState(true); // Set loading to true before making API call
    try {
      const response = await axios.get(`${deployedVariable}/api/jobpost`);
      setEntries(response.data);
      setLoadingState(false); // Set loading to false after API call is done
    } catch (err) {
      console.error(err);
      setLoadingState(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  const handleShowMoreDetails = async (id) => {
    // Check if the clicked job already has details shown
    if (moreDetails && moreDetails._id === id) {
      setMoreDetails(null); // If same job is clicked, hide details
    } else {
      const selectedJob = entries.find((entry) => entry._id === id);
      setMoreDetails(selectedJob); // Show the details of the clicked job
    }
  };

  const loading = () => {
    return <h3>No job entries available yet. Please check back later.</h3>;
  };
  //
  const handleChat = () => {
    if (chatOpen === false) {
      setChatOpen(true);
    } else {
      setChatOpen(false);
    }
  };

  const loaded = () => {
    return (
      <div className="job-feed-container">
        {entries.map((entry) => (
          <div className="job-post" key={entry._id}>
            <div className="job-info">
              <h3>{entry.jobType}</h3>
              <br />
              <p>
                <strong>Description: </strong>
                {entry.jobDescription}
              </p>
              <p>
                <strong>Pay Range:</strong> {entry.payRange}
              </p>
            </div>
            <button
              className="show-button"
              onClick={() => handleShowMoreDetails(entry._id)}
            >
              {moreDetails && moreDetails._id === entry._id
                ? "Hide Details"
                : "Show More Details"}
            </button>

            {/* Conditionally render more details */}
            {moreDetails && moreDetails._id === entry._id && (
              <div className="extra-info">
                <p>
                  <strong>Job ID:</strong> {moreDetails._id}
                </p>
                <p>
                  <strong>Job Type:</strong> {moreDetails.jobType}
                </p>
                <p>
                  <strong>Job Description:</strong> {moreDetails.jobDescription}
                </p>
                <p>
                  <strong>Pay Range:</strong> {moreDetails.payRange}
                </p>
                <p>
                  <strong>Comment:</strong> {moreDetails.comments}
                </p>
                <p>
                  <strong>Address:</strong> {moreDetails.businessAddress}
                </p>
                <p>
                  <strong>Phone:</strong> {moreDetails.phone}
                </p>
                <div style={{ border: "0px solid black" }}>
                  {" "}
                  <div style={{ display: "flex", justifySelf: "flex-end" }}>
                    <button
                      onClick={handleChat}
                      style={{ background: "#56d44f" }}
                    >
                      Chat with Employer
                    </button>
                    {chatOpen ? (
                      <>
                        <input
                          type="text"
                          name="chat"
                          placeholder="say something"
                        />
                        <button style={{ background: "#00aaed" }}>Send</button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="job-feed">
      <h2>Job Listings</h2>
      {loadingState ? loading() : loaded()}
    </div>
  );
}

export default JobFeed;
