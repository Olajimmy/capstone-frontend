import { useState, useEffect } from "react";
import axios from "axios";
//

function JobFeed() {
  const [entries, setEntries] = useState([]);

  const LOCAL_URL = `http://localhost:5050`;
  //

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

  const loading = () => {
    return <h3>No Job Entries yet</h3>;
  };

  const loaded = () => {
    return (
      <>
        <div>Job Feed Page</div>
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
                </li>
              </>
            );
          })}
        </ul>
      </>
    );
  };

  return (
    <>
      <button onClick={loaded}>Refresh Feed</button>
      <div>{entries.length ? loaded() : loading()}</div>
    </>
  );
}
export default JobFeed;

//

// const loaded = () => {
//   return (
//     <ul
//       style={{
//         listStyleType: "none",
//         display: "flex",
//         flexDirection: "column",
//         border: "1px solid white",
//       }}
//     >
//       {entries.map((entry) => {
//         return (
//           <>
//             <li style={{ width: "80%" }}>
//               {entry.jobType}: {entry.jobDescription} : {entry.payRange}
//               <button
//                 onClick={(e) => {
//                   handleEdit(e, entry._id);
//                 }}
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={(e) => {
//                   handleSave(e, entry._id);
//                 }}
//               >
//                 Save
//               </button>
//               <button onClick={(e) => handleDelete(e, entry._id)}>
//                 Delete
//               </button>
//             </li>
//           </>
//         );
//       })}
//     </ul>
//   );
// };
