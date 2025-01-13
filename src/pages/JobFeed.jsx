import { useState, useEffect } from "react";
import axios from "axios";
//

function JobFeed() {
  const [entries, setEntries] = useState([]);
  const [moreEntries, setMoreEntries] = useState([]);

  const [update, setUpdate] = useState("");
  const [show, setShow] = useState(false);

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
      console.log("i got something");
      setEntries(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEntries();
  }, [update]);

  const load = () => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const loading = () => {
    return <h3>there dont seem to be an entries yet</h3>;
  };

  const handleMore = async () => {
    console.log(`in handle more`);
    //fetch calendar entries from the back end
    //aslo known as the api that i an creating
    //this endpoint is:
    // /api/calendar

    try {
      const response = await axios.get(`${LOCAL_URL}/api/jobpost`);
      console.log("response.data", response.data);
      console.log("i got something");
      setMoreEntries(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  //   //   useEffect(() => {
  //     handleMore();
  //   }, [update]);

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
              <div>
                <li style={{ width: "80%", border: "1px solid white" }}>
                  {entry.jobType}: {entry.jobDescription} : {entry.payRange}
                  <button
                    onClick={(e) => {
                      handleMore(e, entry._id);
                    }}
                  >
                    Details Within
                  </button>
                  {moreEntries.map((newEntry) => {
                    return (
                      <>
                        {newEntry._id === entry._id ? (
                          <>
                            ({" "}
                            <li key={newEntry._id}>
                              {newEntry.jobtype}: {newEntry.jobDescription}:
                              {newEntry.payRange}
                            </li>
                            )
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </li>
              </div>
            </>
          );
        })}
        <button onClick={load}>press</button>

        {show === true ? (
          <>
            <button>apear</button>
          </>
        ) : (
          <>nothing </>
        )}
      </ul>
    );
  };

  return <>{entries.length ? loaded() : loading()}</>;
}
//   const loading = () => {
//     return <h3>No Job Entries yet</h3>;
//   };

//   const loaded = () => {
//     return (
//       <>
//         <div>Job Feed Page</div>
//         <ul
//           style={{
//             listStyleType: "none",
//             display: "flex",
//             flexDirection: "column",
//             border: "1px solid white",
//           }}
//         >
//           {entries.map((entry) => {
//             return (
//               <>
//                 <li style={{ width: "80%" }}>
//                   {entry.jobType}: {entry.jobDescription} : {entry.payRange}
//                 </li>
//               </>
//             );
//           })}
//         </ul>
//       </>
//     );
//   };

//   return (
//     <>
//       <button onClick={loaded}>Refresh Feed</button>
//       <div>{entries.length ? loaded() : loading()}</div>
//     </>
//   );
// }
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
